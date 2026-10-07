/* Welzijnscheck service worker: maakt de app offline bruikbaar. Verhoog VERSION bij elke wijziging. */
const VERSION='v3';
const CACHE='welzijnscheck-'+VERSION;
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./xlsx.full.min.js", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png", "./fonts/bricolage-grotesque-latin-400-normal.woff2", "./fonts/bricolage-grotesque-latin-ext-400-normal.woff2", "./fonts/bricolage-grotesque-latin-600-normal.woff2", "./fonts/bricolage-grotesque-latin-ext-600-normal.woff2", "./fonts/bricolage-grotesque-latin-800-normal.woff2", "./fonts/bricolage-grotesque-latin-ext-800-normal.woff2", "./fonts/figtree-latin-400-normal.woff2", "./fonts/figtree-latin-ext-400-normal.woff2", "./fonts/figtree-latin-500-normal.woff2", "./fonts/figtree-latin-ext-500-normal.woff2", "./fonts/figtree-latin-600-normal.woff2", "./fonts/figtree-latin-ext-600-normal.woff2"];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('welzijnscheck-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET'||new URL(req.url).origin!==location.origin)return;
  if(req.mode==='navigate'){
    // pagina zelf: eerst netwerk (zodat updates doorkomen), anders cache
    e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put('./',c));return r}).catch(()=>caches.match('./')));
    return;
  }
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c));return r})));
});
