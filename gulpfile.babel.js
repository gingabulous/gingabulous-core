// 'use babel';

const gulp   = require('gulp');
const $      = require('gulp-load-plugins')();
const del    = require('del');
const server = require('browser-sync').create();

export function testServer(done) {
  server.init({
    server: {
      baseDir: 'test',
      routes:  {
        '/mocha':      'node_modules/mocha',
        '/chai':       'node_modules/chai',
        '/sinon-chai': 'node_modules/sinon-chai',
        '/sinon':      'node_modules/sinon',
        '/assets':     'build'
      }
    }
  });
  done();
}

export function serverReload(done) {
  server.reload();
  done();
}

export function clean() {
  return del('./build');
}

export function scripts() {
  return gulp.src('./src/*.js')
    // .pipe($.sourcemaps.init())
    .pipe($.babel())
    .on('error', function(e) {
      console.error('\x1b[31m%s\x1b[0m', e.message);
      console.log(e.codeFrame);
      this.emit('end');
    })
    // .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./build'));
}

export function watch() {
  gulp.watch('src/*.js', gulp.series(scripts, serverReload));
  gulp.watch('test/*', serverReload);
}

const build = gulp.series(
  clean,
  scripts,
  testServer,
  watch
);

export {build};

export default build;
