// TJ Bohemians Praha (Offline Service Worker)
// v4: network-first. Navstevnik vzdy dostane aktualni verzi z webu,
// cache slouzi jen jako zaloha, kdyz je zarizeni offline.
const CACHE_NAME = "boh-cache-v4";

const STATIC_ASSETS = [
  "/",
  "/aktuality",
  "/oddil",
  "/pro-rodice",
  "/zavody",
  "/rekordy",
  "/statistika",
  "/ke-stazeni",
  "/foto",
  "/kontakt",
  "/intranet",
  "/css/style.css",
  "/js/data.js",
  "/js/store.js",
  "/js/supabase.js",
  "/js/app.js",
  "/assets/logo-80-let.png",
  "/assets/favicon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(STATIC_ASSETS.map((u) => cache.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: "window" }))
      // otevrene karty drive drzely starou verzi z cache: jednorazove je obnovime
      .then((wins) => wins.forEach((w) => { try { w.navigate(w.url); } catch (err) { /* ignore */ } }))
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname === "/sw.js") return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then((cached) => cached || (e.request.mode === "navigate" ? caches.match("/") : undefined))
      )
  );
});
