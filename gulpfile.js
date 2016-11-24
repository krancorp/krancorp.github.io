'use strict';

const gulp = require('gulp')
const pug  = require('gulp-pug')
const sass = require('gulp-sass')
const publish = require('gulp-build-branch')

gulp.task('default', ['build'])

gulp.task('build', ['pug'])

gulp.task('publish', ['build'], () => {
	return gulp.src('./dist/**/*')
		.pipe(publish({branch: 'master'}))
})

gulp.task('pug', () => {
	return gulp.src('./src/**/*.pug', {base: './src'})
		.pipe(pug())
		.pipe(gulp.dest('./dist'))
})