'use strict';

const gulp = require('gulp')
const pug  = require('gulp-pug')
const sass = require('gulp-sass')
const ghPages = require('gulp-gh-pages')

gulp.task('default', ['build'])

gulp.task('build', ['pug', 'sass', 'copy'])

gulp.task('publish', ['build'], () => {
	return gulp.src('./dist/**/*')
		.pipe(ghPages({branch: 'master', force: true}))
})

gulp.task('pug', () => {
	return gulp.src('./src/**/*.pug', {base: './src'})
		.pipe(pug())
		.pipe(gulp.dest('./dist'))
})

gulp.task('sass', () => {
	return gulp.src('./src/assets/css/style.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist/assets/css'))
})

gulp.task('copy', () => {
  return gulp.src(['./src/CNAME', '.gitignore', './src/**/*.?(png|ico)'], {base: './src'})
    .pipe(gulp.dest('./dist'))
})
