/**
 * Tier 2: Boundary & Corner Cases
 * Comprehensive robustness, edge-case, and adversarial validation.
 */

import assert from "node:assert";
import { describe, test } from "./runner.js";

describe("Tier 2: Boundary & Corner Cases", () => {

  // 1. Empty Inputs & Missing Fields
  test("T2.1: Empty Inputs & Missing Fields Handling", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;
    const sb = sandbox.window.KlokaniSupabase;

    // A. Empty object to saveAdminItem
    assert.doesNotThrow(() => {
      store.saveAdminItem({});
    }, "saveAdminItem({}) must not throw uncaught exceptions");

    // B. Null/empty fields in news
    assert.doesNotThrow(() => {
      store.addNews({ title: "", perex: "", content: "" });
    }, "addNews with empty strings must not throw");

    // C. Null/empty fields in events
    assert.doesNotThrow(() => {
      store.addEvent({ name: "", place: "", date: "" });
    }, "addEvent with empty strings must not throw");

    // D. Null/undefined in delete operations
    assert.doesNotThrow(() => {
      store.deleteNews(null);
      store.deleteNews(undefined);
      store.deleteNews("");
      store.deleteEvent(null);
      store.deleteAlert(undefined);
    }, "Deletion methods must safely ignore null/undefined/empty IDs");

    // E. Signup with empty swimmer name & missing disciplines
    await assert.doesNotReject(async () => {
      await sb.signupSwimmer("", "", null, "", "");
    }, "signupSwimmer with empty/null fields must not throw or reject");
  });

  // 2. Invalid Data Types & Malformed Inputs
  test("T2.2: Invalid Types & Malformed Data Sanitization", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;

    // A. Disciplines passed as invalid types (number, boolean, string, object)
    const testCases = [
      42,
      true,
      "50 VZ, 100 VZ",
      { disc: "50 VZ" }
    ];

    for (const invalidDisc of testCases) {
      assert.doesNotThrow(() => {
        store.addSwimmerEntry("event-invalid-disc", {
          swimmer: "Závodník Test",
          disciplines: invalidDisc,
          note: "Invalid type test"
        });
      }, `addSwimmerEntry must safely normalize non-array disciplines (${typeof invalidDisc})`);
    }

    const roster = store.getRosterForEvent("event-invalid-disc");
    assert.ok(Array.isArray(roster), "getRosterForEvent must return an array");
    for (const entry of roster) {
      assert.ok(Array.isArray(entry.disciplines), "Disciplines must be normalized to array");
    }

    // B. Numeric IDs passed where string expected
    assert.doesNotThrow(() => {
      store.deleteNews(12345);
      store.deleteEvent(99999);
      store.isSignedUp(777);
    }, "Store methods must handle numeric IDs smoothly without crashing");

    // C. Malformed dates
    assert.doesNotThrow(() => {
      store.addEvent({
        name: "Malformed Date Event",
        date: "NOT_A_DATE",
        deadline: "INVALID_DEADLINE"
      });
      const events = store.getEvents();
      assert.ok(Array.isArray(events));
    }, "Store must tolerate malformed date strings without breaking event list sorting");

    // D. Corrupted JSON in localStorage
    const storageKeys = [
      "klokani-news-cache",
      "boh-admin-items",
      "boh-signups",
      "boh-offline-queue",
      "boh-deleted-ids"
    ];

    for (const key of storageKeys) {
      sandbox.localStorage.setItem(key, "CORRUPT_JSON_{{{[undefined]");
    }

    assert.doesNotThrow(() => {
      store.getNews();
      store.getEvents();
      store.getSignups();
      store.getAdminItems();
    }, "Store getters must gracefully handle and recover from corrupted JSON in localStorage");
  });

  // 3. Oversized Text & Adversarial Payloads
  test("T2.3: Oversized Content & Adversarial Payloads (XSS, CSV Injection, Unicode)", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;
    const sec = sandbox.window.BohSecurity;

    // A. Oversized payloads (10KB title, 100KB body)
    const longTitle = "A".repeat(10_000);
    const longBody = "Dlouhý text odstavce. ".repeat(5_000); // ~110KB

    assert.doesNotThrow(() => {
      store.addNews({
        title: longTitle,
        perex: "Perex",
        content: longBody
      });
      const news = store.getNews();
      const saved = news.find(n => n.title === longTitle);
      assert.ok(saved, "Oversized news article must be successfully stored and retrieved");
    }, "Oversized text must not cause memory exhaustion or parsing exceptions");

    // B. Unicode & Czech diacritics & Emojis
    const czechPangram = "Příliš žluťoučký kůň úpěl ďábelské ódy 🏊‍♂️🥇🇨🇿";
    store.addNews({
      title: czechPangram,
      perex: czechPangram,
      content: czechPangram
    });

    const foundNews = store.getNews().find(n => n.title === czechPangram);
    assert.ok(foundNews, "Czech diacritics and emojis must be preserved byte-for-byte");
    assert.strictEqual(foundNews.title, czechPangram);

    // C. XSS Escaping Integrity
    const xssPayloads = [
      "<script>alert('XSS')</script>",
      "<img src=x onerror=alert(1)>",
      "';alert(String.fromCharCode(88,83,83))//",
      "\" onfocus=\"alert(1)\" autofocus=\"",
      "<svg/onload=alert(1)>"
    ];

    for (const payload of xssPayloads) {
      const escaped = sec.escapeHtml(payload);
      assert.ok(!escaped.includes("<script>"), "escapeHtml must neutralize <script>");
      assert.ok(!escaped.includes("<img"), "escapeHtml must neutralize <img");
      assert.ok(!escaped.includes("<svg"), "escapeHtml must neutralize <svg");
      assert.ok(!escaped.includes('"'), "escapeHtml must escape double quotes");
    }

    // D. CSV Formula Injection Defense for core formula triggers (=, @, +, -, %)
    const formulaPayloads = [
      "=cmd|' /C calc'!A0",
      "+12345",
      "-5+5",
      "@SUM(1,2)",
      "%PROGRAMFILES%"
    ];

    for (const payload of formulaPayloads) {
      const sanitized = sec.sanitizeCsv(payload);
      assert.ok(sanitized.startsWith("'"), `sanitizeCsv must prepend single quote to formula trigger '${payload}', got: '${sanitized}'`);
    }
  });

  // 4. Network Disconnect Simulation & Error Resiliency
  test("T2.4: Network Disconnect & Server Failure Resilience (500, 503, 429, Offline)", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const sb = sandbox.window.KlokaniSupabase;

    // A. Total network disconnect (TypeError: Failed to fetch)
    sandbox.setOffline(true);

    let offlineResult = null;
    await assert.doesNotReject(async () => {
      offlineResult = await sb.getNews();
    }, "KlokaniSupabase.getNews must not throw uncaught error when network is disconnected");
    assert.ok(Array.isArray(offlineResult) && offlineResult.length > 0, "Must fall back to cached/static news array");

    // B. Simulated HTTP 500 Internal Server Error
    sandbox.setOffline(false);
    sandbox.postgrestMock.shouldFailNextRequest = 500;

    let res500 = null;
    await assert.doesNotReject(async () => {
      res500 = await sb.getEvents();
    }, "KlokaniSupabase.getEvents must not throw on HTTP 500");
    assert.ok(Array.isArray(res500), "Must gracefully return fallback data on HTTP 500");

    // C. Simulated HTTP 503 Service Unavailable
    sandbox.postgrestMock.shouldFailNextRequest = 503;
    let res503 = null;
    await assert.doesNotReject(async () => {
      res503 = await sb.getNews();
    }, "Must not throw on HTTP 503");
    assert.ok(Array.isArray(res503));

    // D. Simulated HTTP 429 Too Many Requests
    sandbox.postgrestMock.shouldFailNextRequest = 429;
    let res429 = null;
    await assert.doesNotReject(async () => {
      res429 = await sb.getNews();
    }, "Must not throw on HTTP 429");
    assert.ok(Array.isArray(res429));
  });

});
