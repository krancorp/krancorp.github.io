'use strict';

const gulp = require('gulp')
const pug  = require('gulp-pug')
const sass = require('gulp-sass')
const ghPages = require('gulp-gh-pages')

gulp.task('default', ['build'])

gulp.task('build', ['pug'])

gulp.task('publish', ['build'], () => {
	return gulp.src('./dist/**/*')
		.pipe(ghPages({branch: 'master'}))
})

gulp.task('pug', () => {
	return gulp.src('./src/**/*.pug', {base: './src'})
		.pipe(pug())
		.pipe(gulp.dest('./dist'))
})