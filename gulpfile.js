'use strict';

const gulp        = require('gulp')
const pug         = require('gulp-pug')
const sass        = require('gulp-sass')
const ghPages     = require('gulp-gh-pages')
const browserSync = require('browser-sync').create()

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
  copy: ['./src/CNAME', './src/**/*.?(png|ico|js)']
}

const DEST = {
  sass: PATH.dist + '/assets/css',
  libs: PATH.dist + '/assets/libs'
}

const LIBS = [
  'jquery/dist/jquery.min.js'
]

gulp.task('default', ['build'])

gulp.task('watch', () => {

  browserSync.init({
    server: './dist'
  })

  gulp.watch(GLOB.sassWatch, ['sass'])
  gulp.watch(GLOB.pugWatch, ['pug']).on('change', browserSync.reload)
})

gulp.task('build', ['pug', 'sass', 'copy'])

gulp.task('publish', ['build'], () => {
	return gulp.src(GLOB.publish)
		.pipe(ghPages({branch: 'master', force: true}))
})

gulp.task('pug', () => {
	return gulp.src(GLOB.pug, {base: PATH.src})
		.pipe(pug())
		.pipe(gulp.dest(PATH.dist))
})

gulp.task('sass', () => {
	return gulp.src(GLOB.sass)
		.pipe(sass())
		.pipe(gulp.dest(DEST.sass))
    .pipe(browserSync.stream())
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
