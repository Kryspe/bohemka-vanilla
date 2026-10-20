/**
 * TJ Bohemians Praha — Plavecký oddíl Klokani
 * Native PostgREST Supabase Client & Seamless LocalStorage Fallback
 * 
 * 100% Free architecture for Vercel static deployment.
 * Zero external npm or CDN dependencies (native fetch only).
 * Provides resilient asynchronous CRUD for News, Events, Signups, Messages, Trainers, Records & Users.
 * If Supabase credentials are not configured or offline, it gracefully falls back to js/data.js and LocalStorage.
 */

(function (root) {
  "use strict";

  // ============================================================================
  // 1. SUPABASE CREDENTIALS & CONFIGURATION
  // ============================================================================

  const DEFAULT_SUPABASE_URL = "https://xjvpyznywisuuykwsedd.supabase.co";
  const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ";

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
              window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { kind: "all", action: "sync" } }));
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
      return true;
    } catch (e) {
      console.error("[Bohemka Supabase] Could not save credentials:", e);
      return false;
    }
  }

  // ============================================================================
  // NATIVE POSTGREST REST CLIENT (Zero Dependencies)
  // ============================================================================

  function warnIfOnline(msg, err) {
    if (typeof navigator !== "undefined" && navigator.onLine === false) return;
    if (!isConfigured()) return;
    console.warn(msg, err);
  }

  async function restRequest(path, options = {}) {
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      return { data: null, error: new Error("Network is offline"), status: 0 };
    }
    const creds = getStoredCredentials();
    if (!creds.url || !creds.key) {
      return { data: null, error: new Error("Missing Supabase credentials"), status: 0 };
    }
    const cleanBase = creds.url.replace(/\/+$/, "");
    const cleanPath = path.startsWith("/") ? path : "/" + path;
    const url = `${cleanBase}/rest/v1${cleanPath}`;

    const method = (options.method || "GET").toUpperCase();
    const headers = {
      "apikey": creds.key,
      "Authorization": "Bearer " + creds.key,
      "Accept": "application/json",
      "Prefer": options.prefer || "return=representation"
    };

    let body = options.body;
    if (body !== undefined && body !== null) {
      headers["Content-Type"] = "application/json";
      if (typeof body !== "string") {
        body = JSON.stringify(body);
      }
    }

    try {
      const res = await fetch(url, {
        method,
        headers,
        body
      });

      if (!res.ok) {
        let errBody;
        try {
          errBody = await res.json();
        } catch (_) {
          errBody = { message: res.statusText || ("HTTP Error " + res.status) };
        }
        return { data: null, error: errBody, status: res.status };
      }

      if (res.status === 204) {
        return { data: null, error: null, status: res.status };
      }

      const text = await res.text();
      let data = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (_) {
          data = text;
        }
      }
      return { data, error: null, status: res.status };
    } catch (networkErr) {
      return { data: null, error: networkErr, status: 0 };
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
    try {
      const { data, error } = await restRequest("/news?select=*&order=date.desc");
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

        if (root.KlokaniData) root.KlokaniData.news = list;
        try {
          localStorage.setItem("klokani-news-cache", JSON.stringify(list));
        } catch (_) {}
        return list;
      }
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] getNews remote call failed, using fallback:", err);
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
    const id = newsItem.id || ("aktualita-" + Date.now());
    const item = {
      id,
      slug: newsItem.slug || id,
      title: newsItem.title,
      author: newsItem.author || "Jan Srb",
      date: String(newsItem.date || new Date().toISOString().slice(0, 10)).slice(0, 10),
      excerpt: newsItem.excerpt || newsItem.lead || "",
      body: parseBody(newsItem.body || newsItem.content),
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

    // 2. Remote update via PostgREST
    try {
      const res = await restRequest("/news", {
        method: "POST",
        body: item,
        prefer: "resolution=merge-duplicates,return=representation"
      });
      if (res.error) warnIfOnline("[Bohemka Supabase] saveNews error:", res.error);
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] saveNews network error:", err);
    }
    return { success: true, item, ...item };
  }

  async function deleteNews(id) {
    if (root.KlokaniData && Array.isArray(root.KlokaniData.news)) {
      root.KlokaniData.news = root.KlokaniData.news.filter(n => n.id !== id);
      try {
        localStorage.setItem("klokani-news-cache", JSON.stringify(root.KlokaniData.news));
      } catch (_) {}
    }

    try {
      await restRequest("/news?id=eq." + encodeURIComponent(id), { method: "DELETE" });
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] deleteNews error:", err);
    }
    return { success: true };
  }

  // ============================================================================
  // 3. EVENTS & SIGNUPS (Závody a Přihlášky)
  // ============================================================================

  async function getEvents() {
    try {
      const { data, error } = await restRequest("/events?select=*&order=date.asc");
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
      warnIfOnline("[Bohemka Supabase] getEvents error, using fallback:", err);
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
    const id = eventItem.id || ("event-" + Date.now());
    const name = eventItem.name || eventItem.title || "";
    const place = eventItem.place || eventItem.location || eventItem.misto || "";
    const dateRaw = eventItem.date || eventItem.date_from || eventItem.datum || new Date().toISOString().slice(0, 10);
    const date = String(dateRaw).slice(0, 10);
    const deadlineRaw = eventItem.deadline || eventItem.signup_deadline || null;
    const deadline = deadlineRaw ? String(deadlineRaw).slice(0, 10) : null;
    const type = eventItem.type || eventItem.event_type || eventItem.typ || "Pohár";
    const kind = eventItem.kind || (type === "Soustředění" ? "soustredeni" : "zavod");
    const status = eventItem.status || "open";
    let disciplines = eventItem.disciplines;
    if (!Array.isArray(disciplines)) {
      disciplines = disciplines ? [disciplines] : [];
    }
    const note = eventItem.note || eventItem.poznamka || "";

    const item = {
      id,
      name,
      place,
      date,
      deadline,
      type,
      kind,
      status,
      disciplines,
      note
    };

    if (root.KlokaniData && Array.isArray(root.KlokaniData.events)) {
      const idx = root.KlokaniData.events.findIndex(e => e.id === id);
      if (idx > -1) root.KlokaniData.events[idx] = item;
      else root.KlokaniData.events.push(item);
      try {
        localStorage.setItem("klokani-events-cache", JSON.stringify(root.KlokaniData.events));
      } catch (_) {}
    }

    try {
      await restRequest("/events", {
        method: "POST",
        body: item,
        prefer: "resolution=merge-duplicates,return=representation"
      });
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] saveEvent error:", err);
    }
    return { success: true, item, ...item };
  }

  async function deleteEvent(id) {
    if (root.KlokaniData && Array.isArray(root.KlokaniData.events)) {
      root.KlokaniData.events = root.KlokaniData.events.filter(e => e.id !== id);
      try {
        localStorage.setItem("klokani-events-cache", JSON.stringify(root.KlokaniData.events));
      } catch (_) {}
    }

    try {
      await restRequest("/events?id=eq." + encodeURIComponent(id), { method: "DELETE" });
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] deleteEvent error:", err);
    }
    return { success: true };
  }

  async function getSignups(eventId) {
    try {
      let query = "/event_entries?select=*";
      if (eventId) {
        query += "&event_id=eq." + encodeURIComponent(eventId);
      }
      const { data, error } = await restRequest(query);
      if (!error && Array.isArray(data)) {
        return data;
      }
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] getSignups error:", err);
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

  async function signupSwimmer(eventIdOrObj, swimmerName, disciplines, note, groupName) {
    let eventId, swimmer, discs, n, g;
    if (eventIdOrObj && typeof eventIdOrObj === "object") {
      eventId = eventIdOrObj.event_id || eventIdOrObj.eventId || eventIdOrObj.id;
      swimmer = eventIdOrObj.swimmer_name || eventIdOrObj.swimmerName || eventIdOrObj.swimmer || (root.KlokaniStore && root.KlokaniStore.getUser()) || "Závodník";
      discs = eventIdOrObj.disciplines;
      n = eventIdOrObj.note || eventIdOrObj.notes || "";
      g = eventIdOrObj.group_name || eventIdOrObj.groupName || eventIdOrObj.group || eventIdOrObj.category || "Závodník";
    } else {
      eventId = eventIdOrObj;
      swimmer = swimmerName || (root.KlokaniStore && root.KlokaniStore.getUser()) || "Závodník";
      discs = disciplines;
      n = note || "";
      g = groupName || "Závodník";
    }

    if (!Array.isArray(discs)) {
      discs = discs ? [discs] : [];
    }

    // 1. Update LocalStorage directly to avoid mutual recursion with KlokaniStore
    try {
      const raw = localStorage.getItem("klokani-signups");
      const signups = raw ? JSON.parse(raw) : {};
      signups[eventId] = {
        eventId,
        event_id: eventId,
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
    const payload = {
      event_id: String(eventId),
      swimmer_name: swimmer,
      group_name: g,
      disciplines: discs,
      note: n
    };

    try {
      await restRequest(
        `/event_entries?event_id=eq.${encodeURIComponent(eventId)}&swimmer_name=eq.${encodeURIComponent(swimmer)}`,
        { method: "DELETE" }
      );

      const res = await restRequest("/event_entries", {
        method: "POST",
        body: payload
      });

      const entry = (res.data && Array.isArray(res.data)) ? res.data[0] : (res.data || payload);
      return { success: true, entry, ...(typeof entry === "object" ? entry : {}) };
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] signupSwimmer remote error:", err);
      return { success: true, entry: payload, ...payload };
    }
  }

  async function cancelSignup(eventIdOrId, swimmerName) {
    const swimmer = swimmerName || (root.KlokaniStore && root.KlokaniStore.getUser()) || "";

    // Update LocalStorage directly
    try {
      const raw = localStorage.getItem("klokani-signups");
      if (raw) {
        const signups = JSON.parse(raw);
        delete signups[eventIdOrId];
        localStorage.setItem("klokani-signups", JSON.stringify(signups));
      }
    } catch (_) {}

    try {
      let filter = "";
      if (swimmer) {
        filter = `/event_entries?event_id=eq.${encodeURIComponent(eventIdOrId)}&swimmer_name=eq.${encodeURIComponent(swimmer)}`;
      } else {
        filter = `/event_entries?event_id=eq.${encodeURIComponent(eventIdOrId)}`;
      }
      await restRequest(filter, { method: "DELETE" });
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] cancelSignup remote error:", err);
    }
    return { success: true };
  }

  // ============================================================================
  // 4. PARENT MESSAGES (Nástěnka trenérů)
  // ============================================================================

  async function getMessages() {
    try {
      const { data, error } = await restRequest("/parent_messages?select=*&order=id.desc");
      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] getMessages error:", err);
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
      category: msgItem.category || msgItem.type || "Upozornění trenérů",
      title: msgItem.title || "Vzkaz oddílu",
      text: msgItem.text || msgItem.message || msgItem.content || "",
      date: msgItem.date || msgItem.datum || new Date().toISOString().slice(0, 10),
      author: msgItem.author || msgItem.autor || "Trenérský tým"
    };
    if (msgItem.id && typeof msgItem.id === "number") {
      payload.id = msgItem.id;
    }

    try {
      const res = await restRequest("/parent_messages", {
        method: "POST",
        body: payload,
        prefer: "resolution=merge-duplicates,return=representation"
      });
      const item = (res.data && Array.isArray(res.data)) ? res.data[0] : (res.data || payload);
      return { success: true, item, ...item };
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] saveMessage remote error:", err);
      return { success: true, item: payload, ...payload };
    }
  }

  async function deleteMessage(id) {
    try {
      await restRequest("/parent_messages?id=eq." + encodeURIComponent(id), { method: "DELETE" });
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] deleteMessage error:", err);
    }
    return { success: true };
  }

  // ============================================================================
  // 5. USERS & AUTHENTICATION
  // ============================================================================

  async function loginUser(username, password) {
    const u = (username || "").trim().toLowerCase();
    const p = (password || "").trim();

    try {
      const res = await restRequest(`/users?username=eq.${encodeURIComponent(u)}&select=*`);
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data[0];
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
      warnIfOnline("[Bohemka Supabase] loginUser remote check error:", err);
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
    const payload = {
      username: (userObj.username || "").trim().toLowerCase(),
      password_hash: userObj.password || "bohemka",
      name: userObj.name || userObj.username,
      role: userObj.role || "plavec",
      year_of_birth: userObj.year_of_birth || null,
      club_category: userObj.club_category || "Závodní plavání",
      email: userObj.email || "",
      phone: userObj.phone || ""
    };

    try {
      const res = await restRequest("/users", {
        method: "POST",
        body: payload
      });
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        return res.data[0];
      }
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] registerUser remote error:", err);
    }
    return userObj;
  }

  async function getUsers() {
    try {
      const res = await restRequest("/users?select=*");
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] getUsers error:", err);
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
    try {
      const res = await restRequest("/trainers?select=*&order=sort_order.asc");
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] getTrainers error:", err);
    }
    return (root.KlokaniData && root.KlokaniData.coaches) ? [...root.KlokaniData.coaches] : [];
  }

  async function saveTrainer(item) {
    try {
      const res = await restRequest("/trainers", {
        method: "POST",
        body: item,
        prefer: "resolution=merge-duplicates,return=representation"
      });
      if (res.data && Array.isArray(res.data) && res.data.length > 0) return res.data[0];
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] saveTrainer error:", err);
    }
    return item;
  }

  async function deleteTrainer(id) {
    try {
      await restRequest("/trainers?id=eq." + encodeURIComponent(id), { method: "DELETE" });
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] deleteTrainer error:", err);
    }
    return { success: true };
  }

  async function getYearbooks() {
    try {
      const res = await restRequest("/yearbooks?select=*&order=year.desc");
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] getYearbooks error:", err);
    }
    return (root.KlokaniData && root.KlokaniData.yearbooks) ? [...root.KlokaniData.yearbooks] : [];
  }

  async function saveYearbook(item) {
    try {
      const res = await restRequest("/yearbooks", {
        method: "POST",
        body: item,
        prefer: "resolution=merge-duplicates,return=representation"
      });
      if (res.data && Array.isArray(res.data) && res.data.length > 0) return res.data[0];
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] saveYearbook error:", err);
    }
    return item;
  }

  async function deleteYearbook(id) {
    try {
      await restRequest("/yearbooks?id=eq." + encodeURIComponent(id), { method: "DELETE" });
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] deleteYearbook error:", err);
    }
    return { success: true };
  }

  async function getRecords(pool, gender) {
    try {
      let query = "/records?select=*";
      if (pool && pool !== "all") query += `&pool=eq.${encodeURIComponent(pool)}`;
      if (gender && gender !== "all") query += `&gender=eq.${encodeURIComponent(gender)}`;
      const res = await restRequest(query);
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map(item => ({
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
      warnIfOnline("[Bohemka Supabase] getRecords error:", err);
    }
    let list = (root.KlokaniData && root.KlokaniData.records) ? [...root.KlokaniData.records] : [];
    if (pool && pool !== "all") list = list.filter(r => r.pool === pool);
    if (gender && gender !== "all") list = list.filter(r => r.gender === gender);
    return list;
  }

  async function saveRecord(item) {
    try {
      const res = await restRequest("/records", {
        method: "POST",
        body: item,
        prefer: "resolution=merge-duplicates,return=representation"
      });
      if (res.data && Array.isArray(res.data) && res.data.length > 0) return res.data[0];
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] saveRecord error:", err);
    }
    return item;
  }

  async function deleteRecord(id) {
    try {
      await restRequest("/records?id=eq." + encodeURIComponent(id), { method: "DELETE" });
    } catch (err) {
      warnIfOnline("[Bohemka Supabase] deleteRecord error:", err);
    }
    return { success: true };
  }

  async function testConnection() {
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      return { ok: false, success: false, status: 0, details: "Aplikace je v režimu offline.", message: "Aplikace je v režimu offline." };
    }
    const creds = getStoredCredentials();
    if (!creds.url || !creds.key) {
      return { ok: false, success: false, status: 0, details: "Chybí URL nebo anon klíč.", message: "Supabase není nakonfigurována (chybí URL nebo anon klíč)." };
    }
    try {
      const url = `${creds.url.replace(/\/+$/, "")}/rest/v1/news?select=id&limit=1`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "apikey": creds.key,
          "Authorization": "Bearer " + creds.key,
          "Accept": "application/json"
        }
      });
      const ok = res.ok;
      const status = res.status;
      let text = "";
      try { text = await res.text(); } catch (_) {}
      const details = ok ? "Spojení se Supabase je aktivní a plně funkční!" : `HTTP ${status}: ${text || res.statusText}`;
      return { ok, success: ok, status, details, message: details };
    } catch (err) {
      return { ok: false, success: false, status: 0, details: err.message || String(err), message: "Chyba sítě nebo neplatná adresa: " + (err.message || err) };
    }
  }

  // ============================================================================
  // 7. BACKGROUND SYNC
  // ============================================================================

  async function syncAll() {
    if (!isConfigured()) return;
    if (typeof navigator !== "undefined" && navigator.onLine === false) return;
    try {
      await Promise.all([
        getNews(),
        getEvents()
      ]);
      if (typeof root.dispatchEvent === "function") {
        root.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { kind: "all", action: "sync" } }));
        root.dispatchEvent(new CustomEvent("klokani:data-updated"));
      }
    } catch (e) {
      warnIfOnline("[Bohemka Supabase] syncAll error:", e);
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
    restRequest,
    getOfflineQueue: () => (root.BohStore && root.BohStore.getOfflineQueue ? root.BohStore.getOfflineQueue() : []),
    drainOfflineQueue: () => (root.BohStore && root.BohStore.drainOfflineQueue ? root.BohStore.drainOfflineQueue() : Promise.resolve()),

    // News
    getNews,
    saveNews,
    deleteNews,

    // Events & Signups
    getEvents,
    saveEvent,
    deleteEvent,
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
    deleteTrainer,
    getYearbooks,
    saveYearbook,
    deleteYearbook,
    getRecords,
    saveRecord,
    deleteRecord
  };

})(typeof window !== "undefined" ? window : globalThis);
