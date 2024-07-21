/// <reference lib="webworker" />
import { precacheAndRoute, PrecacheEntry } from 'workbox-precaching';
import { getAllFormEntries, deleteFormEntry, getBeerTypesFromIndexedDB } from '@/utils/indexedDB';  // Adjust the path as necessary

declare const self: ServiceWorkerGlobalScope;

/**
 * Precaches resources specified in the service worker manifest using Workbox.
 * @param {PrecacheEntry[]} self.__WB_MANIFEST - Array of resources to precache.
 */
precacheAndRoute(self.__WB_MANIFEST as unknown as PrecacheEntry[]);

// const CACHE_NAME = 'BeerApp-v1.0.1.0';

// Service worker installation event
self.addEventListener('install', (event) => {
  // Ensure that the new service worker activates immediately
  self.skipWaiting();
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

// Sync event for form data submission
self.addEventListener('sync', (event) => {
  if (event.tag === 'syncFormData') {
    event.waitUntil(
      getAllFormEntries()
        .then(async (formDataArray) => {
          await Promise.all(formDataArray.map(async ({ key, data }) => {
            console.log('Current Object Key:', key); // Log the key

            // Check if timestamp is older than one week
            const submissionDate = new Date(data.timestamp);
            const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

            if (submissionDate < oneWeekAgo) {
              console.log('Entry is older than one week. Deleting from IndexedDB:', key);
              await deleteFormEntry(key);
              return; // Skip further processing if older than one week
            }

            if(!data._csrfToken){
              // Get CSRF token
              const csrfToken = await getCsrfToken();
              data._csrfToken = csrfToken;
            }
            // Dummy server endpoint for testing purposes
            try {
              const response = await customFetch('http://localhost:5000/reviews/save', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': data._csrfToken, // Include CSRF token
                },
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

              // If submission failed and entry is older than one week, delete it from IndexedDB
              if (submissionDate < oneWeekAgo) {
                await deleteFormEntry(key);
                console.log('Form entry deleted from IndexedDB due to submission error:', key);
              }
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

// Fetch event to intercept beer types API request
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);  
  // Check if the request is for the beer types API
  if (url.pathname === '/beer/types') {
    event.respondWith(
      getBeerTypesFromIndexedDB().then(beersResponse => {
        if (beersResponse && beersResponse.beers.length > 0) {
          // Return a new Response with the beers data
          return new Response(JSON.stringify(beersResponse), {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          // If no beers found in IndexedDB, proceed with network request
          return customFetch(event.request.url, { headers: event.request.headers });
        }
      }).catch(() => {
        // If there's an error, proceed with network request
        return customFetch(event.request.url, { headers: event.request.headers });
      })
    );
  }
});

// Function to get the CSRF token using Fetch API
const getCsrfToken = async () => {
  try {
    const response = await customFetch('http://localhost:5000/token/csrf-token');
    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }
    const data = await response.json();
    return data.csrfToken; // Adjust this to match the structure of your response
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
}

// Custom fetch function to reuse fetch requests with common configurations
const customFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const defaultOptions: RequestInit = {
    credentials: 'include', // Ensure cookies are sent with the request
    mode: 'cors', // Handle cross-origin requests
    cache: 'default' as RequestCache, // Explicitly cast to RequestCache type
  };

  // Merge default options with provided options
  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, mergedOptions);
    return response;
  } catch (error) {
    console.error('Error with fetch request:', error);
    throw error;
  }
};