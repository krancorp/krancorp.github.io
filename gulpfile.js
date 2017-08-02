'use strict';

const gulp        = require('gulp')
const gutil       = require('gulp-util')
const pug         = require('gulp-pug')
const sass        = require('gulp-sass')
const ghPages     = require('gulp-gh-pages')
const browserSync = require('browser-sync').create()
const babel       = require('gulp-babel')

const PATH = {
  npm: './node_modules',
  assets: './src/assets',
  dist: './dist',
  src: './src'
}

const GLOB = {
  publish: PATH.dist + '/**/*',
  pug: PATH.src + '/**/!(_)*.pug',
  pugWatch: PATH.src + '/**/*.pug',
  sass: PATH.assets + '/sass/style.scss',
  sassWatch: PATH.assets + '/sass/**/*.scss',
  js: PATH.assets + '/js/**/*.js',
  copy: ['./src/CNAME', './src/**/*.?(png|ico|js|svg)']
}

const DEST = {
  sass: PATH.dist + '/assets/css',
  libs: PATH.dist + '/assets/libs'
}

const LIBS = [
  'jquery/dist/jquery.min.js',
  'two.js/build/two.min.js'
]

gulp.task('default', ['build'])

gulp.task('watch', ['build'], () => {

  browserSync.init({
    server: './dist'
  })

  gulp.watch(GLOB.sassWatch, ['sass'])
  gulp.watch(GLOB.pugWatch, ['pug']).on('change', browserSync.reload)
  gulp.watch(GLOB.js, ['js']).on('change', browserSync.reload)
})

gulp.task('build', ['pug', 'sass', 'copy'])

gulp.task('publish', ['build'], () => {
	return gulp.src(GLOB.publish)
		.pipe(ghPages({branch: 'master', force: true}))
})

gulp.task('pug', () => {
	return gulp.src(GLOB.pug, {base: PATH.src})
		.pipe(pug())
    .on('error', gutil.log)
		.pipe(gulp.dest(PATH.dist))
})

gulp.task('sass', () => {
	return gulp.src(GLOB.sass)
		.pipe(sass())
    .on('error', gutil.log)
		.pipe(gulp.dest(DEST.sass))
    .pipe(browserSync.stream())
})

gulp.task('js', () => {
  return gulp.src(GLOB.js, {base: PATH.src})
    .pipe(babel())
    .on('error', gutil.log)
    .pipe(gulp.dest(PATH.dist))
})

gulp.task('copy', ['copyLibs'], () => {
  gulp.src('.gitignore').pipe(gulp.dest(PATH.dist))
  return gulp.src(GLOB.copy, {base: PATH.src})
    .pipe(gulp.dest(PATH.dist))
})

gulp.task('copyLibs', () => {
  return gulp.src(LIBS.map(l => PATH.npm + '/' + l))
    .pipe(gulp.dest(DEST.libs))
})
