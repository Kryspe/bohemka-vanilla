/**
 * Tier 3: Cross-Feature Combinations
 * Pairwise and multi-module interaction tests.
 */

import assert from "node:assert";
import { describe, test } from "./runner.js";

const SUPABASE_URL = "https://xjvpyznywisuuykwsedd.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ";

describe("Tier 3: Cross-Feature Combinations", () => {

  // Pair 1: Admin Event Creation -> Calendar Presentation -> Deletion
  test("T3.1: Admin Event Creation -> zavody.html Calendar -> Deletion Lifecycle", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;

    // Track reactivity events
    const receivedEvents = [];
    sandbox.window.addEventListener("boh:data-updated", (e) => {
      receivedEvents.push(e.detail);
    });

    // 1. Create event in Admin
    const eventData = {
      name: "Podzimní cena Bohemians 2026",
      place: "Podolí 50m, Praha",
      date: "2026-11-20",
      deadline: "2026-11-15",
      type: "Oddílový závod",
      disciplines: ["50 VZ", "100 VZ", "200 VZ", "100 Z", "200 PZ"],
      note: "Sraz v 7:45 u šaten"
    };

    const updatedEvents = store.addEvent(eventData);
    assert.ok(Array.isArray(updatedEvents), "addEvent must return updated events list");

    // Verify event bus notification
    assert.ok(receivedEvents.length > 0, "boh:data-updated must be dispatched");
    const lastEvent = receivedEvents[receivedEvents.length - 1];
    assert.ok(lastEvent.kind === "zavod" || lastEvent.kind === "events");

    // 2. Verify calendar query (zavody.html consumer)
    const calendarEvents = store.getEvents();
    const created = calendarEvents.find(e => e.name === "Podzimní cena Bohemians 2026");
    assert.ok(created, "Event must be visible in getEvents()");
    assert.strictEqual(created.place, "Podolí 50m, Praha");
    assert.strictEqual(created.date, "2026-11-20");
    assert.strictEqual(created.deadline, "2026-11-15");
    assert.deepStrictEqual(Array.from(created.disciplines), ["50 VZ", "100 VZ", "200 VZ", "100 Z", "200 PZ"]);

    // 3. Delete event in Admin
    store.deleteEvent(created.id);

    // 4. Verify removed from calendar
    const calendarAfterDelete = store.getEvents();
    const deletedFound = calendarAfterDelete.find(e => e.id === created.id);
    assert.strictEqual(deletedFound, undefined, "Deleted event must no longer appear in getEvents()");
  });

  // Pair 2: Intranet Swimmer Signup -> Roster Verification -> CSV Export -> Cancel
  test("T3.2: Swimmer Signup -> Roster -> ČSPS CSV Export -> Cancel Lifecycle", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;
    const eventId = "test-event-pair-2";

    // Create event
    store.addEvent({
      id: eventId,
      name: "Pohár města Plzně",
      date: "2026-12-05",
      place: "Plzeň Slovany"
    });

    // 1. Swimmer signs up
    const swimmerName = "Jakub Štemberk";
    store.addSwimmerEntry(eventId, {
      swimmer: swimmerName,
      disciplines: ["100 VZ", "200 VZ"],
      group: "ST",
      note: "Prosím přihlásit i štafetu"
    });

    // 2. Verify roster for event
    const roster = store.getRosterForEvent(eventId);
    const entry = roster.find(r => r.swimmer === swimmerName);
    assert.ok(entry, `Swimmer '${swimmerName}' must be present in event roster`);
    assert.deepStrictEqual(Array.from(entry.disciplines), ["100 VZ", "200 VZ"]);
    assert.strictEqual(entry.note, "Prosím přihlásit i štafetu");

    // 3. Export CSV roster for coach
    const csv = store.exportSignupsCsv(eventId);
    assert.ok(typeof csv === "string", "exportSignupsCsv must return CSV string");
    assert.ok(csv.includes("Pohár města Plzně"), "CSV must contain race name");
    assert.ok(csv.includes("Jakub Štemberk"), "CSV must contain swimmer name");
    assert.ok(csv.includes("100 VZ, 200 VZ"), "CSV must contain selected disciplines");
    assert.ok(csv.includes("Prosím přihlásit i štafetu"), "CSV must contain note");

    // 4. Swimmer cancels signup
    store.removeSwimmerEntry(eventId, swimmerName);

    // 5. Verify removed from roster
    const rosterAfterCancel = store.getRosterForEvent(eventId);
    const foundAfterCancel = rosterAfterCancel.find(r => r.swimmer === swimmerName);
    assert.strictEqual(foundAfterCancel, undefined, "Cancelled swimmer must not appear in roster");
  });

  // Pair 3: Admin News Publishing -> Public News Feed -> News Deletion
  test("T3.3: Admin News Publishing -> aktuality.html Feed -> Deletion Lifecycle", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;

    // 1. Publish news in Admin (passing both excerpt and perex to test compatibility)
    const newsTitle = "Mistrovství ČR v plavání dorostu a dospělých 2026";
    store.addNews({
      title: newsTitle,
      excerpt: "Klokani vybojovali celkem 12 medailí na šampionátu v Pardubicích.",
      perex: "Klokani vybojovali celkem 12 medailí na šampionátu v Pardubicích.",
      body: ["Vynikající výkony předvedli všichni naši reprezentanti. Gratulujeme!"],
      content: "Vynikající výkony předvedli všichni naši reprezentanti. Gratulujeme!",
      author: "Jan Srb",
      category: "Závody",
      date: "2026-10-18"
    });

    // 2. Verify public feed (aktuality.html consumer)
    const allNews = store.getNews();
    const published = allNews.find(n => n.title === newsTitle);
    assert.ok(published, "Published news article must be present in getNews()");
    assert.strictEqual(published.author, "Jan Srb");
    assert.strictEqual(published.excerpt, "Klokani vybojovali celkem 12 medailí na šampionátu v Pardubicích.");

    // Verify chronological order (newest first)
    const dates = allNews.map(n => new Date(n.date).getTime()).filter(t => !isNaN(t));
    for (let i = 0; i < dates.length - 1; i++) {
      assert.ok(dates[i] >= dates[i + 1], "News feed must be sorted in descending chronological order");
    }

    // 3. Delete news in Admin
    store.deleteNews(published.id);

    // 4. Verify removed from feed
    const newsAfterDelete = store.getNews();
    const foundDeleted = newsAfterDelete.find(n => n.id === published.id);
    assert.strictEqual(foundDeleted, undefined, "Deleted news article must no longer be present in getNews()");
  });

  // Pair 4: Coach Announcements -> Parent Board -> Update -> Removal
  test("T3.4: Coach Announcement -> pro-rodice.html -> Update -> Removal Lifecycle", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;

    // 1. Coach creates announcement
    store.addAlert({
      title: "Organizace odjezdu na soustředění",
      fields: {
        text: "Odjezd autobusu v pátek 24. října ve 14:00 od bazénu Podolí.",
        typ: "dulezite",
        datum: "2026-10-19"
      }
    });

    // 2. Parent checks board (pro-rodice.html consumer)
    let notes = store.getParentsNotes();
    let note = notes.find(n => (n.text && n.text.includes("Odjezd autobusu")) || (n.title && n.title.includes("Organizace odjezdu")));
    assert.ok(note, "Announcement must appear in getParentsNotes()");

    // 3. Coach updates announcement
    store.saveAdminItem({
      id: note.id,
      kind: "informace",
      status: "approved",
      title: "Organizace odjezdu na soustředění - AKTUALIZOVÁNO",
      fields: {
        text: "Odjezd posunut na 14:30 z důvodu dopravní uzavírky.",
        typ: "dulezite",
        datum: "2026-10-19"
      }
    });

    notes = store.getParentsNotes();
    note = notes.find(n => n.id === note.id);
    assert.ok(note, "Updated announcement must remain in getParentsNotes()");
    assert.ok(note.text.includes("14:30"), "Updated time must be reflected");

    // 4. Coach removes announcement after event
    store.deleteAlert(note.id);
    notes = store.getParentsNotes();
    const deletedNote = notes.find(n => n.id === note.id);
    assert.strictEqual(deletedNote, undefined, "Deleted announcement must not appear in getParentsNotes()");
  });

  // Pair 5: Offline Outbox Queue & Online Synchronization
  test("T3.5: Offline Mutation Buffering -> Online Reconnection -> PostgREST Synchronization", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;
    const newsId = `offline-sync-news-${Date.now()}`;

    try {
      // Step 1: Disconnect network
      sandbox.setOffline(true);

      // Step 2: Perform mutation while offline
      store.addNews({
        id: newsId,
        title: "Offline Zpráva z autobusu",
        excerpt: "Plavci dorazili v pořádku.",
        perex: "Plavci dorazili v pořádku.",
        date: "2026-10-20"
      });

      // Verify outbox queue captures mutation
      const queueRaw = sandbox.localStorage.getItem("boh-offline-queue");
      assert.ok(queueRaw, "localStorage 'boh-offline-queue' must be populated while offline (Milestone M3 requirement)");

      // Step 3: Reconnect network
      sandbox.setOffline(false);

      // Allow event loop to process async replay (poll for live network completion)
      for (let i = 0; i < 30; i++) {
        const q = JSON.parse(sandbox.localStorage.getItem("boh-offline-queue") || "[]");
        if (q.length === 0) break;
        await new Promise(r => setTimeout(r, 100));
      }

      // Verify queue was drained
      const queueAfterDrain = JSON.parse(sandbox.localStorage.getItem("boh-offline-queue") || "[]");
      assert.strictEqual(queueAfterDrain.length, 0, "Outbox queue must be empty after successful online sync");
    } finally {
      if (ctx.isLive) {
        try {
          await fetch(`${SUPABASE_URL}/rest/v1/news?id=eq.${newsId}`, {
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

});
