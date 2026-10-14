// TJ Bohemians Praha (Offline Service Worker)
const CACHE_NAME = "boh-cache-v2";
const STATIC_ASSETS = [
  "/",
  "aktuality",
  "oddil",
  "pro-rodice",
  "zavody",
  "rekordy",
  "statistika",
  "ke-stazeni",
  "foto",
  "kontakt",
  "intranet",
  "admin",
  "css/style.css",
  "js/data.js",
  "js/store.js",
  "js/app.js",
  "assets/logo-80-let.png",
  "assets/favicon.png",
  "assets/icon-192.png",
  "assets/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // Skip cross-origin or API calls from caching
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchPromise = fetch(e.request).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        }
        return networkRes;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
