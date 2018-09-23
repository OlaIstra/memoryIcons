'use strict';

const gulp = require('gulp'),
	  htmlmin = require('gulp-htmlmin'),
	  uglify = require('gulp-uglify'),
	  babel = require('gulp-babel'),
	  cleanCSS = require('gulp-clean-css');

let path = {    
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/'
    },
    app: { 
        html: 'app/*.html', 
        js: 'app/js/main.js',
        css: 'app/css/main.css'
    },    
};	  

gulp.task('html:build', function () {
    gulp.src(path.app.html) 
    	.pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(path.dist.html)) 
});

gulp.task('js:build', function () {
    return gulp.src(path.app.js)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('css:build', function () {
    return gulp.src(path.app.css) 
    	.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.dist.css)) 
});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build'
]);

gulp.task('default', ['build']);
