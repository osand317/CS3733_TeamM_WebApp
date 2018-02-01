importScripts('workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "index.html",
    "revision": "9b6da10a7064173fbfef1482fd96ac42"
  },
  {
    "url": "scripts/app.js",
    "revision": "272f6425d224a781fbd61bb4c498135e"
  },
  {
    "url": "scripts/console.js",
    "revision": "9c07e87f8ed19a70f47473933ecaa6dd"
  },
  {
    "url": "scripts/export.js",
    "revision": "089b1714b8d6f9a59e996d7e04d907b8"
  },
  {
    "url": "scripts/login.js",
    "revision": "58744592acc55577b7164f0e1e98ab39"
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
    "url": "accountCreation.html",
    "revision": "70fdb66a1ab5173754a6cdcc294b633d"
  },
  {
    "url": "console.html",
    "revision": "99ca4496a36c824280984adc3ac6d2f1"
  },
  {
    "url": "login.html",
    "revision": "b7bfc4ad049d6775bea7aa62e6c76110"
  },
  {
    "url": "css/Login_style.css",
    "revision": "22a390e1a3f9c99fa9763a9000fc6e2e"
  },
  {
    "url": "css/main.css",
    "revision": "a278782305cd0214aeb66f03147e5d63"
  },
  {
    "url": "css/material.min.css",
    "revision": "9ab85b48144d24908b4e455c2afb648c"
  },
  {
    "url": "css/styles.css",
    "revision": "86fa8b61e88ff047414a8a388887f5d8"
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
