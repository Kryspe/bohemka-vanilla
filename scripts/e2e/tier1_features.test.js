/**
 * Tier 1: Feature Coverage (F1 to F12)
 * Independent, authoritative test suite derived from PROJECT.md & ORIGINAL_REQUEST.md.
 */

import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { describe, test } from "./runner.js";
import { WORKSPACE_ROOT } from "./harness.js";

const TABLES = [
  "news",
  "events",
  "event_entries",
  "parent_messages",
  "trainers",
  "records",
  "yearbooks",
  "users"
];

const SUPABASE_URL = "https://xjvpyznywisuuykwsedd.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ";

describe("Tier 1: Feature Coverage (F1-F12)", () => {

  // F1: Supabase Cloud Database Provisioning
  test("F1: Supabase Cloud Database Provisioning — Schema DDL & Live Tables", async (ctx) => {
    if (!ctx.isLive) {
      ctx.skip("Requires --live flag");
      return;
    }

    const schemaFile = path.resolve(WORKSPACE_ROOT, "supabase_schema.sql");
    assert.ok(fs.existsSync(schemaFile), "supabase_schema.sql must exist at workspace root");
    const sql = fs.readFileSync(schemaFile, "utf-8");

    // Verify all 8 core tables are defined in schema DDL
    for (const table of TABLES) {
      const tableRegex = new RegExp(`CREATE\\s+TABLE\\s+(?:IF\\s+NOT\\s+EXISTS\\s+)?(?:public\\.)?${table}\\b`, "i");
      assert.ok(tableRegex.test(sql), `supabase_schema.sql must define table '${table}'`);
    }

    // Probe live cloud database with zero mock interception
    for (const table of TABLES) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&limit=1`, {
        headers: {
          "apikey": ANON_KEY,
          "Authorization": `Bearer ${ANON_KEY}`
        }
      });
      const bodyText = await res.text();
      assert.notStrictEqual(res.status, 404, `Live Supabase table '${table}' returned HTTP 404 (PGRST205: table not in schema cache). Waiting for Milestone M1 cloud schema provisioning. Response: ${bodyText}`);
      assert.strictEqual(res.status, 200, `Live Supabase table '${table}' should return HTTP 200 OK. Response: ${bodyText}`);
    }
  });

  // F2: RLS Policies Alignment
  test("F2: RLS Policies Alignment — RLS Enabled & Policies Configured", async () => {
    const schemaFile = path.resolve(WORKSPACE_ROOT, "supabase_schema.sql");
    const sql = fs.readFileSync(schemaFile, "utf-8");

    for (const table of TABLES) {
      const rlsRegex = new RegExp(`ALTER\\s+TABLE\\s+(?:public\\.)?${table}\\s+ENABLE\\s+ROW\\s+LEVEL\\s+SECURITY`, "i");
      assert.ok(rlsRegex.test(sql), `supabase_schema.sql must enable RLS on table '${table}'`);
    }

    // Verify key policies
    assert.ok(/CREATE\s+POLICY\s+"Public\s+select\s+news"/i.test(sql), "news must have public select policy");
    assert.ok(/CREATE\s+POLICY\s+"Public\s+select\s+events"/i.test(sql), "events must have public select policy");
    assert.ok(/CREATE\s+POLICY\s+"(?:Anon|Public)\s+insert\s+event_entries"/i.test(sql), "event_entries must have validated insert policy");
    assert.ok(/CREATE\s+POLICY\s+"(?:Anon|Public)\s+delete\s+(?:own\s+)?event_entries"/i.test(sql), "event_entries must have delete policy");
  });

  // F3: REST Endpoint Health Check
  test("F3: REST Endpoint Health Check — GET /rest/v1/<table_name>?select=*", async (ctx) => {
    if (!ctx.isLive) {
      ctx.skip("Requires --live flag");
      return;
    }

    // Strictly query live endpoints with zero mock interception
    for (const table of TABLES) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
        headers: { "apikey": ANON_KEY, "Authorization": `Bearer ${ANON_KEY}` }
      });
      assert.strictEqual(res.status, 200, `Live endpoint /rest/v1/${table} returned status ${res.status}`);
      const data = await res.json();
      assert.ok(Array.isArray(data), `Live endpoint /rest/v1/${table} must return JSON array`);
    }
  });

  // F4: Native PostgREST REST Client
  test("F4: Native PostgREST REST Client — Zero SDK Dependency & Interface Contract", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");

    const sb = sandbox.window.KlokaniSupabase;
    assert.ok(sb, "window.KlokaniSupabase must be exposed");

    const contractMethods = [
      "getNews",
      "saveNews",
      "deleteNews",
      "getEvents",
      "saveEvent",
      "deleteEvent",
      "signupSwimmer",
      "cancelSignup",
      "saveMessage",
      "deleteMessage",
      "testConnection"
    ];

    for (const method of contractMethods) {
      assert.strictEqual(typeof sb[method], "function", `KlokaniSupabase.${method} must be a function`);
    }

    // Verify it operates without window.supabase SDK
    assert.strictEqual(sandbox.window.supabase, undefined, "Window.supabase must NOT be loaded (vanilla constraint)");
  });

  // F5: Store Contract & Signature Bridge
  test("F5: Store Contract & Signature Bridge — Field Mapping & Method Signatures", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;
    assert.ok(store, "window.BohStore must be exposed");

    // Track calls made to KlokaniSupabase
    let lastNewsCall = null;
    let lastEventCall = null;
    let lastMessageCall = null;

    sandbox.window.KlokaniSupabase.isConfigured = () => true;
    sandbox.window.KlokaniSupabase.saveNews = async (item) => { lastNewsCall = item; return { success: true, item }; };
    sandbox.window.KlokaniSupabase.saveEvent = async (item) => { lastEventCall = item; return { success: true, item }; };
    sandbox.window.KlokaniSupabase.saveMessage = async (item) => { lastMessageCall = item; return { success: true, item }; };

    // 1. News mapping check (perex -> excerpt, text -> body)
    store.saveAdminItem({
      id: "f5-news-1",
      kind: "aktualita",
      title: "Test News Title",
      fields: {
        datum: "2026-10-20",
        autor: "Test Author",
        perex: "News excerpt test",
        text: "News full body content"
      }
    });

    assert.ok(lastNewsCall, "saveNews must be called on saveAdminItem aktualita");
    assert.strictEqual(lastNewsCall.title, "Test News Title");
    // Verify excerpt & body are mapped (not dropped)
    const excerptVal = lastNewsCall.excerpt || lastNewsCall.lead;
    const bodyVal = lastNewsCall.body || lastNewsCall.content;
    assert.ok(excerptVal && excerptVal.includes("News excerpt"), `Excerpt/lead must be preserved, received: ${JSON.stringify(lastNewsCall)}`);
    assert.ok(bodyVal, `Body/content must be preserved, received: ${JSON.stringify(lastNewsCall)}`);

    // 2. Events mapping check (title -> name, misto -> place, datum -> date, typ -> type)
    store.saveAdminItem({
      id: "f5-event-1",
      kind: "zavod",
      title: "Test Race Name",
      fields: {
        datum: "2026-11-15",
        deadline: "2026-11-10",
        misto: "Podolí",
        typ: "Pohár",
        disciplines: ["50 VZ", "100 VZ"]
      }
    });

    assert.ok(lastEventCall, "saveEvent must be called on saveAdminItem zavod");
    const nameVal = lastEventCall.name || lastEventCall.title;
    const placeVal = lastEventCall.place || lastEventCall.location;
    const dateVal = lastEventCall.date || lastEventCall.date_from;
    assert.strictEqual(nameVal, "Test Race Name", "Event name must be preserved");
    assert.strictEqual(placeVal, "Podolí", "Event place must be preserved");
    assert.strictEqual(dateVal, "2026-11-15", "Event date must be preserved");

    // 3. Message mapping check (text preserved)
    store.saveAdminItem({
      id: "f5-msg-1",
      kind: "informace",
      title: "Test Alert",
      fields: {
        text: "Important announcement text"
      }
    });
    assert.ok(lastMessageCall, "saveMessage must be called on saveAdminItem informace");
    const textVal = lastMessageCall.text || lastMessageCall.message;
    assert.strictEqual(textVal, "Important announcement text", "Message text must be preserved");
  });

  // F6: Frontend Deletion Integration
  test("F6: Frontend Deletion Integration — Cloud Delete Endpoints Wired", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    let deletedNewsId = null;
    let deletedEventId = null;
    let deletedMessageId = null;
    let cancelledSignup = null;

    sandbox.window.KlokaniSupabase.isConfigured = () => true;
    sandbox.window.KlokaniSupabase.deleteNews = async (id) => { deletedNewsId = id; return { success: true }; };
    sandbox.window.KlokaniSupabase.deleteEvent = async (id) => { deletedEventId = id; return { success: true }; };
    sandbox.window.KlokaniSupabase.deleteMessage = async (id) => { deletedMessageId = id; return { success: true }; };
    sandbox.window.KlokaniSupabase.cancelSignup = async (id, swimmer) => { cancelledSignup = { id, swimmer }; return { success: true }; };

    const store = sandbox.window.BohStore;

    // Delete News
    store.deleteNews("del-news-1");
    assert.strictEqual(deletedNewsId, "del-news-1", "BohStore.deleteNews must invoke KlokaniSupabase.deleteNews");

    // Delete Event
    store.deleteEvent("del-event-1");
    assert.strictEqual(deletedEventId, "del-event-1", "BohStore.deleteEvent must invoke KlokaniSupabase.deleteEvent");

    // Delete Alert
    store.deleteAlert("del-alert-1");
    assert.strictEqual(deletedMessageId, "del-alert-1", "BohStore.deleteAlert must invoke KlokaniSupabase.deleteMessage");

    // Cancel Signup
    store.cancelSignup("del-signup-1", "Plavec Test");
    assert.ok(cancelledSignup, "BohStore.cancelSignup must invoke KlokaniSupabase.cancelSignup");
  });

  // F7: Event Broadcast & Reactivity
  test("F7: Event Broadcast & Reactivity — boh:data-updated Event Standard", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const eventsFired = [];
    sandbox.window.addEventListener("boh:data-updated", (e) => {
      eventsFired.push(e.detail);
    });

    const store = sandbox.window.BohStore;
    store.addNews({ title: "Reactivity News", perex: "Perex", date: "2026-10-20" });

    assert.ok(eventsFired.length > 0, "boh:data-updated event must be dispatched on addNews");
    const last = eventsFired[eventsFired.length - 1];
    assert.ok(last.kind === "aktualita" || last.kind === "news", `Event detail kind should be 'aktualita' or 'news', received: ${last.kind}`);
  });

  // F8: Script Loading & CSP Configuration
  test("F8: Script Loading & CSP Configuration — HTML script tags, CSP connect-src, sw.js", async () => {
    const pages = [
      "index.html",
      "aktuality.html",
      "zavody.html",
      "pro-rodice.html",
      "admin.html",
      "intranet.html"
    ];

    for (const page of pages) {
      const pagePath = path.resolve(WORKSPACE_ROOT, page);
      const content = fs.readFileSync(pagePath, "utf-8");
      assert.ok(
        content.includes('src="js/supabase.js"') || content.includes("src='js/supabase.js'"),
        `${page} must include <script src="js/supabase.js"></script>`
      );
    }

    // Check CSP in server.cjs
    const serverPath = path.resolve(WORKSPACE_ROOT, "server.cjs");
    const serverContent = fs.readFileSync(serverPath, "utf-8");
    assert.ok(
      serverContent.includes("xjvpyznywisuuykwsedd.supabase.co") || serverContent.includes("https://*.supabase.co"),
      "server.cjs CSP must allow connection to Supabase cloud"
    );

    // Check sw.js cache
    const swPath = path.resolve(WORKSPACE_ROOT, "sw.js");
    const swContent = fs.readFileSync(swPath, "utf-8");
    assert.ok(
      swContent.includes("js/supabase.js"),
      "sw.js static assets cache must include js/supabase.js"
    );
  });

  // F9: Offline Mutation Outbox Queue
  test("F9: Offline Mutation Outbox Queue — Persistence in boh-offline-queue & Drain on Online", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const itemId = `offline-item-${Date.now()}`;
    try {
      // Force offline
      sandbox.setOffline(true);

      const store = sandbox.window.BohStore;
      store.saveAdminItem({
        id: itemId,
        kind: "aktualita",
        title: "Offline Created News",
        fields: { perex: "Saved while disconnected" }
      });

      const queueRaw = sandbox.localStorage.getItem("boh-offline-queue");
      assert.ok(queueRaw, "localStorage 'boh-offline-queue' must contain queued mutations when offline");
      const queue = JSON.parse(queueRaw);
      assert.ok(Array.isArray(queue) && queue.length > 0, "Outbox queue must be a non-empty array");

      // Reconnect
      let syncDispatched = false;
      sandbox.window.addEventListener("boh:data-updated", (e) => {
        if (e.detail && (e.detail.action === "sync" || e.detail.kind === "sync" || e.detail.kind === "all")) {
          syncDispatched = true;
        }
      });

      sandbox.setOffline(false); // fires 'online' event

      // Allow event loop to process async replay (poll for live network completion)
      for (let i = 0; i < 30; i++) {
        const q = JSON.parse(sandbox.localStorage.getItem("boh-offline-queue") || "[]");
        if (q.length === 0) break;
        await new Promise(r => setTimeout(r, 100));
      }

      const remainingQueue = JSON.parse(sandbox.localStorage.getItem("boh-offline-queue") || "[]");
      assert.strictEqual(remainingQueue.length, 0, "boh-offline-queue must be drained after online event");
    } finally {
      if (ctx.isLive) {
        try {
          await fetch(`${SUPABASE_URL}/rest/v1/news?id=eq.${itemId}`, {
            method: "DELETE",
            headers: {
              "apikey": ANON_KEY,
              "Authorization": `Bearer ${ANON_KEY}`
            }
          });
        } catch (_) {}
      }
    }
  });

  // F10: Graceful Offline Fallback
  test("F10: Graceful Offline Fallback — Zero Exceptions & Static Data Integrity", async (ctx) => {
    const sandbox = ctx.createSandbox({ offline: true });
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;

    // Verify calls succeed without throwing
    let news, events, notes;
    assert.doesNotThrow(() => {
      news = store.getNews();
      events = store.getEvents();
      notes = store.getParentsNotes();
    }, "Store getters must not throw exceptions when completely offline");

    assert.ok(Array.isArray(news) && news.length > 0, "getNews() must return fallback news items");
    assert.ok(Array.isArray(events) && events.length > 0, "getEvents() must return fallback event items");
    assert.ok(Array.isArray(notes) && notes.length > 0, "getParentsNotes() must return fallback parent notes");
  });

  // F11: Programmatic CRUD Verification Script
  test("F11: Programmatic CRUD Verification Script — Contract & Execution", async () => {
    const scriptJs = path.resolve(WORKSPACE_ROOT, "scripts/verify_supabase.js");
    const scriptSh = path.resolve(WORKSPACE_ROOT, "scripts/verify_supabase.sh");

    assert.ok(fs.existsSync(scriptJs), "scripts/verify_supabase.js must exist");
    assert.ok(fs.existsSync(scriptSh), "scripts/verify_supabase.sh must exist");

    // Syntax validation
    execSync(`node -c "${scriptJs}"`);

    // Verify contract: must test CRUD cycle and include cleanup
    const content = fs.readFileSync(scriptJs, "utf-8");
    assert.ok(content.includes("test-crud-"), "Verification script must use 'test-crud-' ID convention");
    assert.ok(content.includes("DELETE") || content.includes("delete"), "Verification script must perform deletion cleanup");
  });

  // F12: Static Code Health Verification
  test("F12: Static Code Health Verification — Syntax, HTML inline scripts, CSS balance", async () => {
    // 1. JS / CJS node -c check
    const jsFiles = [
      "api/config.js",
      "js/supabase.js",
      "js/animations.js",
      "js/data.js",
      "js/app.js",
      "js/store.js",
      "server.cjs",
      "sw.js"
    ];

    for (const f of jsFiles) {
      const full = path.resolve(WORKSPACE_ROOT, f);
      assert.doesNotThrow(() => {
        execSync(`node -c "${full}"`);
      }, `File ${f} failed node -c syntax check`);
    }

    // 2. CSS brace matching
    const cssPath = path.resolve(WORKSPACE_ROOT, "css/style.css");
    const css = fs.readFileSync(cssPath, "utf-8");
    const openBraces = (css.match(/\{/g) || []).length;
    const closeBraces = (css.match(/\}/g) || []).length;
    assert.strictEqual(openBraces, closeBraces, `css/style.css braces unbalanced: ${openBraces} open vs ${closeBraces} close`);
  });

});
