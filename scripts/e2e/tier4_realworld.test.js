/**
 * Tier 4: Real-World Application Scenarios
 * End-to-end user journeys simulating complete swimming club workflows.
 */

import assert from "node:assert";
import { describe, test } from "./runner.js";

const SUPABASE_URL = "https://xjvpyznywisuuykwsedd.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ";

describe("Tier 4: Real-World Application Scenarios", () => {

  // Workflow 1: New Season Race Registration Flow
  test("T4.1: End-to-End New Season Race Registration & ČSPS Submission Journey", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;

    // Step 1: Coach creates new competition in Intranet / Admin
    const competitionId = "race-jarni-cena-2027";
    store.addEvent({
      id: competitionId,
      name: "Jarní cena Prahy 2027",
      place: "Podolí 50m, Praha 4",
      date: "2027-03-20",
      deadline: "2027-03-15",
      type: "Krajský přebor",
      disciplines: ["50 VZ", "100 VZ", "200 VZ", "100 P", "200 PZ"],
      groups: ["ST", "ODA", "ODB"],
      note: "Sraz všech plavců v 8:00 u vchodu do bazénu."
    });

    // Step 2: Public calendar consumer verifies race is open
    const calendar = store.getEvents();
    const race = calendar.find(e => e.id === competitionId);
    assert.ok(race, "Race must appear on public calendar");
    assert.strictEqual(race.name, "Jarní cena Prahy 2027");

    // Step 3: Swimmer 1 (Jan Novák) signs up
    store.addSwimmerEntry(competitionId, {
      swimmer: "Jan Novák",
      disciplines: ["50 VZ", "100 VZ"],
      group: "ST",
      note: "Cíl splnit limit na MČR"
    });

    // Step 4: Swimmer 2 (Natálie Zápotocká) signs up
    store.addSwimmerEntry(competitionId, {
      swimmer: "Natálie Zápotocká",
      disciplines: ["100 P", "200 PZ"],
      group: "ST",
      note: "Prosím přihlásit i do štafety 4x50 PZ"
    });

    // Step 5: Coach inspects event roster in Intranet
    const roster = store.getRosterForEvent(competitionId);
    assert.strictEqual(roster.length, 2, "Event roster must contain exactly 2 entries");

    const jan = roster.find(r => r.swimmer === "Jan Novák");
    const natalie = roster.find(r => r.swimmer === "Natálie Zápotocká");
    assert.ok(jan && natalie, "Both swimmers must be registered");
    assert.deepStrictEqual(Array.from(jan.disciplines), ["50 VZ", "100 VZ"]);
    assert.deepStrictEqual(Array.from(natalie.disciplines), ["100 P", "200 PZ"]);

    // Step 6: Coach exports ČSPS submission CSV
    const csvContent = store.exportSignupsCsv(competitionId);
    assert.ok(csvContent.startsWith("\uFEFF"), "CSV must include UTF-8 BOM for Excel compatibility");
    assert.ok(csvContent.includes("Jarní cena Prahy 2027"));
    assert.ok(csvContent.includes("Jan Novák"));
    assert.ok(csvContent.includes("Natálie Zápotocká"));
    assert.ok(csvContent.includes("Cíl splnit limit na MČR"));

    // Step 7: Swimmer 1 cancels registration before deadline
    store.removeSwimmerEntry(competitionId, "Jan Novák");
    const rosterAfterCancel = store.getRosterForEvent(competitionId);
    assert.strictEqual(rosterAfterCancel.length, 1, "Roster count must update to 1 after cancellation");
    assert.strictEqual(rosterAfterCancel[0].swimmer, "Natálie Zápotocká");
  });

  // Workflow 2: Coach Announcement & Parent Communication Journey
  test("T4.2: End-to-End Coach Urgent Announcement & Parent Multi-View Journey", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;

    // Step 1: Head coach publishes emergency schedule change
    const alertId = "coach-alert-urgent-1";
    store.saveAdminItem({
      id: alertId,
      kind: "informace",
      status: "approved",
      title: "HAVÁRIE VODY: Trénink 21. října přesunut",
      fields: {
        text: "Z důvodu technické odstávky na Podolí se úterní trénink přesouvá na bazén Slavia v Edenu od 16:30.",
        typ: "dulezite",
        datum: "2026-10-20"
      }
    });

    // Step 2: Parent checks pro-rodice.html board
    const parentNotes = store.getParentsNotes();
    const alert = parentNotes.find(n => n.id === alertId);
    assert.ok(alert, "Urgent announcement must be immediately visible to parents");
    assert.ok(alert.text.includes("Slavia v Edenu"), "Announcement must contain new venue");
    assert.strictEqual(alert.type, "dulezite", "Announcement must preserve 'dulezite' urgency level");

    // Step 3: Coach updates announcement with locker room guidelines
    store.saveAdminItem({
      id: alertId,
      kind: "informace",
      status: "approved",
      title: "HAVÁRIE VODY: Trénink 21. října přesunut (DOPLNĚNÍ)",
      fields: {
        text: "Z důvodu technické odstávky na Podolí se úterní trénink přesouvá na bazén Slavia v Edenu od 16:30. Vstup přes recepci pro sportovce, šatna č. 3.",
        typ: "dulezite",
        datum: "2026-10-20"
      }
    });

    const updatedNotes = store.getParentsNotes();
    const updatedAlert = updatedNotes.find(n => n.id === alertId);
    assert.ok(updatedAlert.text.includes("šatna č. 3"), "Updated details must be reflected");

    // Step 4: After event passes, coach archives/removes alert
    store.deleteAlert(alertId);
    const finalNotes = store.getParentsNotes();
    const removedAlert = finalNotes.find(n => n.id === alertId);
    assert.strictEqual(removedAlert, undefined, "Archived announcement must not be shown to parents");
  });

  // Workflow 3: Mobile Offline Race Sign-up & Delayed Sync Journey
  test("T4.3: End-to-End Mobile Offline Race Registration & Automatic Background Sync Journey", async (ctx) => {
    const sandbox = ctx.createSandbox();
    sandbox.loadScript("js/data.js");
    sandbox.loadScript("js/supabase.js");
    sandbox.loadScript("js/store.js");

    const store = sandbox.window.BohStore;
    let targetEventId = null;
    const swimmerName = "Barbora Seemanová";

    try {
      // Step 1: Swimmer is on a bus with no connectivity
      sandbox.setOffline(true);
      assert.strictEqual(sandbox.window.navigator.onLine, false, "Navigator must report offline");

      // Step 2: Swimmer views offline calendar
      const offlineCalendar = store.getEvents();
      assert.ok(offlineCalendar.length > 0, "Calendar must load successfully from fallback data while offline");
      const targetEvent = offlineCalendar[0];
      targetEventId = targetEvent.id;

      // Step 3: Swimmer submits registration while disconnected
      store.addSwimmerEntry(targetEvent.id, {
        swimmer: swimmerName,
        disciplines: ["100 VZ", "200 VZ"],
        group: "ST",
        note: "Offline registrace z mobilu"
      });

      // Step 4: App optimistically records signup in localStorage
      const localRoster = store.getRosterForEvent(targetEvent.id);
      const localEntry = localRoster.find(r => r.swimmer === swimmerName);
      assert.ok(localEntry, "Registration must be recorded in local state immediately (optimistic UI)");

      // Step 5: App buffers mutation into offline outbox queue (Milestone M3 requirement)
      const queueRaw = sandbox.localStorage.getItem("boh-offline-queue");
      assert.ok(queueRaw, "Outbox queue 'boh-offline-queue' must hold pending mutation when offline (Milestone M3 requirement)");

      // Step 6: Swimmer arrives at pool and phone reconnects to WiFi
      let syncEventDispatched = false;
      sandbox.window.addEventListener("boh:data-updated", (e) => {
        if (e.detail && (e.detail.action === "sync" || e.detail.kind === "sync" || e.detail.kind === "all")) {
          syncEventDispatched = true;
        }
      });

      sandbox.setOffline(false); // triggers 'online' event on window

      // Step 7: Wait for async replay to complete (poll for live network completion)
      for (let i = 0; i < 30; i++) {
        const q = JSON.parse(sandbox.localStorage.getItem("boh-offline-queue") || "[]");
        if (q.length === 0) break;
        await new Promise(r => setTimeout(r, 100));
      }

      // Step 8: Verify queue is drained and data is consistent
      const drainedQueue = JSON.parse(sandbox.localStorage.getItem("boh-offline-queue") || "[]");
      assert.strictEqual(drainedQueue.length, 0, "Outbox queue must be completely drained on reconnection");

      const finalRoster = store.getRosterForEvent(targetEvent.id);
      const finalEntry = finalRoster.find(r => r.swimmer === swimmerName);
      assert.ok(finalEntry, "Registration must remain safely stored with zero data loss");
    } finally {
      if (ctx.isLive && targetEventId) {
        try {
          await fetch(`${SUPABASE_URL}/rest/v1/event_entries?event_id=eq.${encodeURIComponent(targetEventId)}&swimmer_name=eq.${encodeURIComponent(swimmerName)}`, {
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
