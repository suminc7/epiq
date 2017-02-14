var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var webpack = require('gulp-webpack');

var destDir = "./epiqvr-web/epiqvr-top/src/main/resources/static/js/";



/**
 *  상단에 들어가는 lib.js를 빌드 한다.
 */

gulp.task('library', function() {

    var destDir = "./epiqvr-web/epiqvr-top/src/main/resources/static/js/libs";
    return gulp.src('./front/src/library/common/lib.js')
        .pipe(webpack( require('./webpack.config.library.js') ))
        .pipe(gulp.dest(destDir));
});



/**
 * Uglify 가 필요한 library 를 빌드 한다. lib.js 와 상관없음
 */
gulp.task('libUglify', function() {

    var destDir = "./epiqvr-web/epiqvr-top/src/main/resources/static/js/libs";
    [
        './front/src/library/view/videojs-panorama.v5.js',
        './front/src/library/common/naverLogin_implicit-1.0.2.js'
    ].forEach(function (entry, i, entries) {
        gulp.src(entry)
            .pipe(buffer())
            .pipe(uglify())
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest(destDir));
    });

});







gulp.task('admin-sass-all', function () {
	return gulp.src('./front/admin/sass/all.scss')
		.pipe(concat('all.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({debug: false, aggressiveMerging:false, restructuring: false, rebase: false, keepSpecialComments: 0}, function(details) {
			console.log(details.name + ': ' + details.stats.originalSize);
			console.log(details.name + ': ' + details.stats.minifiedSize);
		}))
		.pipe(gulp.dest('./epiqvr-web/epiqvr-admin/src/main/resources/static/css/'));
});


gulp.task('admin-sass-watch', ['admin-sass-all'], function(){
    gulp.watch(['./front/admin/sass/**/*.scss'], ['admin-sass-all']);
});






gulp.task('sass-web', function () {
    return gulp.src('./front/src/sass/all.scss')
        .pipe(concat('all.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('./epiqvr-web/epiqvr-top/src/main/resources/static/css'));
});





/**
 es6 webpack으로 빌드 한다.
 */
gulp.task('webpack-web', function(){

	gulp.watch(['./front/src/sass/**/*.scss'], ['sass-web']);
	return gulp.src("./front/src/script/**/*.js")
		.pipe(webpack( require('./webpack.config.web.js') ))
		.pipe(gulp.dest(destDir));

});



gulp.task('epiqvr-web',['webpack-web']);