const CACHE_NAME = "tasks-pwa-cache-v1";
const urlsToCache = ["index.html","manifest.json"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("push", event => {
  const data = event.data ? event.data.text() : "تذكير بمهمة!";
  event.waitUntil(
    self.registration.showNotification("📌 مهام اليوم", {
      body: data,
      icon: "icon.png"
    })
  );
});