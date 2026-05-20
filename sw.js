var CACHE_NAME='city-drive-v1';
var ASSETS=[
  './',
  './index.html',
  './manifest.json'
];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE_NAME).then(function(cache){return cache.addAll(ASSETS)}));
  self.skipWaiting();
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(names){
    return Promise.all(names.filter(function(n){return n!==CACHE_NAME}).map(function(n){return caches.delete(n)}));
  }));
  self.clients.claim();
});
self.addEventListener('fetch',function(e){
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}));
});