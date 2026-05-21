// Service Worker for City Drive PWA
var CACHE_NAME = 'city-drive-v2';
var PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './favicon-32.png',
  './favicon-16.png',
  './assets/image/icon-72.png',
  './assets/image/icon-96.png',
  './assets/image/icon-128.png',
  './assets/image/icon-144.png',
  './assets/image/icon-152.png',
  './assets/image/icon-192.png',
  './assets/image/icon-384.png',
  './assets/image/icon-512.png',
  './assets/voice/cs01_narration_prison.mp3',
  './assets/voice/cs02_narration_accused.mp3',
  './assets/voice/cs03_narration_free.mp3',
  './assets/voice/cs04_viktor_recognize.mp3',
  './assets/voice/cs05_viktor_cops.mp3',
  './assets/voice/cs06_viktor_city.mp3',
  './assets/voice/cs07_viktor_car.mp3',
  './assets/voice/cs08_viktor_earn.mp3',
  './assets/voice/cs09_narration_revenge.mp3'
];

// Install — precache all assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate — clean old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch — cache first, then network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        // Cache new successful requests
        if (response && response.status === 200 && response.type === 'basic') {
          var responseToCache = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(function() {
        // Offline fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});