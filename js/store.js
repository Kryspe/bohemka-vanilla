/**
 * Klokani — Store & State Management
 * Seamless hybrid: works standalone with LocalStorage AND syncs with PHP backend if present!
 */

window.KlokaniStore = (function () {
  const SIGNUPS_KEY = "klokani-signups";
  const ADMIN_ITEMS_KEY = "klokani-admin-items";
  const AUTH_KEY = "klokani-intranet-auth";
  const ROLE_KEY = "klokani-intranet-role";
  const USER_KEY = "klokani-intranet-name";

  // Check if PHP API is responsive
  let hasPhpBackend = false;
  fetch("api/events.php?ping=1", { method: "HEAD" })
    .then(res => { if (res.ok) hasPhpBackend = true; })
    .catch(() => { hasPhpBackend = false; });

  // 1. Signups
  function getSignups() {
    try {
      const raw = localStorage.getItem(SIGNUPS_KEY);
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
      const raw = localStorage.getItem(ADMIN_ITEMS_KEY);
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
        fields: { url: "https://images.unsplash.com/photo-1560090995-01632c28895b?w=1200&q=80", popis: "Ranní trénink v Jiřetíně" }
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
    return items;
  }

  function setAdminItemStatus(id, status) {
    const items = getAdminItems();
    const target = items.find(it => it.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(ADMIN_ITEMS_KEY, JSON.stringify(items));
    }
    return items;
  }

  function removeAdminItem(id) {
    let items = getAdminItems();
    items = items.filter(it => it.id !== id);
    localStorage.setItem(ADMIN_ITEMS_KEY, JSON.stringify(items));
    return items;
  }

  // 3. Intranet Auth & Role
  function isAuthed() {
    return localStorage.getItem(AUTH_KEY) === "1";
  }

  function login(username) {
    localStorage.setItem(AUTH_KEY, "1");
    const u = (username || "admin").trim().toLowerCase();
    localStorage.setItem(USER_KEY, u);
    if (u === "admin") {
      localStorage.setItem(ROLE_KEY, "admin");
      localStorage.setItem("klokani-admin-authed", "1");
    } else if (!localStorage.getItem(ROLE_KEY)) {
      localStorage.setItem(ROLE_KEY, "plavec");
    }
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("klokani-admin-authed");
    sessionStorage.removeItem("klokani-role-switched");
  }

  function getRole() {
    const r = localStorage.getItem(ROLE_KEY);
    const u = getUser();
    if (u === "admin" && (!r || r === "plavec") && !sessionStorage.getItem("klokani-role-switched")) {
      localStorage.setItem(ROLE_KEY, "admin");
      localStorage.setItem("klokani-admin-authed", "1");
      return "admin";
    }
    return r || (u === "admin" ? "admin" : "plavec");
  }

  function setRole(role) {
    sessionStorage.setItem("klokani-role-switched", "1");
    localStorage.setItem(ROLE_KEY, role);
    if (role === "admin") {
      localStorage.setItem("klokani-admin-authed", "1");
    }
  }

  function getUser() {
    return localStorage.getItem(USER_KEY) || "admin";
  }

  // 4. CSV Roster Export
  function exportSignupsCsv(event) {
    const signups = getSignups();
    const demo = (window.KlokaniData && window.KlokaniData.demoRoster[event.id]) || [];
    const me = getUser();
    const mySignup = signups[event.id];

    let rows = [["Jméno plavce", "Skupina", "Disciplíny", "Poznámka"]];

    demo.forEach(entry => {
      rows.push([entry.swimmer, entry.group, entry.disciplines.join("; "), ""]);
    });

    if (mySignup) {
      rows.push([me, "Závodník", mySignup.disciplines.join("; "), mySignup.note || ""]);
    }

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `klokani-soupiska-${event.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    isAuthed,
    login,
    logout,
    getRole,
    setRole,
    getUser,
    exportSignupsCsv
  };
})();
