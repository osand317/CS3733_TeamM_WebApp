importScripts('workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "index.html",
    "revision": "aed34b4260661859d58b58738dec1d35"
  },
  {
    "url": "scripts/material.min.js",
    "revision": "713af0c6ce93dbbce2f00bf0a98d0541"
  },
  {
    "url": "scripts/search.js",
    "revision": "4dda48bef60df5c2318bdc442b4c9193"
  },
  {
    "url": "service-worker.js",
    "revision": "42bdee087d5f8587a4fcb8bbd4087614"
  },
  {
    "url": "search.html",
    "revision": "358ea90c82b4bf2b0c4ce29984cd2cd6"
  },
  {
    "url": "css/main.css",
    "revision": "3a78f101efdbf4c896cef53c323c7bb7"
  },
  {
    "url": "css/material.min.css",
    "revision": "9ab85b48144d24908b4e455c2afb648c"
  }
]);

workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

workboxSW.router.registerRoute('https://code.getmdl.io/(.*)',
    workboxSW.strategies.cacheFirst({
        cacheName: 'mdl',
        cacheExpiration: {
            maxEntries: 20
        },
        cacheableResponse: {statuses: [0, 200]}
    })
);

// // We want no more than 50 images in the cache. We check using a cache first strategy
// workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
//   workboxSW.strategies.cacheFirst({
//     cacheName: 'images-cache',
//     cacheExpiration: {
//       maxEntries: 50
//     }
//   })
// );
