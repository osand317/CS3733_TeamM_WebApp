importScripts('workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "index.html",
    "revision": "fa7a9f1fe8c6ce815deb367a4db607f6"
  },
  {
    "url": "scripts/admin.js",
    "revision": "7e76253dd3d0021d602c0ed5e09f68ca"
  },
  {
    "url": "scripts/app.js",
    "revision": "9212f605c7535af2f7dedc383f56e5c6"
  },
  {
    "url": "scripts/console.js",
    "revision": "e0d19ce415ec0bdb43d87ebd10221d8a"
  },
  {
    "url": "scripts/createFarmer.js",
    "revision": "6e416b7e39d4138919f3298ed8e4ebc4"
  },
  {
    "url": "scripts/createInspector.js",
    "revision": "d70fb7bde73ad7b13c54c5bd318ffece"
  },
  {
    "url": "scripts/database.js",
    "revision": "eae7cbdd822162bcc54ba012e46efcc6"
  },
  {
    "url": "scripts/export.js",
    "revision": "ac2b2b1dc889bd54e667df426bc6270a"
  },
  {
    "url": "scripts/header.js",
    "revision": "a2c1e3c426285c14ac222635290fafbd"
  },
  {
    "url": "scripts/login.js",
    "revision": "3cb8cad8b6f22c3074382b9371078e80"
  },
  {
    "url": "scripts/material.min.js",
    "revision": "e68511951f1285c5cbf4aa510e8a2faf"
  },
  {
    "url": "scripts/profileSelection.js",
    "revision": "5ad6cf31224bff9ffad1da284aa0d6e1"
  },
  {
    "url": "scripts/profileView.js",
    "revision": "24dfa4781769c1575af7ea5c2d7eecbe"
  },
  {
    "url": "service-worker.js",
    "revision": "c256a1af9fed03d76d25e93d25833ea8"
  },
  {
    "url": "assignFarmer.html",
    "revision": "11ffad418c059dee3a317687fecb51f9"
  },
  {
    "url": "console.html",
    "revision": "5973ecbed7354dcbfcb25f81b1f809b5"
  },
  {
    "url": "employeeAccountCreation.html",
    "revision": "9d64270ae84f890a3f5c03a71b8997e2"
  },
  {
    "url": "farmerAccountCreation.html",
    "revision": "a1c77d5e457be214e7a3243ce00547c3"
  },
  {
    "url": "inspectorAccountCreation.html",
    "revision": "608c6080c818e4277c85fb6803d93c3b"
  },
  {
    "url": "login.html",
    "revision": "5a9da506f285e9474d2e1e6b4b48b1c0"
  },
  {
    "url": "profileCreation.html",
    "revision": "0f1aac4b29d71ef5105d9441cbe3ded5"
  },
  {
    "url": "profileView.html",
    "revision": "e39fdb84b140c00bbadd2b6cee7b3562"
  },
  {
    "url": "css/Login_style.css",
    "revision": "0a3fedbad032d8e4d2e37a2969fa2a45"
  },
  {
    "url": "css/main.css",
    "revision": "dec2eed382307a2c86d3fcdd54ed87df"
  },
  {
    "url": "css/material.min.css",
    "revision": "a09f24c85cb39ef5db425b71c8c98c4a"
  },
  {
    "url": "css/profile.css",
    "revision": "2272b3be1c2f7966b1bb1ff8eb5ee342"
  },
  {
    "url": "css/styles.css",
    "revision": "bd1b351f79d328d298a59519d0dac078"
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
