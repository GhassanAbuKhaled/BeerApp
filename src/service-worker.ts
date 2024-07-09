// src/service-worker.ts

/// <reference lib="webworker" />
import { precacheAndRoute, PrecacheEntry } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

// Precache files
precacheAndRoute(self.__WB_MANIFEST as unknown as PrecacheEntry[]);

// Your custom cache strategies and event listeners

const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache: string[] = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/app.js'
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache: Cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames: string[]) => {
      return Promise.all(
        cacheNames.map((cacheName: string) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request)
      .then((response: Response | undefined) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
