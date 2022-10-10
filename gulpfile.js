const gulp = require('gulp')
const { parallel, series } = require('gulp')

const watch = require('gulp-watch')
const sass = require('gulp-sass')(require('sass'))
const	pug = require('gulp-pug')
const	browserSync = require('browser-sync')
const	svgSprite = require('gulp-svg-sprite')

/* Complete SASS */
function styles() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error' , sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream: true}))
}

/* Pug(Jade) */
function pug2html() {
  return gulp.src('src/**/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}))
}

/* JavaScript&jQuery */
function scripts() {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}))
}

/* SVG sprite */
function spriteSVG() {
  return gulp.src('src/images/sprite/*.svg') // svg files for sprite
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: "../sprite.svg"  //sprite file name
            }
        },
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream: true}))
}

/* Browser-sync */
function browser() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    notify: false
  })
}

function watching() {
	watch('src/scss/*.scss' , styles);
	watch('src/*.pug' , pug2html);
	watch('src/js/*.js' , scripts);
	watch('src/images/sprite/*.svg' , spriteSVG);
}

exports.watch = parallel(watching , browser , pug2html , styles , spriteSVG , scripts);

exports.build = series(
  parallel(pug2html , styles , spriteSVG , scripts)
);
