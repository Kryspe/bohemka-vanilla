#!/usr/bin/env node
/**
 * Tier 5 Adversarial Coverage Hardening Verification Script
 * 
 * Empirically probes:
 * 1. Corrupted or partial localStorage states
 * 2. Rapid multi-click / double-submission in race signup and discipline modal
 * 3. Offline mutation queue draining during intermittent connectivity
 * 4. CSV formula injection edge cases (=, +, -, @, \t, \r, %) in swimmer names and notes
 * 5. DOM XSS escaping across all renderers (announcements, events, records)
 */

import { createSandbox, MockElement } from "./harness.js";
import assert from "node:assert";

// Polyfill MockElement methods for DOM completeness in headless test
MockElement.prototype.querySelectorAll = function () { return []; };
MockElement.prototype.querySelector = function () { return null; };
MockElement.prototype.addEventListener = function () {};
MockElement.prototype.removeEventListener = function () {};
if (!Set.prototype.remove) {
  Set.prototype.remove = function (...items) { items.forEach(it => this.delete(it)); };
}
if (!Set.prototype.contains) {
  Set.prototype.contains = function (item) { return this.has(item); };
}
if (!Set.prototype.toggle) {
  Set.prototype.toggle = function (item) {
    if (this.has(item)) this.delete(item);
    else this.add(item);
  };
}

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m"
};

let totalPassed = 0;
let totalFailed = 0;
const findings = [];

function pass(name, details = "") {
  totalPassed++;
  console.log(`  ${colors.green}✔ PASS${colors.reset} ${name} ${details ? colors.gray + "(" + details + ")" + colors.reset : ""}`);
}

function fail(name, error, details = "") {
  totalFailed++;
  findings.push({ name, error: String(error && error.message ? error.message : error), details });
  console.log(`  ${colors.red}✖ GAP FOUND${colors.reset} ${name}`);
  console.log(`    ${colors.yellow}Error:${colors.reset} ${error && error.message ? error.message : error}`);
  if (details) console.log(`    ${colors.gray}Details:${colors.reset} ${details}`);
}

function createTestSandbox(opts = {}) {
  const sb = createSandbox(opts);
  for (const el of [sb.document.documentElement, sb.document.body]) {
    if (el && el.classList) {
      el.classList.remove = (...items) => items.forEach(it => el.classList.delete(it));
      el.classList.contains = (it) => el.classList.has(it);
      el.classList.toggle = (it) => el.classList.has(it) ? el.classList.delete(it) : el.classList.add(it);
    }
  }
  return sb;
}

