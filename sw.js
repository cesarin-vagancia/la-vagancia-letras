 
const CACHE = "la-vagancia-letras-v4";
const BASE = "/la-vagancia-letras/";

const ARCHIVOS = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.json",
  BASE + "icon-192.png",
  BASE + "icon-512.png"
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    Promise.all([
      caches.keys().then((claves) =>
        Promise.all(
          claves
            .filter((clave) => clave !== CACHE)
            .map((clave) => caches.delete(clave))
        )
      ),
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch", (evento) => {
  const solicitud = evento.request;
  const url = new URL(solicitud.url);

  if (
    solicitud.method !== "GET" ||
    url.origin !== self.location.origin ||
    !url.pathname.startsWith(BASE)
  ) {
    return;
  }

  if (solicitud.mode === "navigate") {
    evento.respondWith(
      caches.match(BASE + "index.html").then((guardado) => {
        return guardado || fetch(solicitud);
      })
    );
    return;
  }

  evento.respondWith(
    caches.match(solicitud).then((guardado) => {
      return guardado || fetch(solicitud);
    })
  );
});
