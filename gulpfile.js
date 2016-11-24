'use strict';

const gulp = require('gulp')
const pug  = require('gulp-pug')
const sass = require('gulp-sass')

gulp.task('default', ['pug'])

gulp.task('pug', () => {
	return gulp.src('src/**/*.pug', {base: './'})
		.pipe(pug())
		.pipe(gulp.dest('./dist'))
})