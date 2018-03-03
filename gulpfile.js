const gulp = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');
const wbBuild = require('workbox-build');

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'build/*', '!build/.git'], {dot: true}));

// Copy app directory to build directory
gulp.task('copy', () =>
  gulp.src([
    'app/**/*',
    'node_modules/workbox-sw/build/importScripts/workbox-sw.prod*.js'
  ]).pipe(gulp.dest('build'))
);

// Update service-worker.js to cache anything matching globfiles
gulp.task('bundle-sw', () => {
  return wbBuild.injectManifest({
    swSrc: 'app/service-worker.js',
    swDest: 'build/service-worker.js',
    globDirectory: 'app',
    staticFileGlobs: [
        'index.html',
        '**/*.js',
        '**/*.html',
        '**/*.css',
        'images/*'
    ]
  })
  .catch((err) => {
    console.log('[ERROR] This happened: ' + err);
  });
});

gulp.task('default', ['clean'], cb => {
  runSequence(
    'copy',
    'bundle-sw',
    cb
  );
});

// Uses BrowserSync package to serve the app locally
gulp.task('serve', ['default'], () => {
  browserSync.init({
    server: 'build',
    port: 8002
  });
  gulp.watch('app/*', ['default']).on('change', browserSync.reload);
});