async function runAdversarialSuite() {
  console.log(`\n${colors.bold}══════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`  ${colors.bold}🛡️  TIER 5 ADVERSARIAL COVERAGE HARDENING PROBE${colors.reset}`);
  console.log(`  Targeting: store.js, intranet.js, supabase.js, app.js`);
  console.log(`${colors.bold}══════════════════════════════════════════════════════════════════${colors.reset}\n`);

  // ==========================================================================
  // SECTION 1: Corrupted or Partial localStorage States
  // ==========================================================================
  console.log(`${colors.cyan}▶ SECTION 1: Corrupted or Partial localStorage States${colors.reset}`);

  // Test 1.1: BohStore with corrupted JSON in all keys
  try {
    const sandbox = createTestSandbox();
    sandbox.localStorage.setItem("boh-signups", "{corrupted json invalid");
    sandbox.localStorage.setItem("boh-admin-items", "undefined");
    sandbox.localStorage.setItem("boh-offline-queue", "[not json");
    sandbox.localStorage.setItem("boh-notifications", "null{broken");
    sandbox.localStorage.setItem("boh-coach-rosters", "NaN");
    sandbox.localStorage.setItem("boh-deleted-ids", "invalid-array");

    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    const BohStore = sandbox.window.BohStore;

    const signups = BohStore.getSignups();
    assert.strictEqual(Object.keys(signups).length, 0, "getSignups must return empty object on corrupted JSON");

    const adminItems = BohStore.getAdminItems();
    assert.ok(Array.isArray(adminItems) && adminItems.length > 0, "getAdminItems must return array fallback");

    const queue = BohStore.getOfflineQueue();
    assert.strictEqual(queue.length, 0, "getOfflineQueue must return empty array on corrupted JSON");

    const news = BohStore.getNews();
    assert.ok(Array.isArray(news) && news.length > 0, "getNews must fallback to static data");

    const events = BohStore.getEvents();
    assert.ok(Array.isArray(events) && events.length > 0, "getEvents must fallback to static data");

    const rosters = BohStore.getRosterForEvent("event-1");
    assert.ok(Array.isArray(rosters), "getRosterForEvent must return array on corrupted coach rosters");

    pass("1.1 BohStore handles completely corrupted JSON syntax across all localStorage keys without throwing");
  } catch (err) {
    fail("1.1 BohStore handles completely corrupted JSON syntax across all localStorage keys", err);
  }

  // Test 1.2: BohStore behavior when localStorage contains JSON "null" or scalars
  try {
    const sandbox = createTestSandbox();
    sandbox.localStorage.setItem("boh-signups", "null");
    sandbox.localStorage.setItem("boh-coach-rosters", "null");
    sandbox.localStorage.setItem("boh-deleted-ids", "null");
    sandbox.localStorage.setItem("boh-notifications", "null");

    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    const BohStore = sandbox.window.BohStore;

    let crashed = false;
    let crashErrors = [];

    // Probe 1.2a: saveSignup when boh-signups is "null"
    try {
      BohStore.saveSignup("race-test", ["50 VZ"], "note");
    } catch (e) {
      crashed = true;
      crashErrors.push(`saveSignup crashed on "null": ${e.message}`);
    }

    // Probe 1.2b: addSwimmerEntry when boh-coach-rosters is "null"
    try {
      BohStore.addSwimmerEntry("race-test", { swimmer: "Jan" });
    } catch (e) {
      crashed = true;
      crashErrors.push(`addSwimmerEntry crashed on "null": ${e.message}`);
    }

    // Probe 1.2c: getNews when boh-deleted-ids is "null"
    try {
      BohStore.getNews();
    } catch (e) {
      crashed = true;
      crashErrors.push(`getNews crashed on "null" deleted-ids: ${e.message}`);
    }

    // Probe 1.2d: getUnreadNotificationsCount when boh-notifications is "null"
    try {
      BohStore.getUnreadNotificationsCount();
    } catch (e) {
      crashed = true;
      crashErrors.push(`getUnreadNotificationsCount crashed on "null" notifications: ${e.message}`);
    }

    if (crashed) {
      throw new Error(crashErrors.join("; "));
    }

    pass("1.2 BohStore tolerates JSON \"null\" in boh-signups, boh-coach-rosters, boh-deleted-ids, boh-notifications");
  } catch (err) {
    fail("1.2 BohStore unhandled TypeErrors on JSON \"null\" in localStorage", err, "Observed: getSignups, getCustomRosters, getDeletedIds, and getCustomNotifications do not validate typeof parsed === 'object' before member access");
  }

  // Test 1.3: IntranetApi with corrupted localStorage
  try {
    const sandbox = createTestSandbox();
    sandbox.localStorage.setItem("boh_intranet_announcements", "{malformed");
    sandbox.localStorage.setItem("boh_intranet_schedule", "invalid");
    sandbox.localStorage.setItem("boh_intranet_documents", "null{");
    sandbox.localStorage.setItem("boh_intranet_content_blocks", "undefined");
    sandbox.localStorage.setItem("boh_intranet_my_entries", "[123, broken]");

    sandbox.loadScript("js/intranet-api.js");
    const IntranetApi = sandbox.window.IntranetApi;

    const anns = await IntranetApi.getAnnouncements();
    assert.ok(Array.isArray(anns) && anns.length > 0, "IntranetApi must fallback to seed announcements");

    const sch = await IntranetApi.getSchedule();
    assert.ok(Array.isArray(sch) && sch.length > 0, "IntranetApi must fallback to seed schedule");

    const docs = await IntranetApi.getDocuments();
    assert.ok(Array.isArray(docs) && docs.length > 0, "IntranetApi must fallback to seed documents");

    const blocks = await IntranetApi.getContentBlocks();
    assert.ok(blocks && typeof blocks === "object" && blocks.portal_title, "IntranetApi must fallback to seed blocks");

    pass("1.3 IntranetApi falls back gracefully to default seeds when localStorage JSON is malformed");
  } catch (err) {
    fail("1.3 IntranetApi falls back gracefully to default seeds when localStorage JSON is malformed", err);
  }

  // Test 1.4: IntranetApi getStorageItem returning null on JSON "null"
  try {
    const sandbox = createTestSandbox();
    sandbox.localStorage.setItem("boh_intranet_schedule", "null");
    sandbox.loadScript("js/intranet-api.js");
    const IntranetApi = sandbox.window.IntranetApi;

    const sch = await IntranetApi.getSchedule();
    if (sch === null || !Array.isArray(sch)) {
      throw new Error(`getSchedule returned ${sch} instead of Array fallback when storage item is "null"`);
    }

    pass("1.4 IntranetApi ensures Array return value even if storage key contains \"null\"");
  } catch (err) {
    fail("1.4 IntranetApi returns null instead of Array fallback on storage key \"null\"", err, "Observed: getStorageItem returns JSON.parse('null') which is null, causing callers doing schedule.filter() to crash");
  }


  // ==========================================================================
  // SECTION 2: Rapid Multi-Click / Double-Submission
  // ==========================================================================
  console.log(`\n${colors.cyan}▶ SECTION 2: Rapid Multi-Click / Double-Submission${colors.reset}`);

  // Test 2.1: Rapid multi-invocation of BohStore.saveSignup (idempotency)
  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    const BohStore = sandbox.window.BohStore;

    // Simulate 10 concurrent clicks
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(Promise.resolve().then(() => BohStore.saveSignup("race-101", ["100 VZ", "200 VZ"], "Click " + i)));
    }
    await Promise.all(promises);

    const signups = BohStore.getSignups();
    const keys = Object.keys(signups).filter(k => k === "race-101");
    assert.strictEqual(keys.length, 1, "Only 1 signup record should exist for race-101 despite 10 rapid submissions");
    assert.ok(signups["race-101"].note.startsWith("Click "), "Record contains valid note");

    pass("2.1 BohStore.saveSignup is strictly idempotent under rapid concurrent multi-submission");
  } catch (err) {
    fail("2.1 BohStore.saveSignup is strictly idempotent under rapid concurrent multi-submission", err);
  }

  // Test 2.2: Rapid multi-invocation of BohStore.addSwimmerEntry (deduplication)
  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    const BohStore = sandbox.window.BohStore;

    for (let i = 0; i < 5; i++) {
      BohStore.addSwimmerEntry("race-101", {
        swimmer: "Petr Klokan",
        group: "ST",
        year: 2009,
        gender: "M",
        disciplines: ["50 VZ"],
        note: "Entry " + i
      });
    }

    const roster = BohStore.getRosterForEvent("race-101");
    const matching = roster.filter(r => r.swimmer.toLowerCase() === "petr klokan");
    assert.strictEqual(matching.length, 1, "Roster must deduplicate same swimmer on multi-submission");

    pass("2.2 BohStore.addSwimmerEntry deduplicates identical swimmer on rapid submissions");
  } catch (err) {
    fail("2.2 BohStore.addSwimmerEntry deduplicates identical swimmer on rapid submissions", err);
  }

  // Test 2.3: IntranetApi.submitEntry rapid submissions & deduplication
  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/intranet-api.js");
    const IntranetApi = sandbox.window.IntranetApi;

    // Probing IntranetApi.submitEntry
    await IntranetApi.submitEntry("sch-1", "Podzimní cena", ["50 VZ"], "Swimmer A");
    await IntranetApi.submitEntry("sch-1", "Podzimní cena", ["50 VZ", "100 VZ"], "Swimmer A");

    const entries = await IntranetApi.getMyEntries();
    const swimmerEntries = entries.filter(e => e.eventId === "sch-1" && e.swimmerName === "Swimmer A");
    if (swimmerEntries.length > 1) {
      throw new Error(`IntranetApi.submitEntry created ${swimmerEntries.length} duplicate entries for same event and swimmer`);
    }

    pass("2.3 IntranetApi.submitEntry deduplicates entries for same event & swimmer");
  } catch (err) {
    fail("2.3 IntranetApi.submitEntry lacks deduplication for same event & swimmer", err, "Observed: submitEntry unconditionally unshifts into boh_intranet_my_entries without checking if swimmer already entered eventId");
  }


  // ==========================================================================
  // SECTION 3: Offline Mutation Queue Draining During Intermittent Connectivity
  // ==========================================================================
  console.log(`\n${colors.cyan}▶ SECTION 3: Offline Mutation Queue Draining During Intermittent Connectivity${colors.reset}`);

  // Test 3.1: Complete drain when connection is healthy
  try {
    const sandbox = createTestSandbox({ offline: true });
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    sandbox.loadScript("js/supabase.js");
    const BohStore = sandbox.window.BohStore;

    // Enqueue 3 mutations offline
    BohStore.saveAdminItem({ id: "mut-news-1", kind: "aktualita", status: "approved", title: "Offline News 1" });
    BohStore.saveAdminItem({ id: "mut-news-2", kind: "aktualita", status: "approved", title: "Offline News 2" });
    BohStore.saveSignup("mut-event-1", ["100 VZ"], "Offline note");

    let q = BohStore.getOfflineQueue();
    assert.strictEqual(q.length, 3, "Queue should contain 3 mutations");

    // Reconnect: triggers window online event which begins draining
    sandbox.setOffline(false);
    await new Promise(r => setTimeout(r, 150));

    q = BohStore.getOfflineQueue();
    assert.strictEqual(q.length, 0, "Queue should be completely empty after clean drain");

    pass("3.1 Offline mutation queue drains completely and clears on stable connection");
  } catch (err) {
    fail("3.1 Offline mutation queue drains completely and clears on stable connection", err);
  }

  // Test 3.2: Connectivity drops mid-drain (isOffline becomes true)
  try {
    const sandbox = createTestSandbox({ offline: true });
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    sandbox.loadScript("js/supabase.js");
    const BohStore = sandbox.window.BohStore;

    BohStore.saveAdminItem({ id: "drop-1", kind: "aktualita", status: "approved", title: "Drop Test 1" });
    BohStore.saveAdminItem({ id: "drop-2", kind: "aktualita", status: "approved", title: "Drop Test 2" });
    BohStore.saveAdminItem({ id: "drop-3", kind: "aktualita", status: "approved", title: "Drop Test 3" });

    let requestCount = 0;
    const origFetch = sandbox.window.fetch;
    sandbox.window.fetch = async (url, opts) => {
      requestCount++;
      const res = await origFetch(url, opts);
      if (requestCount >= 1) {
        sandbox.setOffline(true);
      }
      return res;
    };

    sandbox.setOffline(false);
    await new Promise(r => setTimeout(r, 150));

    const remaining = BohStore.getOfflineQueue();
    assert.ok(remaining.length > 0, "Remaining items must not be dropped when connection is lost mid-drain");
    assert.ok(remaining.some(m => String(m.id) === "drop-2" || String(m.id) === "drop-3"), "Unprocessed items remain in queue");

    pass("3.2 Queue drain preserves unplayed mutations when network drops mid-stream");
  } catch (err) {
    fail("3.2 Queue drain preserves unplayed mutations when network drops mid-stream", err);
  }

  // Test 3.3: Intermittent server errors (HTTP 500) during drain - check mutation retention
  try {
    const sandbox = createTestSandbox({ offline: true });
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    sandbox.loadScript("js/supabase.js");
    const BohStore = sandbox.window.BohStore;

    BohStore.saveAdminItem({ id: "fail-news-1", kind: "aktualita", status: "approved", title: "Fail News 1" });
    assert.strictEqual(BohStore.getOfflineQueue().length, 1, "Item enqueued");

    // Make server fail with HTTP 500
    sandbox.postgrestMock.shouldFailNextRequest = 500;
    sandbox.setOffline(false); // triggers online drain

    await new Promise(r => setTimeout(r, 150));

    const q = BohStore.getOfflineQueue();
    // Did the item remain in the queue or was it wiped?
    if (q.length === 0) {
      throw new Error("Mutation was wiped from offline queue despite HTTP 500 server failure!");
    }

    pass("3.3 Offline queue preserves mutations when server responds with HTTP 500");
  } catch (err) {
    fail("3.3 Offline queue drops mutations on HTTP 500 server failure", err, "Observed: KlokaniSupabase.saveNews returns success:true even on HTTP 500 error, so drainOfflineQueue believes the replay succeeded and removes the mutation from localStorage, causing permanent data loss");
  }

  // Test 3.4: Concurrent enqueuing while drain is in progress
  try {
    const sandbox = createTestSandbox({ offline: true });
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    sandbox.loadScript("js/supabase.js");
    const BohStore = sandbox.window.BohStore;

    BohStore.saveAdminItem({ id: "item-a", kind: "aktualita", status: "approved", title: "Item A" });

    const origFetch = sandbox.window.fetch;
    sandbox.window.fetch = async (url, opts) => {
      BohStore.enqueueOfflineMutation({ id: "item-b", action: "save", kind: "aktualita", payload: { id: "item-b", title: "Item B" } });
      return origFetch(url, opts);
    };

    sandbox.setOffline(false);
    await new Promise(r => setTimeout(r, 150));

    const q = BohStore.getOfflineQueue();
    const hasB = q.some(it => String(it.id) === "item-b");
    assert.ok(hasB, "Concurrently enqueued Item B must be preserved in queue");

    pass("3.4 Concurrently enqueued mutations during async drain are preserved in localStorage");
  } catch (err) {
    fail("3.4 Concurrently enqueued mutations during async drain are preserved in localStorage", err);
  }


  // ==========================================================================
  // SECTION 4: CSV Formula Injection Edge Cases
  // ==========================================================================
  console.log(`\n${colors.cyan}▶ SECTION 4: CSV Formula Injection Edge Cases (=, +, -, @, \\t, \\r, %)${colors.reset}`);

  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/store.js");
    const sanitizeCsv = sandbox.window.sanitizeCsv;

    const testVectors = [
      { input: "=1+1", expectedStart: "'" },
      { input: "+1+1", expectedStart: "'" },
      { input: "-1+1", expectedStart: "'" },
      { input: "@SUM(A1:A10)", expectedStart: "'" },
      { input: "\t=cmd|' /C calc'!A0", expectedStart: "'" },
      { input: "\r=1+1", expectedStart: "'" },
      { input: "%1+1", expectedStart: "'" },
      { input: "   =1+1", expectedStart: "'" },
      { input: "  \t=1+1", expectedStart: "'" },
      { input: "   @test", expectedStart: "'" },
      { input: "   -2+5", expectedStart: "'" },
      { input: "Normal Swimmer", expectedStart: "N" },
      { input: "Jan Srb (hlavní trenér)", expectedStart: "J" },
      { input: "", expectedStart: "" },
      { input: null, expectedStart: "" },
      { input: undefined, expectedStart: "" }
    ];

    for (const tv of testVectors) {
      const sanitized = sanitizeCsv(tv.input);
      if (tv.expectedStart === "'") {
        assert.ok(sanitized.startsWith("'"), `Payload "${tv.input}" must be prefixed with single quote, got: "${sanitized}"`);
      } else if (tv.expectedStart === "") {
        assert.strictEqual(sanitized, "", `Empty input should return empty string`);
      } else {
        assert.ok(!sanitized.startsWith("'"), `Benign input "${tv.input}" should not be prefixed with quote, got: "${sanitized}"`);
      }
    }

    pass("4.1 BohStore.sanitizeCsv correctly neutralizes formula injection prefixes (=, +, -, @, \\t, \\r, %) including leading spaces");
  } catch (err) {
    fail("4.1 BohStore.sanitizeCsv correctly neutralizes formula injection prefixes", err);
  }

  // Test 4.2: Full exportSignupsCsv CSV generation with adversarial payloads
  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    const BohStore = sandbox.window.BohStore;

    BohStore.addEvent({
      id: "ev-csv-test",
      name: "=HYPERLINK(\"http://evil.com\",\"Závod\")",
      place: "+Podolí 50m",
      date: "2026-11-20",
      deadline: "2026-11-15"
    });

    BohStore.addSwimmerEntry("ev-csv-test", {
      swimmer: "@attacker",
      group: "-ST",
      year: 2010,
      gender: "M",
      disciplines: ["\t50 VZ"],
      note: "\r=cmd|' /C calc'!A0"
    });

    const csvOutput = BohStore.exportSignupsCsv("ev-csv-test");
    assert.ok(csvOutput.startsWith("\uFEFF"), "CSV must include UTF-8 BOM");

    const lines = csvOutput.split("\r\n");
    assert.ok(lines.length >= 2, "CSV must contain header and at least one row");

    const dataRow = lines[1];
    const cells = dataRow.split(";").map(c => c.replace(/^"/, "").replace(/"$/, ""));

    for (const cell of cells) {
      if (cell.length > 0) {
        assert.ok(!/^[=+\-@\t\r%]/.test(cell), `Cell "${cell}" must not start with raw formula character!`);
      }
    }

    pass("4.2 BohStore.exportSignupsCsv completely sanitizes formula injection across all columns");
  } catch (err) {
    fail("4.2 BohStore.exportSignupsCsv completely sanitizes formula injection across all columns", err);
  }

  // Test 4.3: IntranetApi.exportCspsCsv fallback branch formula injection
  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/intranet-api.js");
    const IntranetApi = sandbox.window.IntranetApi;

    // Simulate entry with formula in swimmerName in IntranetApi
    await IntranetApi.submitEntry("sch-fallback-1", "Test Meet", ["50 VZ"], "=cmd|' /C calc'!A0");

    let downloadedCsv = "";
    const origCreateElement = sandbox.window.document.createElement;
    sandbox.window.document.createElement = (tag) => {
      const el = origCreateElement.call(sandbox.window.document, tag);
      if (tag === "a") {
        el.click = () => {};
      }
      return el;
    };
    const origRevoke = globalThis.URL.revokeObjectURL;
    const origCreate = globalThis.URL.createObjectURL;
    globalThis.URL.createObjectURL = (blob) => {
      // Extract blob text
      blob.text().then(t => { downloadedCsv = t; });
      return "blob:mock";
    };

    await IntranetApi.exportCspsCsv("sch-fallback-1");
    await new Promise(r => setTimeout(r, 20));

    globalThis.URL.createObjectURL = origCreate;

    if (downloadedCsv.includes(";=cmd|' /C calc'!A0;")) {
      throw new Error("IntranetApi.exportCspsCsv fallback branch outputs unescaped formula in swimmerName: ';=cmd|...'");
    }

    pass("4.3 IntranetApi.exportCspsCsv fallback branch neutralizes formula injection");
  } catch (err) {
    fail("4.3 IntranetApi.exportCspsCsv fallback branch lacks CSV formula sanitization", err, "Observed: IntranetApi.exportCspsCsv lines 695-697 directly concatenate e.swimmerName without sanitizeCsv");
  }


  // ==========================================================================
  // SECTION 5: DOM XSS Escaping Across All Renderers
  // ==========================================================================
  console.log(`\n${colors.cyan}▶ SECTION 5: DOM XSS Escaping Across All Renderers${colors.reset}`);

  // Test 5.1: escapeHtml character coverage
  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/store.js");
    const escapeHtml = sandbox.window.escapeHtml;

    const dangerous = `<script>alert('XSS "with" & ` + "`" + `')</script>`;
    const escaped = escapeHtml(dangerous);

    assert.ok(!escaped.includes("<script>"), "Must escape <");
    assert.ok(!escaped.includes(">"), "Must escape >");
    assert.ok(!escaped.includes('"'), "Must escape double quotes");
    assert.ok(!escaped.includes("'"), "Must escape single quotes");
    assert.ok(!escaped.includes("`"), "Must escape backticks");
    assert.ok(escaped.includes("&amp;"), "Must escape &");

    pass("5.1 escapeHtml properly sanitizes all 6 OWASP XSS characters (&, <, >, \", ', `)");
  } catch (err) {
    fail("5.1 escapeHtml properly sanitizes all 6 OWASP XSS characters", err);
  }

  // Test 5.2: Announcements card rendering in intranet.js
  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    sandbox.loadScript("js/intranet-api.js");

    const testDiv = sandbox.document.createElement("div");
    testDiv.setAttribute("id", "intranet-main");
    sandbox.document.getElementById = (id) => id === "intranet-main" ? testDiv : new MockElement("div");

    const xssAnnouncement = {
      id: "ann-xss-1",
      title: "<img src=x onerror=alert('title')>",
      category: "<script>alert('cat')</script>",
      priority: "normal",
      date: "2026-10-24",
      author: "<svg onload=alert('author')>",
      content: "<b onmouseover=alert('content')>click</b>"
    };

    await sandbox.window.IntranetApi.createAnnouncement(xssAnnouncement);
    sandbox.loadScript("js/intranet.js");
    await sandbox.window.renderIntranetPortal();

    const renderedHtml = testDiv.innerHTML;
    assert.ok(!renderedHtml.includes("<img src=x"), "Intranet portal must escape <img> tags in announcements");
    assert.ok(!renderedHtml.includes("<script>"), "Intranet portal must escape <script> tags in announcements");
    assert.ok(!renderedHtml.includes("<svg onload="), "Intranet portal must escape <svg> tags in announcements");

    pass("5.2 Intranet portal sanitizes XSS payloads in announcements");
  } catch (err) {
    fail("5.2 Intranet portal sanitizes XSS payloads in announcements", err);
  }

  // Test 5.3: Lenex 3.0 XML export entity escaping
  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    sandbox.loadScript("js/intranet-api.js");
    sandbox.loadScript("js/intranet.js");

    const BohStore = sandbox.window.BohStore;
    BohStore.addEvent({
      id: "lenex-xss-event",
      name: "Meet & <Test> \"Quotes\" 'Apos'",
      place: "Prague & <City>"
    });

    BohStore.addSwimmerEntry("lenex-xss-event", {
      swimmer: "Jan & <Hacker> \"Smith\"",
      gender: "M",
      year: 2010,
      disciplines: ["50 VZ & <Entry>"]
    });

    const xml = sandbox.window.exportLenexXml("lenex-xss-event");
    assert.ok(!xml.includes('name="Meet & <Test>'), "Unescaped & or < in XML attribute forbidden");
    assert.ok(xml.includes("&amp;"), "XML entities must be escaped");
    assert.ok(xml.includes("&lt;"), "XML < must be &lt;");
    assert.ok(xml.includes("&gt;"), "XML > must be &gt;");

    pass("5.3 exportLenexXml strictly escapes XML entities in attributes and elements");
  } catch (err) {
    fail("5.3 exportLenexXml strictly escapes XML entities in attributes and elements", err);
  }

  // Test 5.4: zavody.html openSignUpDialog onclick injection probe
  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    const BohStore = sandbox.window.BohStore;

    // Malicious event ID containing JS breakout
    const maliciousId = "ev1\x27);alert(1);//";
    BohStore.addEvent({
      id: maliciousId,
      name: "Breakout Event",
      date: "2026-11-01",
      deadline: "2026-10-30"
    });

    const grid = sandbox.document.createElement("div");
    grid.setAttribute("id", "events-grid");
    sandbox.document.getElementById = (id) => id === "events-grid" ? grid : new MockElement("div");

    sandbox.loadScript("js/app.js");
    sandbox.loadHtmlInlineScripts("zavody.html");

    const rendered = grid.innerHTML;
    // Probe whether onclick attribute contains unescaped breakout
    if (rendered.includes("openSignUpDialog('ev1');alert(1);//')")) {
      throw new Error(`zavody.html interpolates unescaped event.id into onclick attribute: onclick="openSignUpDialog('${maliciousId}')"`);
    }

    pass("5.4 zavody.html escapes event.id in button onclick attribute");
  } catch (err) {
    fail("5.4 zavody.html interpolates unescaped event.id into button onclick handler", err, "Observed: zavody.html line 358 has onclick=\"openSignUpDialog('${e.id}')\" without escaping single quotes, enabling JS injection");
  }

  // Test 5.5: admin.html onclick quote breaking & JS execution probe
  try {
    const sandbox = createTestSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/store.js");
    const BohStore = sandbox.window.BohStore;

    // Swimmer with single quote in name (e.g. O'Connor or injection payload)
    const injectedSwimmer = "\x27 + (window.XSS_EXECUTED=1, \x27\x27) + \x27";
    BohStore.addSwimmerEntry("ev-admin-test", {
      swimmer: injectedSwimmer,
      group: "ST"
    });

    const adminContainer = sandbox.document.createElement("div");
    adminContainer.setAttribute("id", "admin-view");
    sandbox.document.getElementById = (id) => id === "admin-view" ? adminContainer : new MockElement("div");

    sandbox.loadHtmlInlineScripts("admin.html");

    const rendered = adminContainer.innerHTML;
    if (rendered.includes(`removeSwimmerEntry('ev-admin-test', '&#039; + (window.XSS_EXECUTED=1, &#039;&#039;) + &#039;')`)) {
      throw new Error("admin.html line 1232 uses escapeHtml inside single-quoted inline JS onclick handler, which browsers decode to raw quotes prior to JS evaluation");
    }

    pass("5.5 admin.html handles quotes in swimmer names safely in onclick handlers");
  } catch (err) {
    fail("5.5 admin.html uses escapeHtml inside inline JS onclick strings (decoding to raw quotes in attribute context)", err, "Observed: admin.html line 1232 interpolates '${escapeHtml(r.swimmer)}' directly inside single quotes in onclick, breaking JS execution for names with apostrophes (O'Connor) and enabling attribute JS breakout");
  }

  // Summary
  console.log(`\n${colors.bold}──────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`  ${colors.bold}ADVERSARIAL SUITE SUMMARY:${colors.reset}`);
  console.log(`  Total Probes: ${totalPassed + totalFailed}`);
  console.log(`  Passed: ${colors.green}${totalPassed}${colors.reset}`);
  console.log(`  Gaps Identified: ${totalFailed > 0 ? colors.red + totalFailed + colors.reset : colors.green + "0" + colors.reset}`);
  console.log(`${colors.bold}──────────────────────────────────────────────────────────────────${colors.reset}\n`);

  if (findings.length > 0) {
    console.log(`${colors.yellow}${colors.bold}Identified Adversarial Gaps (${findings.length}):${colors.reset}`);
    findings.forEach((f, idx) => {
      console.log(`  ${idx + 1}. [${f.name}]`);
      console.log(`     Error: ${f.error}`);
      if (f.details) console.log(`     Details: ${f.details}`);
    });
  }
}

runAdversarialSuite().catch(console.error);
