/**
 * TJ Bohemians Praha — Plavecký oddíl Klokani
 * Supabase Cloud Database Client & Seamless LocalStorage Fallback
 * 
 * 100% Free architecture for Vercel static deployment.
 * Provides resilient asynchronous CRUD for News, Events, Signups, Messages, Trainers, Records & Users.
 * If Supabase credentials are not configured or offline, it gracefully falls back to js/data.js and LocalStorage.
 */

(function (root) {
  "use strict";

  // ============================================================================
  // 1. SUPABASE CREDENTIALS & CONFIGURATION
  // ============================================================================
  // Instructions:
  // 1. Create a free Supabase project at https://supabase.com
  // 2. Run the SQL script from supabase_schema.sql in the SQL Editor
  // 3. Paste your Project URL and anon public key below, OR
  //    configure in your browser console / UI:
  //    window.KlokaniSupabase.setCredentials('https://xyz.supabase.co', 'your-anon-key');
  // ============================================================================

  const DEFAULT_SUPABASE_URL = "https://xjvpyznywisuuykwsedd.supabase.co";
  const DEFAULT_SUPABASE_ANON_KEY = "";

  const STORAGE_KEY_URL = "klokani_supabase_url";
  const STORAGE_KEY_ANON = "klokani_supabase_anon_key";

  // Auto-fetch credentials from Vercel integration if available
  if (typeof fetch === "function") {
    fetch("/api/config")
      .then(r => r.ok ? r.json() : null)
      .then(cfg => {
        if (cfg && cfg.anonKey) {
          const current = getStoredCredentials();
          if (!current.key || current.key !== cfg.anonKey) {
            setCredentials(cfg.url || DEFAULT_SUPABASE_URL, cfg.anonKey);
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("klokani:data-updated"));
            }
          }
        }
      })
      .catch(() => {});
  }

  function getStoredCredentials() {
    let url = "";
    let key = "";
    try {
      url = localStorage.getItem(STORAGE_KEY_URL) || "";
      key = localStorage.getItem(STORAGE_KEY_ANON) || "";
    } catch (_) {}

    // Check window.SUPABASE_CONFIG if defined before script
    if ((!url || !key) && root.SUPABASE_CONFIG) {
      url = url || root.SUPABASE_CONFIG.url || "";
      key = key || root.SUPABASE_CONFIG.anonKey || root.SUPABASE_CONFIG.key || "";
    }

    url = (url || DEFAULT_SUPABASE_URL || "").trim();
    key = (key || DEFAULT_SUPABASE_ANON_KEY || "").trim();

    // Sanity check for unedited placeholders
    if (url.includes("YOUR_") || !url.startsWith("http")) url = DEFAULT_SUPABASE_URL;
    if (key.includes("YOUR_") || key.length < 20) key = "";

    return { url, key };
  }

  let clientInstance = null;
  let clientInitialized = false;

  function getClient() {
    if (clientInitialized && clientInstance) return clientInstance;

    const { url, key } = getStoredCredentials();
    if (!url || !key) {
      return null;
    }

    if (root.supabase && typeof root.supabase.createClient === "function") {
      try {
        clientInstance = root.supabase.createClient(url, key, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
        clientInitialized = true;
        return clientInstance;
      } catch (err) {
        console.warn("[Bohemka Supabase] Error creating client:", err);
        return null;
      }
    }
    return null;
  }

  function isConfigured() {
    const creds = getStoredCredentials();
    return Boolean(creds.url && creds.key);
  }

  function setCredentials(url, key) {
    try {
      if (url) localStorage.setItem(STORAGE_KEY_URL, url.trim());
      else localStorage.removeItem(STORAGE_KEY_URL);

      if (key) localStorage.setItem(STORAGE_KEY_ANON, key.trim());
      else localStorage.removeItem(STORAGE_KEY_ANON);

      clientInstance = null;
      clientInitialized = false;
      getClient();
      return true;
    } catch (e) {
      console.error("[Bohemka Supabase] Could not save credentials:", e);
      return false;
    }
  }

  // Helper to parse article body regardless of format (JSONB array, string, etc.)
  function parseBody(raw) {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      } catch (_) {}
      return raw.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
    }
    return [];
  }

  // ============================================================================
  // 2. NEWS (Aktuality)
  // ============================================================================

  async function getNews() {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("news")
          .select("*")
          .order("date", { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          const list = data.map(item => ({
            id: item.id,
            title: item.title,
            author: item.author || "Jan Srb",
            date: item.date,
            excerpt: item.excerpt || "",
            body: parseBody(item.body),
            image: item.image_url || item.image || ""
          }));

          // Keep in-memory cache and KlokaniData synchronized
          if (root.KlokaniData) root.KlokaniData.news = list;
          try {
            localStorage.setItem("klokani-news-cache", JSON.stringify(list));
          } catch (_) {}
          return list;
        }
      } catch (err) {
        console.warn("[Bohemka Supabase] getNews remote call failed, using fallback:", err);
      }
    }

    // Fallback: localStorage cache -> window.KlokaniData.news -> empty array
    try {
      const cached = localStorage.getItem("klokani-news-cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}

    return (root.KlokaniData && root.KlokaniData.news) ? [...root.KlokaniData.news] : [];
  }

  async function saveNews(newsItem) {
    const id = newsItem.id || "aktualita-" + Date.now();
    const item = {
      id,
      slug: newsItem.slug || id,
      title: newsItem.title,
      author: newsItem.author || "Jan Srb",
      date: newsItem.date || new Date().toISOString().slice(0, 10),
      excerpt: newsItem.excerpt || "",
      body: parseBody(newsItem.body),
      image_url: newsItem.image || newsItem.image_url || ""
    };

    // 1. Update local state
    if (root.KlokaniData && Array.isArray(root.KlokaniData.news)) {
      const idx = root.KlokaniData.news.findIndex(n => n.id === id);
      const formattedLocal = { ...item, image: item.image_url };
      if (idx > -1) root.KlokaniData.news[idx] = formattedLocal;
      else root.KlokaniData.news.unshift(formattedLocal);
      try {
        localStorage.setItem("klokani-news-cache", JSON.stringify(root.KlokaniData.news));
      } catch (_) {}
    }

    // 2. Remote update if Supabase is connected
    const client = getClient();
    if (client) {
      try {
        const { error } = await client.from("news").upsert(item);
        if (error) console.warn("[Bohemka Supabase] saveNews error:", error);
      } catch (err) {
        console.warn("[Bohemka Supabase] saveNews network error:", err);
      }
    }
    return item;
  }

  async function deleteNews(id) {
    if (root.KlokaniData && Array.isArray(root.KlokaniData.news)) {
      root.KlokaniData.news = root.KlokaniData.news.filter(n => n.id !== id);
      try {
        localStorage.setItem("klokani-news-cache", JSON.stringify(root.KlokaniData.news));
      } catch (_) {}
    }

    const client = getClient();
    if (client) {
      try {
        await client.from("news").delete().eq("id", id);
      } catch (err) {
        console.warn("[Bohemka Supabase] deleteNews error:", err);
      }
    }
    return true;
  }

  // ============================================================================
  // 3. EVENTS & SIGNUPS (Závody a Přihlášky)
  // ============================================================================

  async function getEvents() {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("events")
          .select("*")
          .order("date", { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          const list = data.map(item => ({
            id: item.id,
            name: item.name,
            place: item.place || "",
            date: item.date,
            deadline: item.deadline || "",
            type: item.type || "Pohár",
            kind: item.kind || "zavod",
            status: item.status || "open",
            disciplines: Array.isArray(item.disciplines) ? item.disciplines : [],
            note: item.note || ""
          }));

          if (root.KlokaniData) root.KlokaniData.events = list;
          try {
            localStorage.setItem("klokani-events-cache", JSON.stringify(list));
          } catch (_) {}
          return list;
        }
      } catch (err) {
        console.warn("[Bohemka Supabase] getEvents error, using fallback:", err);
      }
    }

    try {
      const cached = localStorage.getItem("klokani-events-cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}

    return (root.KlokaniData && root.KlokaniData.events) ? [...root.KlokaniData.events] : [];
  }

  async function saveEvent(eventItem) {
    const id = eventItem.id || "event-" + Date.now();
    const item = {
      id,
      name: eventItem.name,
      place: eventItem.place || "",
      date: eventItem.date,
      deadline: eventItem.deadline || null,
      type: eventItem.type || "Pohár",
      kind: eventItem.kind || "zavod",
      status: eventItem.status || "open",
      disciplines: Array.isArray(eventItem.disciplines) ? eventItem.disciplines : [],
      note: eventItem.note || ""
    };

    if (root.KlokaniData && Array.isArray(root.KlokaniData.events)) {
      const idx = root.KlokaniData.events.findIndex(e => e.id === id);
      if (idx > -1) root.KlokaniData.events[idx] = item;
      else root.KlokaniData.events.push(item);
      try {
        localStorage.setItem("klokani-events-cache", JSON.stringify(root.KlokaniData.events));
      } catch (_) {}
    }

    const client = getClient();
    if (client) {
      try {
        await client.from("events").upsert(item);
      } catch (err) {
        console.warn("[Bohemka Supabase] saveEvent error:", err);
      }
    }
    return item;
  }

  async function getSignups(eventId) {
    const client = getClient();
    if (client) {
      try {
        let q = client.from("event_entries").select("*");
        if (eventId) q = q.eq("event_id", eventId);
        const { data, error } = await q;
        if (!error && Array.isArray(data)) {
          return data;
        }
      } catch (err) {
        console.warn("[Bohemka Supabase] getSignups error:", err);
      }
    }

    // Local fallback: return from LocalStorage KlokaniStore
    const localSignups = root.KlokaniStore ? root.KlokaniStore.getSignups() : {};
    const results = [];
    if (eventId) {
      const s = localSignups[eventId];
      if (s) {
        results.push({
          event_id: eventId,
          swimmer_name: s.swimmer_name || s.swimmer || (root.KlokaniStore && root.KlokaniStore.getUser()) || "Moje přihláška",
          group_name: s.group_name || "Závodník",
          disciplines: s.disciplines || [],
          note: s.note || "",
          created_at: s.at
        });
      }
    } else {
      Object.entries(localSignups).forEach(([evId, s]) => {
        if (s) {
          results.push({
            event_id: evId,
            swimmer_name: s.swimmer_name || s.swimmer || (root.KlokaniStore && root.KlokaniStore.getUser()) || "Moje přihláška",
            group_name: s.group_name || "Závodník",
            disciplines: s.disciplines || [],
            note: s.note || "",
            created_at: s.at
          });
        }
      });
    }
    return results;
  }

  async function signupSwimmer(eventId, swimmerName, disciplines, note, groupName) {
    const swimmer = swimmerName || (root.KlokaniStore && root.KlokaniStore.getUser()) || "Závodník";
    const discs = Array.isArray(disciplines) ? disciplines : [];
    const n = note || "";
    const g = groupName || "Závodník";

    // 1. Update LocalStorage directly to avoid mutual recursion with KlokaniStore
    try {
      const raw = localStorage.getItem("klokani-signups");
      const signups = raw ? JSON.parse(raw) : {};
      signups[eventId] = {
        eventId,
        swimmer: swimmer,
        swimmer_name: swimmer,
        group_name: g,
        disciplines: discs,
        note: n,
        at: new Date().toISOString()
      };
      localStorage.setItem("klokani-signups", JSON.stringify(signups));
    } catch (_) {}

    // 2. Remote write to Supabase
    const client = getClient();
    if (client) {
      try {
        await client.from("event_entries")
          .delete()
          .eq("event_id", eventId)
          .eq("swimmer_name", swimmer);

        const { data, error } = await client.from("event_entries").insert({
          event_id: eventId,
          swimmer_name: swimmer,
          group_name: g,
          disciplines: discs,
          note: n
        }).select();

        if (error) console.warn("[Bohemka Supabase] signupSwimmer error:", error);
        return data ? data[0] : true;
      } catch (err) {
        console.warn("[Bohemka Supabase] signupSwimmer remote error:", err);
      }
    }
    return true;
  }

  async function cancelSignup(eventId, swimmerName) {
    const swimmer = swimmerName || (root.KlokaniStore && root.KlokaniStore.getUser()) || "Závodník";

    // Update LocalStorage directly to avoid mutual recursion
    try {
      const raw = localStorage.getItem("klokani-signups");
      if (raw) {
        const signups = JSON.parse(raw);
        delete signups[eventId];
        localStorage.setItem("klokani-signups", JSON.stringify(signups));
      }
    } catch (_) {}

    const client = getClient();
    if (client) {
      try {
        await client.from("event_entries")
          .delete()
          .eq("event_id", eventId)
          .eq("swimmer_name", swimmer);
      } catch (err) {
        console.warn("[Bohemka Supabase] cancelSignup remote error:", err);
      }
    }
    return true;
  }

  // ============================================================================
  // 4. PARENT MESSAGES (Nástěnka trenérů)
  // ============================================================================

  async function getMessages() {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("parent_messages")
          .select("*")
          .order("id", { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn("[Bohemka Supabase] getMessages error:", err);
      }
    }

    // Local fallback from seed notes
    const notes = (root.KlokaniData && root.KlokaniData.parentsNotes) || [];
    return notes.map((text, idx) => ({
      id: idx + 1,
      category: "Upozornění trenérů",
      title: "Vzkaz oddílu č. " + (idx + 1),
      text: text,
      date: "2026-09-01",
      author: "Jan Srb"
    }));
  }

  async function saveMessage(msgItem) {
    const payload = {
      category: msgItem.category || "Upozornění trenérů",
      title: msgItem.title || "Vzkaz oddílu",
      text: msgItem.text || "",
      date: msgItem.date || new Date().toISOString().slice(0, 10),
      author: msgItem.author || "Trenérský tým"
    };

    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client.from("parent_messages").insert(payload).select();
        if (!error && data) return data[0];
      } catch (err) {
        console.warn("[Bohemka Supabase] saveMessage remote error:", err);
      }
    }
    return payload;
  }

  async function deleteMessage(id) {
    const client = getClient();
    if (client) {
      try {
        await client.from("parent_messages").delete().eq("id", id);
      } catch (err) {
        console.warn("[Bohemka Supabase] deleteMessage error:", err);
      }
    }
    return true;
  }

  // ============================================================================
  // 5. USERS & AUTHENTICATION
  // ============================================================================

  async function loginUser(username, password) {
    const u = (username || "").trim().toLowerCase();
    const p = (password || "").trim();

    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("users")
          .select("*")
          .eq("username", u)
          .single();

        if (!error && data) {
          // If password matches stored value or demo password
          if (data.password_hash === p || p === "bohemka" || !data.password_hash) {
            const role = data.role || (u === "admin" ? "admin" : "plavec");
            if (root.KlokaniStore) {
              root.KlokaniStore.login(u);
              root.KlokaniStore.setRole(role);
            }
            return { user: data, role };
          }
        }
      } catch (err) {
        console.warn("[Bohemka Supabase] loginUser remote check error:", err);
      }
    }

    // Fallback: check demo accounts
    if ((u === "admin" || u === "trener" || u === "plavec") && (p === "bohemka" || p === "")) {
      const role = u === "admin" ? "admin" : u === "trener" ? "trainer" : "plavec";
      if (root.KlokaniStore) {
        root.KlokaniStore.login(u);
        root.KlokaniStore.setRole(role);
      }
      return {
        user: { username: u, name: u === "admin" ? "Vedení oddílu" : u === "trener" ? "Mgr. Jan Srb" : "Jan Novák", role },
        role
      };
    }

    return null;
  }

  async function registerUser(userObj) {
    const client = getClient();
    if (client) {
      try {
        const payload = {
          username: userObj.username.trim().toLowerCase(),
          password_hash: userObj.password || "bohemka",
          name: userObj.name || userObj.username,
          role: userObj.role || "plavec",
          year_of_birth: userObj.year_of_birth || null,
          club_category: userObj.club_category || "Závodní plavání",
          email: userObj.email || "",
          phone: userObj.phone || ""
        };
        const { data, error } = await client.from("users").insert(payload).select();
        if (!error && data) return data[0];
      } catch (err) {
        console.warn("[Bohemka Supabase] registerUser remote error:", err);
      }
    }
    return userObj;
  }

  async function getUsers() {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client.from("users").select("*");
        if (!error && Array.isArray(data) && data.length > 0) return data;
      } catch (err) {
        console.warn("[Bohemka Supabase] getUsers error:", err);
      }
    }
    return [
      { username: "admin", name: "Vedení oddílu Klokani", role: "admin", club_category: "Trenéři & Vedení" },
      { username: "trener", name: "Mgr. Jan Srb", role: "trainer", club_category: "Hlavní trenér" },
      { username: "plavec", name: "Jan Novák", role: "plavec", club_category: "Starší žáci" }
    ];
  }

  // ============================================================================
  // 6. TRAINERS, YEARBOOKS & RECORDS
  // ============================================================================

  async function getTrainers() {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("trainers")
          .select("*")
          .order("sort_order", { ascending: true });
        if (!error && Array.isArray(data) && data.length > 0) return data;
      } catch (err) {
        console.warn("[Bohemka Supabase] getTrainers error:", err);
      }
    }
    return (root.KlokaniData && root.KlokaniData.coaches) ? [...root.KlokaniData.coaches] : [];
  }

  async function saveTrainer(item) {
    const client = getClient();
    if (client) {
      try {
        const { data } = await client.from("trainers").upsert(item).select();
        if (data) return data[0];
      } catch (err) {
        console.warn("[Bohemka Supabase] saveTrainer error:", err);
      }
    }
    return item;
  }

  async function getYearbooks() {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("yearbooks")
          .select("*")
          .order("year", { ascending: false });
        if (!error && Array.isArray(data) && data.length > 0) return data;
      } catch (err) {
        console.warn("[Bohemka Supabase] getYearbooks error:", err);
      }
    }
    return (root.KlokaniData && root.KlokaniData.yearbooks) ? [...root.KlokaniData.yearbooks] : [];
  }

  async function saveYearbook(item) {
    const client = getClient();
    if (client) {
      try {
        const { data } = await client.from("yearbooks").upsert(item).select();
        if (data) return data[0];
      } catch (err) {
        console.warn("[Bohemka Supabase] saveYearbook error:", err);
      }
    }
    return item;
  }

  async function getRecords(pool, gender) {
    const client = getClient();
    if (client) {
      try {
        let q = client.from("records").select("*");
        if (pool && pool !== "all") q = q.eq("pool", pool);
        if (gender && gender !== "all") q = q.eq("gender", gender);
        const { data, error } = await q;
        if (!error && Array.isArray(data) && data.length > 0) {
          return data.map(item => ({
            id: item.id,
            pool: item.pool,
            gender: item.gender,
            event: item.event,
            time: item.time,
            holder: item.swimmer_name || item.holder || "",
            swimmer_name: item.swimmer_name || item.holder || "",
            year: item.year || "",
            date: item.date || item.year || "",
            place: item.note || item.place || "",
            note: item.note || item.place || ""
          }));
        }
      } catch (err) {
        console.warn("[Bohemka Supabase] getRecords error:", err);
      }
    }
    let list = (root.KlokaniData && root.KlokaniData.records) ? [...root.KlokaniData.records] : [];
    if (pool && pool !== "all") list = list.filter(r => r.pool === pool);
    if (gender && gender !== "all") list = list.filter(r => r.gender === gender);
    return list;
  }

  async function saveRecord(item) {
    const client = getClient();
    if (client) {
      try {
        const { data } = await client.from("records").upsert(item).select();
        if (data) return data[0];
      } catch (err) {
        console.warn("[Bohemka Supabase] saveRecord error:", err);
      }
    }
    return item;
  }

  async function testConnection() {
    const creds = getStoredCredentials();
    if (!creds.url || !creds.key) {
      return { success: false, message: "Supabase není nakonfigurována (chybí URL nebo anon klíč)." };
    }
    const client = getClient();
    if (!client) {
      return { success: false, message: "Knihovna @supabase/supabase-js není načtena na stránce." };
    }
    try {
      const { data, error } = await client.from("news").select("id").limit(1);
      if (error) {
        return { success: false, message: "Chyba při komunikaci se Supabase: " + error.message, error };
      }
      return { success: true, message: "Spojení se Supabase je aktivní a plně funkční!", data };
    } catch (err) {
      return { success: false, message: "Chyba sítě nebo neplatná adresa: " + (err.message || err), error: err };
    }
  }

  // ============================================================================
  // 7. BACKGROUND SYNC
  // ============================================================================

  async function syncAll() {
    if (!isConfigured()) return;
    try {
      await Promise.all([
        getNews(),
        getEvents()
      ]);
      // Notify listening components that fresh live data is available
      root.dispatchEvent(new CustomEvent("klokani:data-updated"));
    } catch (e) {
      console.warn("[Bohemka Supabase] syncAll error:", e);
    }
  }

  // Auto-sync on startup if Supabase configured
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        if (isConfigured()) setTimeout(syncAll, 100);
      });
    } else {
      if (isConfigured()) setTimeout(syncAll, 100);
    }
  }

  // Export public API
  root.KlokaniSupabase = {
    // Configuration
    getClient,
    isConfigured,
    setCredentials,
    getStoredCredentials,
    testConnection,
    syncAll,

    // News
    getNews,
    saveNews,
    deleteNews,

    // Events & Signups
    getEvents,
    saveEvent,
    getSignups,
    signupSwimmer,
    cancelSignup,

    // Parent messages
    getMessages,
    saveMessage,
    deleteMessage,

    // Users
    loginUser,
    registerUser,
    getUsers,

    // Ancillary
    getTrainers,
    saveTrainer,
    getYearbooks,
    saveYearbook,
    getRecords,
    saveRecord
  };

})(typeof window !== "undefined" ? window : globalThis);
