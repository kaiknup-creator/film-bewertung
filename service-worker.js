self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("film-pwa").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./app.js"
      ]);
    })
  );
});
