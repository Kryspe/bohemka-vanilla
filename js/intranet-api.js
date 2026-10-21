/**
 * TJ Bohemians Praha — Intranet API & Service Layer
 * Decoupled REST-like architecture with asynchronous async/await methods.
 * Persists to localStorage with fallback seeds, ready to swap to fetch('/api/...') endpoints.
 */

(function (root) {
  "use strict";

  const STORAGE_KEYS = {
    ROLE: "boh_intranet_role",
    EDIT_MODE: "boh_intranet_edit_mode",
    ANNOUNCEMENTS: "boh_intranet_announcements",
    SCHEDULE: "boh_intranet_schedule",
    DOCUMENTS: "boh_intranet_documents",
    BLOCKS: "boh_intranet_content_blocks",
    MY_ENTRIES: "boh_intranet_my_entries"
  };

  // Realistic initial seeds
  const SEED_ANNOUNCEMENTS = [
    {
      id: "ann-1",
      title: "Zahájení podzimní sezóny 2026/2027 na Podolí a Vinohradech",
      category: "Organizační",
      priority: "high", // 'high' | 'normal' | 'low'
      date: "2026-10-18",
      author: "Mgr. Jan Srb (hlavní trenér)",
      content: "Tréninky všech výkonnostních skupin (ST, GY, ODA, ODB) běží podle platného rozpisu drah. Přípravka trénuje v úterý a čtvrtek na Vinohradech. Nezapomeňte odevzdat lékařské posudky o zdravotní způsobilosti do konce října trenérům svých skupin."
    },
    {
      id: "ann-2",
      title: "Přihlášky na Podzimní cenu Motorletu a nominace na MČR",
      category: "Závody",
      priority: "normal",
      date: "2026-10-15",
      author: "Martin Břenda (trenér)",
      content: "Uzávěrka přihlášek pro plavce skupin ST a GY na Podzimní cenu Motorletu je tento pátek ve 20:00. Zkontrolujte své disciplíny a přihlašovací časy v sekci Harmonogram & Závody. Případné omluvy hlaste neprodleně."
    },
    {
      id: "ann-3",
      title: "Lékařské prohlídky sportovců — platnost 1 rok",
      category: "Zdravotní",
      priority: "high",
      date: "2026-10-10",
      author: "Vedení oddílu Klokani",
      content: "Formulář žádosti o posouzení zdravotní způsobilosti stahujte v sekci Dokumenty. Bez platné prohlídky tělovýchovného lékaře ČSPS nepovolí start na oficiálních závodech a přeborech ČR."
    },
    {
      id: "ann-4",
      title: "Nové oddílové vybavení Arena & Klokani 80 let",
      category: "Vybavení",
      priority: "low",
      date: "2026-10-05",
      author: "Kancelář TJ Bohemians",
      content: "Nové oddílové plavky, silikonové čepičky se znakem Klokana a výroční mikiny 80 let Bohemians lze objednávat u trenérů nebo v kanceláři oddílu. První vlna objednávek se uzavírá 1. listopadu."
    }
  ];

  const SEED_SCHEDULE = [
    {
      id: "sch-1",
      name: "Podzimní cena Motorletu",
      date: "2026-10-24",
      pool: "Radlice, 25m",
      category: "Žáci & Dorost",
      deadline: "2026-10-20",
      status: "open", // 'open' | 'closed' | 'completed'
      file: "assets/downloads/Harmonogram_treninku_podzim_2026.pdf"
    },
    {
      id: "sch-2",
      name: "Velká cena města Plzně",
      date: "2026-11-07 – 2026-11-08",
      pool: "Plzeň Slovany, 50m",
      category: "Open & Masters",
      deadline: "2026-10-30",
      status: "open",
      file: "assets/downloads/Harmonogram_treninku_podzim_2026.pdf"
    },
    {
      id: "sch-3",
      name: "Zimní mistrovství ČR dorostu a dospělých",
      date: "2026-12-11 – 2026-12-14",
      pool: "Ústí nad Labem, 25m",
      category: "Reprezentace",
      deadline: "2026-11-28",
      status: "upcoming",
      file: "assets/downloads/Harmonogram_treninku_podzim_2026.pdf"
    },
    {
      id: "sch-4",
      name: "Vánoční cena Klokanů & oddílové přebory",
      date: "2026-12-19",
      pool: "Sokol Vinohrady, 25m",
      category: "Celý oddíl",
      deadline: "2026-12-14",
      status: "upcoming",
      file: "assets/downloads/Harmonogram_treninku_podzim_2026.pdf"
    }
  ];

  const SEED_DOCUMENTS = [
    {
      id: "doc-1",
      title: "Harmonogram tréninků a rozdělení drah 2026/27",
      category: "Tréninky",
      format: "PDF",
      size: "340 KB",
      updated: "14. 10. 2026",
      url: "assets/downloads/Harmonogram_treninku_podzim_2026.pdf"
    },
    {
      id: "doc-2",
      title: "Formulář zdravotní způsobilosti sportovce (ČSPS)",
      category: "Zdraví",
      format: "PDF",
      size: "185 KB",
      updated: "01. 09. 2026",
      url: "assets/downloads/Formular_zdravotni_zpusobilost_sportovce.pdf"
    },
    {
      id: "doc-3",
      title: "Členské příspěvky a pokyny k platbám podzim 2026",
      category: "Platby",
      format: "PDF",
      size: "210 KB",
      updated: "15. 09. 2026",
      url: "assets/downloads/Clenske_prispevky_a_pokyny_k_platbam_2026.pdf"
    },
    {
      id: "doc-4",
      title: "Směrnice proplácení nákladů na závody a MČR",
      category: "Směrnice",
      format: "PDF",
      size: "160 KB",
      updated: "20. 08. 2026",
      url: "assets/downloads/Smernice_proplaceni_zavody_MCR.pdf"
    },
    {
      id: "doc-5",
      title: "Bezpečnostní a provozní řád bazénu Podolí a Vinohrady",
      category: "Řády",
      format: "PDF",
      size: "290 KB",
      updated: "01. 09. 2026",
      url: "assets/downloads/Provozni_a_bezpecnostni_rad_BOH.pdf"
    }
  ];

  const SEED_BLOCKS = {
    portal_title: "Intranet TJ Bohemians Praha",
    portal_subtitle: "Interní portál oddílu plavání — oznámení, harmonogram závodů, dokumenty a správa přihlášek.",
    portal_alert_banner: "Upozornění: V pátek 28. 10. (státní svátek) odpadají ranní tréninky na Podolí. Odpolední trénink proběhne 16:00–18:00 na Vinohradech.",
    portal_contact_note: "Dotazy k přihláškám na závody směřujte na vedoucího trenéra: jan.srb@czechswimming.cz."
  };

  const SEED_MY_ENTRIES = [
    {
      id: "ent-1",
      eventId: "sch-1",
      eventName: "Podzimní cena Motorletu",
      disciplines: ["50 VZ (26.40)", "100 VZ (57.80)", "100 M (1:04.20)"],
      status: "Přihlášen",
      submittedAt: "2026-10-16 14:22"
    },
    {
      id: "ent-2",
      eventId: "sch-2",
      eventName: "Velká cena města Plzně",
      disciplines: ["1500 VZ (17:45.00)", "200 VZ (2:06.10)"],
      status: "Čeká na schválení",
      submittedAt: "2026-10-18 10:05"
    }
  ];

  // Helper storage functions
  function getStorageItem(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      if (val === null) return fallback;
      return JSON.parse(val);
    } catch (_) {
      return fallback;
    }
  }

  function setStorageItem(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn("[IntranetApi] Failed to write localStorage:", e);
    }
  }

  function dispatchUpdate(topic, detail = {}) {
    try {
      window.dispatchEvent(new CustomEvent("boh:intranet-updated", { detail: { topic, ...detail } }));
    } catch (_) {}
  }

  // Instant microtask resolution for snappy UI & headless rendering
  const delay = (ms = 0) => Promise.resolve();

  // ============================================================================
  // INTRANET API SERVICE (Clean REST Abstraction)
  // ============================================================================
  const IntranetApi = {
    // --------------------------------------------------------------------------
    // RBAC & SESSION
    // --------------------------------------------------------------------------
    async getAuth() {
      await delay(10);
      const role = localStorage.getItem(STORAGE_KEYS.ROLE) || "member"; // 'member' | 'super_admin'
      const editMode = localStorage.getItem(STORAGE_KEYS.EDIT_MODE) === "true";
      return {
        role: role === "super_admin" ? "super_admin" : "member",
        editMode: role === "super_admin" ? editMode : false,
        userName: role === "super_admin" ? "Hlavní správce (Super Admin)" : "Kryštof Spejchal (Plavec)",
        userEmail: role === "super_admin" ? "admin@boh.cz" : "krystof.spejchal@boh.cz"
      };
    },

    async setRole(role) {
      await delay(15);
      const validRole = role === "super_admin" ? "super_admin" : "member";
      localStorage.setItem(STORAGE_KEYS.ROLE, validRole);
      if (validRole !== "super_admin") {
        localStorage.setItem(STORAGE_KEYS.EDIT_MODE, "false");
      }
      dispatchUpdate("auth", { role: validRole });
      return this.getAuth();
    },

    async setEditMode(enabled) {
      await delay(15);
      const auth = await this.getAuth();
      if (auth.role !== "super_admin") {
        localStorage.setItem(STORAGE_KEYS.EDIT_MODE, "false");
        return { success: false, error: "Only super_admin can enable Edit Mode" };
      }
      localStorage.setItem(STORAGE_KEYS.EDIT_MODE, enabled ? "true" : "false");
      dispatchUpdate("editMode", { editMode: !!enabled });
      return { success: true, editMode: !!enabled };
    },

    // --------------------------------------------------------------------------
    // ANNOUNCEMENTS CRUD (Native PHP REST + Supabase + Fallback)
    // --------------------------------------------------------------------------
    async getAnnouncements() {
      try {
        const res = await fetch("/api/messages.php");
        if (res.ok) {
          const rows = await res.json();
          if (Array.isArray(rows) && rows.length > 0) {
            const mapped = rows.map(r => ({
              id: "ann-" + r.id,
              rawId: r.id,
              title: r.title || "Vzkaz oddílu",
              category: r.category || "Organizační",
              priority: (r.category && r.category.toLowerCase().includes("důležité")) ? "high" : "normal",
              date: r.date || (r.created_at ? r.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10)),
              author: r.author || "Vedení oddílu",
              content: r.text || ""
            }));
            setStorageItem(STORAGE_KEYS.ANNOUNCEMENTS, mapped);
            return mapped;
          }
        }
      } catch (_) {}
      return getStorageItem(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
    },

    async createAnnouncement(payload) {
      const items = await this.getAnnouncements();
      const newItem = {
        id: "ann-" + Date.now(),
        title: (payload.title || "Nové oznámení").trim(),
        category: (payload.category || "Organizační").trim(),
        priority: payload.priority || "normal",
        date: payload.date || new Date().toISOString().slice(0, 10),
        author: (payload.author || "Vedení oddílu").trim(),
        content: (payload.content || "").trim()
      };
      items.unshift(newItem);
      setStorageItem(STORAGE_KEYS.ANNOUNCEMENTS, items);
      dispatchUpdate("announcements", { action: "create", item: newItem });

      try {
        const res = await fetch("/api/messages.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newItem.title,
            category: newItem.category,
            text: newItem.content,
            author: newItem.author,
            date: newItem.date
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.id) newItem.rawId = data.id;
        }
      } catch (_) {}

      try {
        window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { topic: "messages", action: "create" } }));
      } catch (_) {}

      return newItem;
    },

    async updateAnnouncement(id, patch) {
      const items = await this.getAnnouncements();
      const index = items.findIndex(item => String(item.id) === String(id));
      if (index === -1) throw new Error(`Announcement with id "${id}" not found`);

      items[index] = { ...items[index], ...patch, id: items[index].id };
      setStorageItem(STORAGE_KEYS.ANNOUNCEMENTS, items);
      dispatchUpdate("announcements", { action: "update", item: items[index] });

      try {
        const rawId = items[index].rawId || String(id).replace(/^ann-/, "");
        await fetch("/api/messages.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: rawId,
            title: items[index].title,
            category: items[index].category,
            text: items[index].content,
            author: items[index].author,
            date: items[index].date
          })
        });
      } catch (_) {}

      try {
        window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { topic: "messages", action: "update" } }));
      } catch (_) {}

      return items[index];
    },

    async deleteAnnouncement(id) {
      let items = await this.getAnnouncements();
      const found = items.find(item => String(item.id) === String(id));
      items = items.filter(item => String(item.id) !== String(id));
      setStorageItem(STORAGE_KEYS.ANNOUNCEMENTS, items);
      dispatchUpdate("announcements", { action: "delete", id });

      const rawId = (found && found.rawId) ? found.rawId : String(id).replace(/^ann-/, "");
      try {
        await fetch(`/api/messages.php?id=${encodeURIComponent(rawId)}`, { method: "DELETE" });
      } catch (_) {}

      try {
        window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { topic: "messages", action: "delete" } }));
      } catch (_) {}

      return { success: true, id };
    },

    // --------------------------------------------------------------------------
    // SCHEDULE / EVENTS CRUD (Native PHP REST + Supabase + Fallback)
    // --------------------------------------------------------------------------
    async getSchedule() {
      try {
        const res = await fetch("/api/events.php");
        if (res.ok) {
          const rows = await res.json();
          if (Array.isArray(rows) && rows.length > 0) {
            const mapped = rows.map(r => ({
              id: r.id || ("sch-" + Date.now()),
              name: r.name || "Závod",
              date: r.date || "Termín v jednání",
              pool: r.place || "Podolí 50m",
              category: r.type || "Všechny kategorie",
              deadline: r.deadline || "Před závodem",
              status: r.status || "open",
              file: r.file || "assets/downloads/Harmonogram_treninku_podzim_2026.pdf"
            }));
            setStorageItem(STORAGE_KEYS.SCHEDULE, mapped);
            return mapped;
          }
        }
      } catch (_) {}
      return getStorageItem(STORAGE_KEYS.SCHEDULE, SEED_SCHEDULE);
    },

    async createScheduleItem(payload) {
      const items = await this.getSchedule();
      const newItem = {
        id: payload.id || ("sch-" + Date.now()),
        name: (payload.name || "Nové závody").trim(),
        date: (payload.date || "Termín v jednání").trim(),
        pool: (payload.pool || payload.place || "Podolí 50m").trim(),
        category: (payload.category || payload.type || "Všechny kategorie").trim(),
        deadline: (payload.deadline || "Před závodem").trim(),
        status: payload.status || "open",
        file: payload.file || "assets/downloads/Harmonogram_treninku_podzim_2026.pdf"
      };
      items.push(newItem);
      setStorageItem(STORAGE_KEYS.SCHEDULE, items);
      dispatchUpdate("schedule", { action: "create", item: newItem });

      try {
        await fetch("/api/events.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: newItem.id,
            name: newItem.name,
            date: newItem.date,
            place: newItem.pool,
            deadline: newItem.deadline,
            status: newItem.status,
            file: newItem.file
          })
        });
      } catch (_) {}

      try {
        window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { topic: "events", action: "create" } }));
      } catch (_) {}

      return newItem;
    },

    async updateScheduleItem(id, patch) {
      const items = await this.getSchedule();
      const index = items.findIndex(item => String(item.id) === String(id));
      if (index === -1) throw new Error(`Schedule item "${id}" not found`);

      items[index] = { ...items[index], ...patch, id: items[index].id };
      setStorageItem(STORAGE_KEYS.SCHEDULE, items);
      dispatchUpdate("schedule", { action: "update", item: items[index] });

      try {
        await fetch("/api/events.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(items[index])
        });
      } catch (_) {}

      try {
        window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { topic: "events", action: "update" } }));
      } catch (_) {}

      return items[index];
    },

    async deleteScheduleItem(id) {
      let items = await this.getSchedule();
      items = items.filter(item => String(item.id) !== String(id));
      setStorageItem(STORAGE_KEYS.SCHEDULE, items);
      dispatchUpdate("schedule", { action: "delete", id });

      try {
        await fetch(`/api/events.php?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      } catch (_) {}

      try {
        window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { topic: "events", action: "delete" } }));
      } catch (_) {}

      return { success: true, id };
    },

    // --------------------------------------------------------------------------
    // DOCUMENTS CRUD
    // --------------------------------------------------------------------------
    async getDocuments() {
      await delay();
      return getStorageItem(STORAGE_KEYS.DOCUMENTS, SEED_DOCUMENTS);
    },

    async createDocument(payload) {
      await delay();
      const items = await this.getDocuments();
      const newItem = {
        id: "doc-" + Date.now(),
        title: (payload.title || "Nový dokument").trim(),
        category: (payload.category || "Obecné").trim(),
        format: payload.format || "PDF",
        size: payload.size || "150 KB",
        updated: new Date().toLocaleDateString("cs-CZ"),
        url: payload.url || "assets/downloads/Harmonogram_treninku_podzim_2026.pdf"
      };
      items.push(newItem);
      setStorageItem(STORAGE_KEYS.DOCUMENTS, items);
      dispatchUpdate("documents", { action: "create", item: newItem });
      return newItem;
    },

    async updateDocument(id, patch) {
      await delay();
      const items = await this.getDocuments();
      const index = items.findIndex(item => String(item.id) === String(id));
      if (index === -1) throw new Error(`Document "${id}" not found`);

      items[index] = { ...items[index], ...patch, id: items[index].id };
      setStorageItem(STORAGE_KEYS.DOCUMENTS, items);
      dispatchUpdate("documents", { action: "update", item: items[index] });
      return items[index];
    },

    async deleteDocument(id) {
      await delay();
      let items = await this.getDocuments();
      items = items.filter(item => String(item.id) !== String(id));
      setStorageItem(STORAGE_KEYS.DOCUMENTS, items);
      dispatchUpdate("documents", { action: "delete", id });
      return { success: true, id };
    },

    // --------------------------------------------------------------------------
    // CONTENT BLOCKS (Inline CMS Key-Value)
    // --------------------------------------------------------------------------
    async getContentBlocks() {
      await delay();
      return getStorageItem(STORAGE_KEYS.BLOCKS, SEED_BLOCKS);
    },

    async updateContentBlock(key, value) {
      await delay();
      const blocks = await this.getContentBlocks();
      blocks[key] = String(value || "");
      setStorageItem(STORAGE_KEYS.BLOCKS, blocks);
      dispatchUpdate("blocks", { key, value });
      return blocks;
    },

    // --------------------------------------------------------------------------
    // MY ENTRIES (Native PHP REST + Supabase + Fallback)
    // --------------------------------------------------------------------------
    async getMyEntries() {
      try {
        const res = await fetch("/api/entries.php");
        if (res.ok) {
          const rows = await res.json();
          if (Array.isArray(rows) && rows.length > 0) {
            const mapped = rows.map(r => ({
              id: "ent-" + r.id,
              rawId: r.id,
              eventId: r.eventId || r.event_id,
              eventName: r.eventName || r.swimmerName || "Přihláška na závod",
              swimmerName: r.swimmerName || r.swimmer_name || "Kryštof Spejchal",
              disciplines: Array.isArray(r.disciplines) ? r.disciplines : [r.disciplines].filter(Boolean),
              status: r.status || "Přihlášen",
              submittedAt: r.createdAt ? r.createdAt.slice(0, 16) : new Date().toLocaleString("cs-CZ")
            }));
            setStorageItem(STORAGE_KEYS.MY_ENTRIES, mapped);
            return mapped;
          }
        }
      } catch (_) {}
      return getStorageItem(STORAGE_KEYS.MY_ENTRIES, SEED_MY_ENTRIES);
    },

    async submitEntry(eventId, eventName, disciplinesList, swimmerName) {
      const entries = await this.getMyEntries();
      const disc = Array.isArray(disciplinesList) ? disciplinesList : [disciplinesList].filter(Boolean);
      const newEntry = {
        id: "ent-" + Date.now(),
        eventId,
        eventName: eventName || ("Závod " + eventId),
        swimmerName: swimmerName || "Kryštof Spejchal",
        disciplines: disc,
        status: "Přihlášen",
        submittedAt: new Date().toLocaleString("cs-CZ", { dateStyle: "short", timeStyle: "short" })
      };
      entries.unshift(newEntry);
      setStorageItem(STORAGE_KEYS.MY_ENTRIES, entries);
      dispatchUpdate("entries", { action: "submit", entry: newEntry });

      try {
        const res = await fetch("/api/entries.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_id: eventId,
            event_name: eventName,
            swimmer_name: newEntry.swimmerName,
            disciplines: disc
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.id) newEntry.rawId = data.id;
        }
      } catch (_) {}

      try {
        window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { topic: "signups", eventId, action: "create" } }));
      } catch (_) {}

      return newEntry;
    },

    async cancelEntry(entryId) {
      let entries = await this.getMyEntries();
      const found = entries.find(e => String(e.id) === String(entryId));
      entries = entries.filter(e => String(e.id) !== String(entryId));
      setStorageItem(STORAGE_KEYS.MY_ENTRIES, entries);
      dispatchUpdate("entries", { action: "cancel", entryId });

      const rawId = (found && found.rawId) ? found.rawId : String(entryId).replace(/^ent-/, "");
      try {
        await fetch(`/api/entries.php?id=${encodeURIComponent(rawId)}${found && found.eventId ? `&event_id=${encodeURIComponent(found.eventId)}` : ""}`, {
          method: "DELETE"
        });
      } catch (_) {}

      try {
        window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { topic: "signups", action: "cancel" } }));
      } catch (_) {}

      return { success: true, entryId };
    },

    // --------------------------------------------------------------------------
    // NEWS CRUD (For Coach/Admin Publishing from Intranet)
    // --------------------------------------------------------------------------
    async createNewsItem(payload) {
      const id = payload.id || ("news-" + Date.now());
      try {
        await fetch("/api/news.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            title: payload.title,
            author: payload.author || "Trenéři Bohemians",
            date: payload.date || new Date().toISOString().slice(0, 10),
            excerpt: payload.excerpt || "",
            body: payload.body || payload.content || "",
            image_url: payload.image_url || payload.image || ""
          })
        });
      } catch (_) {}

      try {
        window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { topic: "news", action: "create" } }));
      } catch (_) {}
      return { success: true, id };
    },

    async deleteNewsItem(id) {
      try {
        await fetch(`/api/news.php?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      } catch (_) {}

      try {
        window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { topic: "news", action: "delete" } }));
      } catch (_) {}
      return { success: true, id };
    },

    // --------------------------------------------------------------------------
    // ČSPS EXPORT UTILITY (1-Click ČSPS CSV Roster Export)
    // --------------------------------------------------------------------------
    async exportCspsCsv(eventId) {
      if (typeof window !== "undefined" && window.BohStore && typeof window.BohStore.exportSignupsCsv === "function") {
        const csvContent = window.BohStore.exportSignupsCsv(eventId);
        if (csvContent) {
          const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.setAttribute("href", url);
          link.setAttribute("download", `csps_prihlasky_${eventId || "vsechny"}_${new Date().toISOString().slice(0, 10)}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return true;
        }
      }

      const entries = await this.getMyEntries();
      const targetEntries = eventId ? entries.filter(e => e.eventId === eventId) : entries;
      let csv = "Oddil;Prijmeni_Jmeno;Rocnik;Zavod;Discipliny;Poznamka\r\n";
      targetEntries.forEach(e => {
        csv += `BOH;${e.swimmerName || "Kryštof Spejchal"};2008;${e.eventName || e.eventId};"${(e.disciplines || []).join(", ")}";"${e.status || ""}"\r\n`;
      });
      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `csps_prihlasky_${eventId || "vsechny"}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    },

    // --------------------------------------------------------------------------
    // RESET UTILITY (For Testing / Dev)
    // --------------------------------------------------------------------------
    async resetToSeeds() {
      await delay(20);
      setStorageItem(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
      setStorageItem(STORAGE_KEYS.SCHEDULE, SEED_SCHEDULE);
      setStorageItem(STORAGE_KEYS.DOCUMENTS, SEED_DOCUMENTS);
      setStorageItem(STORAGE_KEYS.BLOCKS, SEED_BLOCKS);
      setStorageItem(STORAGE_KEYS.MY_ENTRIES, SEED_MY_ENTRIES);
      dispatchUpdate("reset");
      return true;
    }
  };

  root.IntranetApi = IntranetApi;
})(typeof window !== "undefined" ? window : globalThis);
