
/// <reference lib="webworker" />
import { precacheAndRoute, PrecacheEntry } from 'workbox-precaching';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync/Queue';

declare const self: ServiceWorkerGlobalScope;
/**
 * Precaches resources specified in the service worker manifest using Workbox.
 * @param {PrecacheEntry[]} self.__WB_MANIFEST - Array of resources to precache.
 */
precacheAndRoute(self.__WB_MANIFEST as unknown as PrecacheEntry[]);

const CACHE_NAME = 'BeerApp';
// URLs to be precached when the service worker installs.
const urlsToCache: string[] = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/app.js'
];

/**
 * Event listener for the install event.
 * Caches specified URLs when the service worker is installed.
 * @param {ExtendableEvent} event - The install event.
 */
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache: Cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

/**
 * Event listener for the activate event.
 * Cleans up outdated caches when the service worker is activated.
 * @param {ExtendableEvent} event - The activate event.
 */
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

/***
 * Background sync queue for handling form submissions.
 * Uses Workbox Queue to manage and retry failed POST requests.
 */
const formSyncQueue = new Queue('formSyncQueue', {
  onSync: async ({ queue }) => {
    let entry;
    while (entry = await queue.shiftRequest()) {
      try {
        const response = await fetch(entry.request);
        // Handle successful response (optional)
      } catch (error) {
        console.error('Error syncing form data:', error);
        await queue.unshiftRequest(entry); // Re-add request to the queue
        throw new Error('Retry later');
      }
    }
  },
});

// Register route for background sync
registerRoute(
  '/reviews/save', // Adjust this URL pattern based on your API endpoint
  new NetworkOnly({
    plugins: [new BackgroundSyncPlugin('formSyncQueue', {
      maxRetentionTime: 24 * 60 // Retry for up to 24 hours
    })]
  }),
  'POST'
);

/**
 * Event listener for the fetch event.
 * Responds with cached resources or fetches from the network as necessary.
 * @param {FetchEvent} event - The fetch event.
 */
self.addEventListener('fetch', (event: FetchEvent) => {
  if (event.request.method === 'POST' && event.request.url.endsWith('/reviews/save')) {
    console.log('worker');
    
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ message: 'Form data saved for later submission.' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
  }
});