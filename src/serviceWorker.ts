/// <reference lib="webworker" />
import { precacheAndRoute, PrecacheEntry } from 'workbox-precaching';
import { getAllFormEntries, deleteFormEntry } from '@/utils/indexedDB';  // Update the path accordingly


declare const self: ServiceWorkerGlobalScope;

/**
 * Precaches resources specified in the service worker manifest using Workbox.
 * @param {PrecacheEntry[]} self.__WB_MANIFEST - Array of resources to precache.
 */
precacheAndRoute(self.__WB_MANIFEST as unknown as PrecacheEntry[]);

const CACHE_NAME = 'BeerApp-v1.0.1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/app.js'
];

// Service worker installation event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

// Service worker activation event
self.addEventListener('activate', (event) => {
  const version = 'v1.0.1.0';
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(c => c.split('-'))
          .filter(c => c[0] === 'cache')
          .filter(c => c[1] !== version)
          .map(c => caches.delete(c.join('-')))
      );
    })
  );
});


self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'syncFormData') {
    event.waitUntil(
      getAllFormEntries()
        .then(async (formDataArray) => {
          await Promise.all(formDataArray.map(async ({ key, data }) => {
            console.log('Current Object Key:', key); // Log the key
            // This is a dummy server endpoint (http://localhost:5000/reviews/save) used for testing purposes.
            try {
              const response = await fetch('http://localhost:5000/reviews/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              });
              if (response.ok) {
                // If submission was successful, delete the form entry from IndexedDB
                await deleteFormEntry(key);
                console.log('Form entry deleted from IndexedDB:', key);
              } else {
                throw new Error('Failed to submit form data');
              }
            } catch (error) {
              console.error('Error submitting form data:', error);
            }
          }));
          return Promise.resolve(true);
        })
        .catch((error) => {
          console.error('Error retrieving or clearing form data:', error);
        })
    );
  }
});
