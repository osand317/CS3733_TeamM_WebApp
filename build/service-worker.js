importScripts('workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "index.html",
    "revision": "35905b700d8ce4187fdb7051e8b93896"
  },
  {
    "url": "scripts/app.js",
    "revision": "2bb4ce2bffb1c6735fea7d6196bb5703"
  },
  {
    "url": "scripts/console.js",
    "revision": "70684604a4720637ac4ad08188224c36"
  },
  {
    "url": "scripts/export.js",
    "revision": "089b1714b8d6f9a59e996d7e04d907b8"
  },
  {
    "url": "scripts/header.js",
    "revision": "039e2b82d34ee506511146f2a9a62975"
  },
  {
    "url": "scripts/login.js",
    "revision": "4e688e473ffbb05e2686c1d8169ca00b"
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
    "revision": "863a948e9bec5656d4d56fefdc3e1a79"
  },
  {
    "url": "console.html",
    "revision": "c43d0adf2b1f7bb5a0c3d818e121dc7b"
  },
  {
    "url": "login.html",
    "revision": "49bf1f2b796057eb35680f3c605a34e8"
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
