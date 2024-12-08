/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope &
  typeof globalThis & { skipWaiting: () => void };

self.skipWaiting();
clientsClaim();

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Custom offline HTML path
const OFFLINE_HTML = 'index.html';
const CACHE_NAME = 'offline-cache';

// Cache the offline page on install
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(OFFLINE_HTML);
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try network first
          return await fetch(event.request);
        } catch (error) {
          // If network fails, serve offline page
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_HTML);
          return (
            cachedResponse ||
            new Response('Offline page not available', {
              status: 404,
              headers: { 'Content-Type': 'text/html' },
            })
          );
        }
      })()
    );
  }

  // Handle other requests (assets, API calls, etc.)
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);
        // Only cache if it's a GET request and has a supported scheme
        if (
          event.request.method === 'GET' &&
          (event.request.url.startsWith('http') ||
            event.request.url.startsWith('https'))
        ) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, response.clone());
        }
        return response;
      } catch (error) {
        const cachedResponse = await caches.match(event.request);
        return (
          cachedResponse ||
          new Response('Resource not available offline', {
            status: 404,
            headers: { 'Content-Type': 'text/plain' },
          })
        );
      }
    })()
  );
});

// Clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
