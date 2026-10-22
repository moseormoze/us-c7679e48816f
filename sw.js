const CACHE='us2026-v13';
const PRECACHE=['./','index.html','manifest.webmanifest','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png',"fonts/NGS6v5_NC0k9P9GKTbFzsQ.woff2","fonts/NGS6v5_NC0k9P9GYTbFzsQ.woff2","fonts/NGS6v5_NC0k9P9H0TbFzsQ.woff2","fonts/NGS6v5_NC0k9P9H2TbE.woff2","fonts/NGS6v5_NC0k9P9H4TbFzsQ.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url); if(u.origin!==location.origin)return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{if(r&&r.ok)c.put(e.request,r.clone());return r}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}
    return (await net)||(e.request.mode==='navigate'?c.match('index.html'):Response.error());
  }));
});
