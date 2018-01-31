importScripts('workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "index.html",
    "revision": "7172156909b27134b8e83e577552b040"
  },
  {
    "url": "scripts/console.js",
    "revision": "269844819f9163e17885771afa119131"
  },
  {
    "url": "scripts/material.min.js",
    "revision": "713af0c6ce93dbbce2f00bf0a98d0541"
  },
  {
    "url": "service-worker.js",
    "revision": "42bdee087d5f8587a4fcb8bbd4087614"
  },
  {
    "url": "console.html",
    "revision": "0fd43ea2377657b3b3656f71d24f63c5"
  },
  {
    "url": "css/main.css",
    "revision": "7e45526b624c7abfdb28f914d7d1ec26"
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
