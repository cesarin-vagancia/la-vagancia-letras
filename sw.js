
const CACHE = "la-vagancia-letras-v3";
const BASE = "/la-vagancia-letras/";

const ARCHIVOS = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.json",
  BASE + "icono-192.png",
  BASE + "icono-512.png"
];

self.addEventListener("install", evento => {
  evento.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", evento => {
  evento.waitUntil(
    Promise.all([
      caches.keys().then(claves =>
        Promise.all(
          claves
            .filter(clave => clave !== CACHE)
            .map(clave => caches.delete(clave))
        )
      ),
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch", evento => {
  const url = new URL(evento.request.url);

  if (
    evento.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    !url.pathname.startsWith(BASE)
  ) {
    return;
  }

  evento.respondWith(
    fetch(evento.request).catch(() =>
      caches.match(evento.request)
    )
  );
});
