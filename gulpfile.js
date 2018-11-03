const gulp = require('gulp'); /* подключаем gulp */
const sass = require('gulp-sass'); /* переводит SASS в CSS */
const image = require('gulp-image'); /*  */
const browserSync = require('browser-sync'); /*  */
const autoprefixer = require ('gulp-autoprefixer'); /* Проставлет вендорные префиксы в CSS для поддержки старых браузеров */


gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
});

gulp.task('image', function () {
    gulp.src('./src/img/**/*.*')
        .pipe(image())
        .pipe(gulp.dest('./build/img'));
});

gulp.task('sass', function () {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe (autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts'))
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './build/'
        },
    })
});


gulp.task('watch', function () {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/styles/*.scss', ['sass']);
    gulp.watch('./src/img/*', ['image']);
    gulp.watch('./src/fonts/*', ['fonts']);
    gulp.watch('build/*.html', browserSync.reload);
    gulp.watch("./build/css/**/*.css").on("change", browserSync.reload);
    gulp.watch('./build/js/**/*.js').on("change", browserSync.reload);
});

gulp.task('default', ['watch', 'html', 'sass', 'image', 'fonts', 'browserSync']);