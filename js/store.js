/**
 * TJ Bohemians Praha (oddíl plavání) — Store & State Management
 * Seamless hybrid: works standalone with LocalStorage AND syncs with PHP backend if present!
 */

// ============================================================================
// SECURITY SUITE: OWASP Hardening & Sanitization
// ============================================================================
function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`/g, "&#96;");
}

function safeUrl(rawUrl, defaultFallback = "index.html") {
  if (!rawUrl || typeof rawUrl !== "string") return defaultFallback;
  const cleaned = rawUrl.replace(/[\x00-\x1F\x7F]/g, "").trim();
  if (!cleaned) return defaultFallback;
  if (/^(javascript|data|vbscript|file):/i.test(cleaned)) return defaultFallback;
  if (cleaned.startsWith("//")) return defaultFallback;
  if (cleaned.startsWith("#") || cleaned.startsWith("?")) return cleaned;

  try {
    const origin = (typeof window !== "undefined" && window.location && window.location.origin) ? window.location.origin : "http://localhost:8080";
    const parsed = new URL(cleaned, origin);
    if (parsed.origin !== origin) {
      const allowedDomains = ["boh.cz", "kurzy.boh.cz", "vysledky.boh.cz", "czechswimming.cz", "instagram.com"];
      const isAllowed = allowedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith("." + d));
      if (!isAllowed) return defaultFallback;
      return parsed.href;
    }
    const path = parsed.pathname.replace(/^\//, "") + parsed.search + parsed.hash;
    return path || defaultFallback;
  } catch (e) {
    if (/^[a-zA-Z0-9_\-\.\/]+(#.*)?$/.test(cleaned)) return cleaned;
    return defaultFallback;
  }
}

function sanitizeCsv(val) {
  if (val == null) return "";
  const str = String(val).trim();
  // Prevent CSV Formula Injection (=, +, -, @, \t, \r, %)
  if (/^[=+\-@\t\r%]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function escapeXml(val) {
  if (val == null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function safeObject(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(safeObject);
  const clean = Object.create(null);
  for (const [k, v] of Object.entries(obj)) {
    if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
    clean[k] = (typeof v === "object" && v !== null) ? safeObject(v) : v;
  }
  return clean;
}

// Expose globally for all templates and modules
window.BohSecurity = { escapeHtml, safeUrl, sanitizeCsv, escapeXml, safeObject };
window.escapeHtml = escapeHtml;
window.safeUrl = safeUrl;
window.sanitizeCsv = sanitizeCsv;
window.escapeXml = escapeXml;

window.BohStore = (function () {
  const SIGNUPS_KEY = "boh-signups";
  const ADMIN_ITEMS_KEY = "boh-admin-items";
  const AUTH_KEY = "boh-intranet-auth";
  const ROLE_KEY = "boh-intranet-role";
  const USER_KEY = "boh-intranet-name";
  const NOTIFICATIONS_SEEN_KEY = "boh-notifications-seen-time";

  function getStored(key, legacyKey) {
    try {
      return localStorage.getItem(key) || (legacyKey ? localStorage.getItem(legacyKey) : null);
    } catch {
      return null;
    }
  }

  // Check if PHP API is responsive
  let hasPhpBackend = false;
  if (typeof fetch === "function") {
    fetch("api/events.php?ping=1", { method: "HEAD" })
      .then(res => { if (res.ok) hasPhpBackend = true; })
      .catch(() => { hasPhpBackend = false; });
  }

  // 1. Signups
  function getSignups() {
    try {
      const raw = getStored(SIGNUPS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveSignup(eventId, disciplines, note) {
    const signups = getSignups();
    signups[eventId] = {
      eventId,
      disciplines: disciplines || [],
      note: note || "",
      at: new Date().toISOString()
    };
    localStorage.setItem(SIGNUPS_KEY, JSON.stringify(signups));

    if (hasPhpBackend) {
      fetch("api/signups.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signups[eventId])
      }).catch(console.error);
    }
    return signups;
  }

  function cancelSignup(eventId) {
    const signups = getSignups();
    delete signups[eventId];
    localStorage.setItem(SIGNUPS_KEY, JSON.stringify(signups));

    if (hasPhpBackend) {
      fetch(`api/signups.php?id=${encodeURIComponent(eventId)}`, {
        method: "DELETE"
      }).catch(console.error);
    }
    return signups;
  }

  function isSignedUp(eventId) {
    const signups = getSignups();
    return Boolean(signups[eventId]);
  }

  // 2. Admin Items
  function getAdminItems() {
    try {
      const raw = getStored(ADMIN_ITEMS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}

    // Initial seed items if none stored
    const initial = [
      {
        id: "imp-1",
        kind: "aktualita",
        status: "pending",
        source: "kurzy.boh.cz",
        createdAt: "2026-08-25T08:12:00.000Z",
        title: "Zápisy do kurzů plavání na podzim 2026",
        fields: { datum: "2026-09-01", autor: "Petr Dvořák", text: "Otevíráme zápisy do kurzů základního plavání přes kurzy.boh.cz." }
      },
      {
        id: "imp-2",
        kind: "vysledek",
        status: "pending",
        source: "vysledky.boh.cz",
        createdAt: "2026-08-26T17:40:00.000Z",
        title: "Natálie Zápotocká — 200 PZ",
        fields: { zavod: "Letní pohár Podolí", datum: "2026-08-22", disciplina: "200 PZ", cas: "2:21.65", poradi: "1." }
      },
      {
        id: "imp-3",
        kind: "foto",
        status: "pending",
        source: "foto.boh.cz",
        createdAt: "2026-08-26T18:02:00.000Z",
        title: "Soustředění Jizerky 2026 — ranní rozplavání",
        fields: { url: "assets/aktuality/2240.jpg", popis: "Ranní trénink v Jiřetíně" }
      }
    ];
    localStorage.setItem(ADMIN_ITEMS_KEY, JSON.stringify(initial));
    return initial;
  }

  function saveAdminItem(item) {
    const items = getAdminItems();
    item.id = item.id || "item-" + Date.now();
    item.createdAt = item.createdAt || new Date().toISOString();
    items.unshift(item);
    localStorage.setItem(ADMIN_ITEMS_KEY, JSON.stringify(items));

    if (hasPhpBackend) {
      fetch("api/admin.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      }).catch(console.error);
    }
    return items;
  }

  function setAdminItemStatus(id, status) {
    const items = getAdminItems();
    const target = items.find(it => it.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(ADMIN_ITEMS_KEY, JSON.stringify(items));

      if (hasPhpBackend) {
        fetch("api/admin.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(target)
        }).catch(console.error);
      }
    }
    return items;
  }

  const DELETED_IDS_KEY = "boh-deleted-ids";

  function getDeletedIds() {
    try {
      const raw = localStorage.getItem(DELETED_IDS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function markIdDeleted(id) {
    if (!id) return;
    const list = getDeletedIds();
    const str = String(id);
    if (!list.includes(str)) {
      list.push(str);
      localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(list));
    }
  }

  function removeAdminItem(id) {
    let items = getAdminItems();
    items = items.filter(it => it.id !== id);
    localStorage.setItem(ADMIN_ITEMS_KEY, JSON.stringify(items));
    return items;
  }

  // 3. Merged Data Providers (Static data + approved admin items)
  function getNews() {
    const dataObj = window.BohData || window.KlokaniData;
    const defaultNews = (dataObj && dataObj.news) ? [...dataObj.news] : [];
    const approved = getAdminItems().filter(i => i.status === "approved" && (i.kind === "aktualita" || i.kind === "aktuality"));
    const managedNews = approved.map(i => ({
      id: i.id,
      title: i.title,
      date: (i.fields && (i.fields.datum || i.fields.date)) || i.createdAt.slice(0, 10),
      author: (i.fields && (i.fields.autor || i.fields.author)) || "TJ Bohemians Praha",
      category: (i.fields && (i.fields.kategorie || i.fields.category)) || "Oddíl",
      excerpt: (i.fields && (i.fields.perex || i.fields.excerpt || i.fields.text)) || "",
      body: (i.fields && i.fields.text) ? [i.fields.text] : [],
      image: (i.fields && (i.fields.image || i.fields.url)) || "assets/aktuality/2240.jpg"
    }));
    const deleted = getDeletedIds();
    const all = [...managedNews, ...defaultNews].filter(n => !deleted.includes(String(n.id)));
    return all.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }

  function getEvents() {
    const dataObj = window.BohData || window.KlokaniData;
    const defaultEvents = (dataObj && dataObj.events) ? [...dataObj.events] : [];
    const approved = getAdminItems().filter(i => i.status === "approved" && (i.kind === "zavod" || i.kind === "zavody" || i.kind === "soustredeni"));
    const managedEvents = approved.map(i => {
      const isCamp = (i.fields && (i.fields.druh === "soustredeni" || i.fields.kind === "soustredeni")) || i.kind === "soustredeni";
      let disc = [];
      if (!isCamp) {
        if (i.fields && Array.isArray(i.fields.disciplines) && i.fields.disciplines.length > 0) {
          disc = i.fields.disciplines;
        } else {
          disc = ["50 VZ", "100 VZ", "200 VZ", "100 Z", "100 P", "100 M", "200 PZ"];
        }
      }
      return {
        id: i.id,
        name: i.title,
        place: (i.fields && (i.fields.misto || i.fields.place)) || "Praha",
        date: (i.fields && (i.fields.datum || i.fields.date)) || "2026-10-15",
        deadline: (i.fields && (i.fields.deadline || i.fields.datum || i.fields.date)) || "2026-10-10",
        type: (i.fields && (i.fields.typ || i.fields.type)) || (isCamp ? "Soustředění" : "Oddílový závod"),
        kind: isCamp ? "soustredeni" : "zavod",
        groups: (i.fields && (i.fields.skupiny || i.fields.groups)) || ["ST", "ODA", "ODB"],
        ageCategories: (i.fields && (i.fields.vek || i.fields.ageCategories || i.fields.rocniky)) || "Všechny ročníky",
        note: i.fields && (i.fields.poznamka || i.fields.note || i.fields.text),
        disciplines: disc
      };
    });
    const deleted = getDeletedIds();
    const all = [...managedEvents, ...defaultEvents].filter(e => !deleted.includes(String(e.id)));
    return all.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
  }

  function getDownloads() {
    const dataObj = window.BohData || window.KlokaniData;
    const defaultDownloads = (dataObj && dataObj.downloads) ? [...dataObj.downloads] : [];
    const approved = getAdminItems().filter(i => i.status === "approved" && (i.kind === "dokument" || i.kind === "dokumenty" || i.kind === "ke-stazeni"));
    const managedDownloads = approved.map(i => ({
      id: i.id,
      title: i.title,
      category: (i.fields && i.fields.kategorie) || "Rozvrhy a dráhy",
      description: (i.fields && (i.fields.popis || i.fields.text)) || "",
      fileName: (i.fields && i.fields.soubor) || `${i.title.replace(/\s+/g, "_")}.pdf`,
      fileSize: (i.fields && i.fields.velikost) || "250 KB",
      updatedAt: (i.fields && i.fields.datum) || i.createdAt.slice(0, 10),
      fileType: "pdf",
      important: Boolean(i.fields && i.fields.dulezite)
    }));
    const deleted = getDeletedIds();
    return [...managedDownloads, ...defaultDownloads].filter(d => !deleted.includes(String(d.id)));
  }

  function getParentsNotes() {
    const dataObj = window.BohData || window.KlokaniData;
    const defaultNotes = (dataObj && dataObj.parentsNotes) ? [...dataObj.parentsNotes] : [];
    const approved = getAdminItems().filter(i => i.status === "approved" && (i.kind === "informace" || i.kind === "vzkaz" || i.kind === "pro-rodice"));
    const managedNotes = approved.map(i => (i.fields && (i.fields.text || i.fields.popis)) || i.title);
    return [...managedNotes, ...defaultNotes];
  }

  function getPhotos() {
    const dataObj = window.BohData || window.KlokaniData;
    const defaultPhotos = (dataObj && (dataObj.galleries || dataObj.photos)) ? [...(dataObj.galleries || dataObj.photos)] : [
      { id: "gal-1", title: "Oslava 80 let oddílu — Příchod na oslavu", url: "assets/foto/86049.jpg", caption: "Areál na Hagiboru" },
      { id: "gal-2", title: "Oslava 80 let oddílu — Program akce", url: "assets/foto/86050.jpg", caption: "Slavnostní zahájení" },
      { id: "gal-3", title: "Oslava 80 let oddílu — Setkání generací", url: "assets/foto/86054.jpg", caption: "Generace plavců pohromadě" },
      { id: "gal-4", title: "Oslava 80 let oddílu — Společná fotka Klokanů", url: "assets/foto/86071.jpg", caption: "212 účastníků" },
      { id: "gal-5", title: "Oslava 80 let oddílu — Trofeje a ocenění", url: "assets/foto/86075.jpg", caption: "Poháry a LED prezentace" },
      { id: "gal-6", title: "Oslava 80 let oddílu — Večerní atmosféra", url: "assets/foto/86088.jpg", caption: "Raut, grilování a přátelé" }
    ];
    const approved = getAdminItems().filter(i => i.status === "approved" && (i.kind === "foto" || i.kind === "fotogalerie"));
    const managedPhotos = approved.map(i => ({
      id: i.id,
      title: i.title,
      url: (i.fields && (i.fields.url || i.fields.image)) || "assets/aktuality/2240.jpg",
      caption: (i.fields && (i.fields.caption || i.fields.album || i.fields.popis || i.fields.text)) || "Fotografie",
      album: (i.fields && i.fields.album) || "Fotogalerie",
      date: (i.fields && i.fields.datum) || i.createdAt.slice(0, 10)
    }));
    const deleted = getDeletedIds();
    return [...managedPhotos, ...defaultPhotos].filter(p => !deleted.includes(String(p.id)));
  }

  function getSwimmers() {
    const dataObj = window.BohData || window.KlokaniData;
    const defaultSwimmers = (dataObj && dataObj.stats && dataObj.stats.swimmers)
      ? [...dataObj.stats.swimmers]
      : [];
    const approved = getAdminItems().filter(i => i.status === "approved" && i.kind === "plavec");
    const managedSwimmers = approved.map(i => ({
      id: i.id,
      name: i.title,
      birthYear: Number((i.fields && i.fields.rocnik) || 2010),
      gender: (i.fields && i.fields.pohlavi) || "Muži",
      category: (i.fields && i.fields.skupina) || "Závodní družstvo",
      role: (i.fields && i.fields.role) || "Plavec",
      bio: (i.fields && i.fields.bio) || "Aktivní plavec oddílu TJ Bohemians Praha.",
      achievements: (i.fields && i.fields.uspechy) ? [i.fields.uspechy] : ["Člen oddílu TJ Bohemians Praha"],
      bestTimes: []
    }));
    return [...managedSwimmers, ...defaultSwimmers];
  }

  function getTopPerformances() {
    const dataObj = window.BohData || window.KlokaniData;
    return (dataObj && dataObj.stats && dataObj.stats.topPerformances)
      ? dataObj.stats.topPerformances
      : [];
  }

  // 4. Notifications & Updates Tracking
  const CUSTOM_NOTIFS_KEY = "boh-notifications";

  function getDefaultNotifications() {
    return [
      {
        id: "notif_payment_1",
        title: "Platba oddílových příspěvků na 1. pololetí",
        subtitle: "Prosíme o úhradu oddílových příspěvků na účet 123456789/0300 (ČSOB) do 15. 10. Jako VS uveďte rodné číslo plavce.",
        type: "payment",
        url: "pro-rodice.html",
        createdAt: new Date().toISOString(),
        unread: true,
        priority: "high"
      },
      {
        id: "notif_deadline_1",
        title: "Uzávěrka přihlášek: Velká cena Plzně",
        subtitle: "Přihlášky na VC Plzně končí zítra ve 20:00! Nezapomeňte zkontrolovat své vybrané disciplíny.",
        type: "deadline",
        url: "zavody.html",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        unread: true,
        priority: "normal"
      },
      {
        id: "notif_coach_1",
        title: "Zpráva trenéra Jana Srba: Rozpis tréninků",
        subtitle: "Od pondělí platí aktualizovaný rozpis drah pro závodní družstva ST a ODA na bazénu v Podolí.",
        type: "coach",
        url: "ke-stazeni.html",
        createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
        unread: false,
        priority: "normal"
      },
      {
        id: "notif_news_1",
        title: "Evropský pohár v dálkovém plavání v Razanacu",
        subtitle: "Háňa Jurčáková obsadila skvělé 12. místo v mezinárodním závodě v Chorvatsku.",
        type: "news",
        url: "aktuality.html",
        createdAt: new Date(Date.now() - 3600000 * 44).toISOString(),
        unread: false,
        priority: "normal"
      }
    ];
  }

  function getCustomNotifications() {
    try {
      const raw = localStorage.getItem(CUSTOM_NOTIFS_KEY);
      if (!raw) {
        const def = getDefaultNotifications();
        localStorage.setItem(CUSTOM_NOTIFS_KEY, JSON.stringify(def));
        return def;
      }
      return JSON.parse(raw);
    } catch {
      return getDefaultNotifications();
    }
  }

  function saveCustomNotifications(items) {
    try {
      localStorage.setItem(CUSTOM_NOTIFS_KEY, JSON.stringify(items));
    } catch {}
  }

  function addNotification(item) {
    const list = getCustomNotifications();
    const newNotif = {
      id: item.id || `notif_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      title: item.title || "Nové oznámení oddílu",
      subtitle: item.subtitle || item.message || "",
      type: item.type || "notice",
      url: item.url || "index.html",
      createdAt: item.createdAt || new Date().toISOString(),
      unread: true,
      priority: item.priority || "normal"
    };

    list.unshift(newNotif);
    saveCustomNotifications(list);

    // Send to PHP backend if online
    if (typeof fetch !== "undefined") {
      fetch("api/notifications.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotif)
      }).catch(() => {});
    }

    // Trigger custom event for real-time banner display
    window.dispatchEvent(new CustomEvent("boh:notification:new", { detail: newNotif }));

    // Update unread dots
    document.querySelectorAll(".notification-unread-dot").forEach(d => d.classList.remove("hidden"));

    return newNotif;
  }

  function getRecentNotifications() {
    return getCustomNotifications();
  }

  function getUnreadNotificationsCount() {
    const list = getCustomNotifications();
    return list.filter(n => n.unread).length;
  }

  function hasUnreadNotifications() {
    return getUnreadNotificationsCount() > 0;
  }

  function markNotificationRead(id) {
    const list = getCustomNotifications();
    const item = list.find(n => n.id === id);
    if (item) {
      item.unread = false;
      saveCustomNotifications(list);
    }
    if (!hasUnreadNotifications()) {
      document.querySelectorAll(".notification-unread-dot").forEach(d => d.classList.add("hidden"));
    }
  }

  function markNotificationsRead() {
    const list = getCustomNotifications();
    list.forEach(n => { n.unread = false; });
    saveCustomNotifications(list);
    try {
      localStorage.setItem(NOTIFICATIONS_SEEN_KEY, String(Date.now()));
    } catch {}
    document.querySelectorAll(".notification-unread-dot").forEach(d => d.classList.add("hidden"));
  }

  function dismissNotification(id) {
    let list = getCustomNotifications();
    list = list.filter(n => n.id !== id);
    saveCustomNotifications(list);
    if (!hasUnreadNotifications()) {
      document.querySelectorAll(".notification-unread-dot").forEach(d => d.classList.add("hidden"));
    }
  }

  function clearAllNotifications() {
    saveCustomNotifications([]);
    document.querySelectorAll(".notification-unread-dot").forEach(d => d.classList.add("hidden"));
  }

  function clearReadNotifications() {
    let list = getCustomNotifications();
    list = list.filter(n => n.unread);
    saveCustomNotifications(list);
  }

  function stripDiacritics(str) {
    if (!str) return "";
    return String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  // 5. Global Search across the entire website
  function searchSite(query) {
    const raw = (query || "").trim();
    if (!raw) return [];
    const q = raw.toLowerCase();
    const qNorm = stripDiacritics(raw);

    const matches = (text) => {
      if (!text) return false;
      const t = String(text);
      return t.toLowerCase().includes(q) || stripDiacritics(t).includes(qNorm);
    };

    const results = [];

    // Static pages
    const pages = [
      { title: "Úvodní stránka", desc: "Přehled plaveckého oddílu TJ Bohemians Praha, kalendář závodů, aktuality a tréninkové skupiny.", url: "index.html", cat: "Stránka" },
      { title: "Aktuality", desc: "Zprávy, výsledky z MČR a pohárů, nominace a oznámení trenérů.", url: "aktuality.html", cat: "Stránka" },
      { title: "O oddílu", desc: "Historie od roku 1946 k 80. výročí, tréninkové skupiny ST, ODA, Výběr, Přípravka.", url: "oddil.html", cat: "Stránka" },
      { title: "Závody a kalendář", desc: "Termíny závodů, uzávěrky přihlášek, bazén Podolí a Vinohrady.", url: "zavody.html", cat: "Stránka" },
      { title: "Rekordy oddílu", desc: "Oddílové rekordy na 25m a 50m bazénu, historické tabulky časů.", url: "rekordy.html", cat: "Stránka" },
      { title: "Statistika & Žebříčky", desc: "TOP 10 historické výkony, FINA body a profily plavců Bohemians.", url: "statistika.html", cat: "Stránka" },
      { title: "Ke stažení", desc: "Rozdělení do drah 2026/27, rozvrhy tréninků, platby příspěvků, lékařské posudky.", url: "ke-stazeni.html", cat: "Stránka" },
      { title: "Pro rodiče", desc: "Informace pro rodiče, zápisy dětí, omluvenky a desatero plavce.", url: "pro-rodice.html", cat: "Stránka" },
      { title: "Fotogalerie", desc: "Fotoalba ze soustředění a závodů, odkaz na Zoneramu oddílu.", url: "foto.html", cat: "Stránka" },
      { title: "Kontakty", desc: "Trenéři, předseda Mgr. Jan Srb, bazény Podolí a Vinohrady, IČO: 00539121.", url: "kontakt.html", cat: "Stránka" },
      { title: "Intranet (Členská sekce)", desc: "Přihlašování na závody pro plavce i trenéry, správa rezervací a administrace.", url: "intranet.html", cat: "Intranet" }
    ];

    pages.forEach(p => {
      if (matches(p.title) || matches(p.desc)) {
        results.push({ title: p.title, subtitle: p.desc, url: p.url, category: p.cat });
      }
    });

    // News
    getNews().forEach(n => {
      if (matches(n.title) || matches(n.excerpt)) {
        results.push({ title: n.title, subtitle: `${n.date} · ${n.author}`, url: "aktuality.html", category: "Aktualita" });
      }
    });

    // Events
    getEvents().forEach(e => {
      if (matches(e.name) || matches(e.place)) {
        results.push({ title: e.name, subtitle: `${e.place} · ${e.date}`, url: "zavody.html", category: "Závod" });
      }
    });

    // Downloads
    getDownloads().forEach(d => {
      if (matches(d.title) || matches(d.description) || matches(d.fileName)) {
        results.push({ title: d.title, subtitle: `${d.category} · ${d.fileSize}`, url: "ke-stazeni.html", category: "Ke stažení" });
      }
    });

    // Swimmers
    getSwimmers().forEach(s => {
      if (matches(s.name) || matches(s.category) || matches(s.role)) {
        results.push({ title: s.name, subtitle: `${s.category} · ${s.role || ""}`, url: "statistika.html", category: "Plavec" });
      }
    });

    // Coaches
    const dataObj = window.BohData || window.KlokaniData;
    if (dataObj && dataObj.coaches) {
      dataObj.coaches.forEach(c => {
        if (matches(c.name) || matches(c.role)) {
          results.push({ title: c.name, subtitle: c.role, url: "kontakt.html", category: "Trenér" });
        }
      });
    }

    // Club Records (396 official records)
    if (dataObj && dataObj.records) {
      dataObj.records.forEach(r => {
        const sName = r.holder || r.swimmer || "";
        if (matches(sName) || matches(r.event) || matches(r.category)) {
          results.push({
            title: `${r.event} — ${r.time} (${sName})`,
            subtitle: `Rekord Bohemians • ${r.category} • Bazén ${r.pool} • Rok ${r.year}`,
            url: "rekordy.html",
            category: "Rekord"
          });
        }
      });
    }

    
    // Parent notes & Infolístky
    if (dataObj && dataObj.parentsNotes) {
      dataObj.parentsNotes.forEach(note => {
        const text = typeof note === 'string' ? note : (note.text || note.title || '');
        if (matches(text)) {
          results.push({
            title: text.slice(0, 75) + (text.length > 75 ? '…' : ''),
            subtitle: 'Vzkaz pro rodiče • ' + (note.date || 'Aktuální'),
            url: 'pro-rodice.html',
            category: 'Pro rodiče'
          });
        }
      });
    }

    // Subdomains & Oddílové weby
    if (dataObj && dataObj.subdomains) {
      dataObj.subdomains.forEach(sub => {
        if (matches(sub.name) || matches(sub.domain) || matches(sub.description)) {
          results.push({
            title: sub.name + ' (' + sub.domain + ')',
            subtitle: sub.description || sub.lead || 'Web oddílu',
            url: sub.url,
            category: 'Subdoména'
          });
        }
      });
    }

    return results.slice(0, 20);
  }

  // 6. Intranet Auth & Role (Section-scoped: auto logout when leaving intranet)
  function isAuthed() {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "1";
    } catch {
      return false;
    }
  }

  function login(username) {
    try {
      sessionStorage.setItem(AUTH_KEY, "1");
      sessionStorage.setItem(USER_KEY, username || "admin");
      localStorage.setItem(USER_KEY, username || "admin");
      if (!sessionStorage.getItem(ROLE_KEY) && !localStorage.getItem(ROLE_KEY)) {
        const role = (username && (username.toLowerCase() === "admin" || username.toLowerCase().includes("trener") || username.toLowerCase().includes("srb"))) ? "trener" : "plavec";
        sessionStorage.setItem(ROLE_KEY, role);
        localStorage.setItem(ROLE_KEY, role);
      }
    } catch {}
  }

  function logout() {
    try {
      sessionStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_KEY);
    } catch {}
  }

  function getRole() {
    try {
      const u = getUser().trim().toLowerCase();
      if (u !== "admin" && !u.includes("trener") && !u.includes("srb")) {
        return "plavec";
      }
      return sessionStorage.getItem(ROLE_KEY) || getStored(ROLE_KEY) || (u === "admin" ? "trener" : "plavec");
    } catch {
      return "plavec";
    }
  }

  function setRole(role) {
    try {
      const u = getUser().trim().toLowerCase();
      if (u !== "admin" && !u.includes("trener") && !u.includes("srb")) {
        console.warn("[BohStore] Security Alert: Unauthorized role switch attempt by swimmer", u);
        return;
      }
      sessionStorage.setItem(ROLE_KEY, role);
      localStorage.setItem(ROLE_KEY, role);
    } catch {}
  }

  function getUser() {
    try {
      return sessionStorage.getItem(USER_KEY) || getStored(USER_KEY) || "user";
    } catch {
      return "user";
    }
  }

  function notifyDataUpdated(kind, item) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("boh:data-updated", { detail: { kind, item } }));
      try {
        localStorage.setItem("boh-last-sync", Date.now().toString());
      } catch {}
    }
  }

  function getAlerts() {
    const approved = getAdminItems().filter(i => i.status === "approved" && (i.kind === "informace" || i.kind === "vzkaz" || i.kind === "pro-rodice" || i.kind === "aktivita"));
    const managedAlerts = approved.map(i => ({
      id: i.id,
      title: i.title,
      text: (i.fields && (i.fields.text || i.fields.popis)) || i.title,
      type: (i.fields && (i.fields.type || i.fields.typ)) || "upozorneni",
      date: (i.fields && (i.fields.datum || i.fields.date)) || i.createdAt.slice(0, 10)
    }));
    const defaultAlerts = [
      { id: "def-alt-1", title: "Sobotní trénink v Podolí", text: "v září již NENÍ.", type: "upozorneni", date: "2026-09-15" },
      { id: "def-alt-2", title: "Nábor do závodní přípravky (6–12 let)", text: "byl UKONČEN pro vyčerpání kapacity oddílu.", type: "dulezite", date: "2026-09-01" },
      { id: "def-alt-3", title: "V roce 2026 setkání k 80. výročí oddílu", text: "proběhlo na Hagiboru za účasti 212 členů a přátel oddílu a bylo to velkolepé.", type: "info", date: "2026-08-30" }
    ];
    const deleted = getDeletedIds();
    return [...managedAlerts, ...defaultAlerts].filter(a => !deleted.includes(String(a.id)));
  }

  function addNews(item) {
    const adminItem = {
      id: "news-" + Date.now(),
      kind: "aktualita",
      status: "approved",
      source: "trener-intranet",
      createdAt: new Date().toISOString(),
      title: item.title,
      fields: {
        datum: item.date || new Date().toISOString().slice(0, 10),
        autor: item.author || "Jan Srb (hlavní trenér)",
        kategorie: item.category || "Oddíl",
        perex: item.excerpt || (item.body ? (Array.isArray(item.body) ? item.body[0] : String(item.body).slice(0, 200)) : ""),
        text: Array.isArray(item.body) ? item.body.join("\n\n") : (item.body || ""),
        image: item.image || ""
      }
    };
    saveAdminItem(adminItem);
    notifyDataUpdated("aktualita", adminItem);
    return getNews();
  }

  function deleteNews(id) {
    removeAdminItem(id);
    markIdDeleted(id);
    notifyDataUpdated("aktualita", { id, deleted: true });
    return getNews();
  }

  function addEvent(item) {
    const isCamp = (item.kind === "soustredeni" || item.druh === "soustredeni");
    const adminItem = {
      id: "event-" + Date.now(),
      kind: isCamp ? "soustredeni" : "zavod",
      status: "approved",
      source: "trener-intranet",
      createdAt: new Date().toISOString(),
      title: item.name || item.title,
      fields: {
        datum: item.date || new Date().toISOString().slice(0, 10),
        deadline: item.deadline || item.date || new Date().toISOString().slice(0, 10),
        misto: item.place || "Podolí 50m, Praha",
        typ: item.type || (isCamp ? "Soustředění" : "Oddílový závod"),
        druh: isCamp ? "soustredeni" : "zavod",
        poznamka: item.note || "",
        skupiny: Array.isArray(item.groups) ? item.groups : ["ST", "ODA", "ODB"],
        vek: item.ageCategories || item.age || "Všechny ročníky",
        disciplines: isCamp ? [] : (Array.isArray(item.disciplines) && item.disciplines.length > 0 ? item.disciplines : ["50 VZ", "100 VZ", "200 VZ", "100 Z", "100 P", "100 M", "200 PZ"])
      }
    };
    saveAdminItem(adminItem);
    notifyDataUpdated("zavod", adminItem);
    return getEvents();
  }

  function deleteEvent(id) {
    removeAdminItem(id);
    markIdDeleted(id);
    notifyDataUpdated("zavod", { id, deleted: true });
    return getEvents();
  }

  function addAlert(item) {
    const adminItem = {
      id: "alert-" + Date.now(),
      kind: "informace",
      status: "approved",
      source: "trener-intranet",
      createdAt: new Date().toISOString(),
      title: item.title,
      fields: {
        text: item.text || "",
        popis: item.text || "",
        typ: item.type || "upozorneni",
        type: item.type || "upozorneni",
        datum: item.date || new Date().toISOString().slice(0, 10)
      }
    };
    saveAdminItem(adminItem);
    // Also push a live notification so the bell rings
    addNotification({
      title: item.title,
      subtitle: item.text || "",
      type: item.type === "dulezite" ? "warning" : "info"
    });
    notifyDataUpdated("informace", adminItem);
    return getAlerts();
  }

  function deleteAlert(id) {
    removeAdminItem(id);
    markIdDeleted(id);
    notifyDataUpdated("informace", { id, deleted: true });
    return getAlerts();
  }

  function addPhoto(item) {
    const adminItem = {
      id: "photo-" + Date.now(),
      kind: "foto",
      status: "approved",
      source: "trener-intranet",
      createdAt: new Date().toISOString(),
      title: item.title,
      fields: {
        url: item.url || "assets/aktuality/2240.jpg",
        caption: item.caption || item.title,
        album: item.album || item.title,
        datum: item.date || new Date().toISOString().slice(0, 10)
      }
    };
    saveAdminItem(adminItem);
    notifyDataUpdated("foto", adminItem);
    return getPhotos();
  }

  function deletePhoto(id) {
    removeAdminItem(id);
    markIdDeleted(id);
    notifyDataUpdated("foto", { id, deleted: true });
    return getPhotos();
  }

  function addDownload(item) {
    const adminItem = {
      id: "doc-" + Date.now(),
      kind: "dokument",
      status: "approved",
      source: "trener-intranet",
      createdAt: new Date().toISOString(),
      title: item.title,
      fields: {
        kategorie: item.category || "Rozvrhy a dráhy",
        popis: item.description || "",
        soubor: item.fileName || `${item.title.replace(/\s+/g, "_")}.pdf`,
        velikost: item.fileSize || "250 KB",
        datum: item.updatedAt || new Date().toISOString().slice(0, 10),
        dulezite: Boolean(item.important)
      }
    };
    saveAdminItem(adminItem);
    notifyDataUpdated("dokument", adminItem);
    return getDownloads();
  }

  function deleteDownload(id) {
    removeAdminItem(id);
    markIdDeleted(id);
    notifyDataUpdated("dokument", { id, deleted: true });
    return getDownloads();
  }

  // 7. Comprehensive CSV Roster Export for Coach
  function exportSignupsCsv(eventOrId) {
    const allEvents = getEvents();
    let targetEvents = [];
    if (eventOrId) {
      const found = typeof eventOrId === "string" ? allEvents.find(e => e.id === eventOrId) : eventOrId;
      if (found) targetEvents = [found];
    }
    if (targetEvents.length === 0) {
      targetEvents = allEvents.filter(e => e.kind !== "soustredeni");
    }

    const signups = getSignups();
    const dataObj = window.BohData || window.KlokaniData;
    const me = getUser();

    let rows = [
      ["Závod", "Datum", "Místo", "Jméno plavce", "Kategorie/Skupina", "Přihlášené disciplíny", "Poznámka / Odhláška"]
    ];

    targetEvents.forEach(ev => {
      const demo = (dataObj && dataObj.demoRoster && dataObj.demoRoster[ev.id]) || [];
      demo.forEach(entry => {
        rows.push([
          sanitizeCsv(ev.name),
          sanitizeCsv(ev.date),
          sanitizeCsv(ev.place),
          sanitizeCsv(entry.swimmer),
          sanitizeCsv(entry.group),
          sanitizeCsv((entry.disciplines || []).join(", ")),
          ""
        ]);
      });

      const mySignup = signups[ev.id];
      if (mySignup) {
        rows.push([
          sanitizeCsv(ev.name),
          sanitizeCsv(ev.date),
          sanitizeCsv(ev.place),
          sanitizeCsv(me),
          "Závodník TJ Bohemians",
          sanitizeCsv((mySignup.disciplines || []).join(", ")),
          sanitizeCsv(mySignup.note || "")
        ]);
      }
    });

    const csvContent = "\uFEFF" + rows.map(r => r.map(cell => `"${String(cell || "").replace(/"/g, '""')}"`).join(";")).join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = targetEvents.length === 1
      ? `Soupiska_CSPS_${targetEvents[0].name.replace(/[^a-zA-Z0-9_\u00C0-\u017F]/g, "_")}.csv`
      : `Prehled_prihlasek_zavody_BOH_2026.csv`;
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return {
    getSignups,
    saveSignup,
    cancelSignup,
    isSignedUp,
    getAdminItems,
    saveAdminItem,
    setAdminItemStatus,
    removeAdminItem,
    getNews,
    getEvents,
    getDownloads,
    getParentsNotes,
    getAlerts,
    getPhotos,
    getSwimmers,
    getTopPerformances,
    getRecentNotifications,
    hasUnreadNotifications,
    markNotificationsRead,
    addNotification,
    markNotificationRead,
    dismissNotification,
    clearAllNotifications,
    clearReadNotifications,
    getUnreadNotificationsCount,
    searchSite,
    isAuthed,
    login,
    logout,
    getRole,
    setRole,
    getUser,
    exportSignupsCsv,
    addNews,
    deleteNews,
    addEvent,
    deleteEvent,
    addAlert,
    deleteAlert,
    addPhoto,
    deletePhoto,
    addDownload,
    deleteDownload,
    notifyDataUpdated
  };
})();

// Backward compatibility alias
window.KlokaniStore = window.BohStore;
