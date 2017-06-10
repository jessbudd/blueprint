var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');


//Development Tasks

//compiles sass to css and adds sourcemaps
gulp.task('sass', function() {
    return gulp.src('**/*.scss')
        
        //create minified style.css file 
        .pipe(sourcemaps.init())
        .pipe(sass
            ({outputStyle: 'compressed'}))

            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./'))

        //live reload
        .pipe(browserSync.reload({
            stream: true
        }))
});

//browserSync live reload
gulp.task('browserSync', function() {
    browserSync.init({
        proxy: {
            target: "http://www.blueprint.dev", //address of dev site 
        }
    })
});

//watch files
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('**/*.scss', ['sass']);
    gulp.watch('*.php', browserSync.reload);
    gulp.watch('*/*.php', browserSync.reload);
});
