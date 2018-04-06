var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglifyJs = require('gulp-uglifyjs'),
    autoPrefix = require('gulp-autoprefixer'),
    imageMin = require('gulp-imagemin'),
    BS = require('browser-sync');

/*
1. gulp.task() - новая задача.
2. gulp.src() - позволяет выбрать файлы для дальнейших преобразований.
3. gulp.dest() - позволяет сохранить уже преобразованные файлы.
4. gulp.watch() - отслеживает изменения в файлах и запускает task.
 */

gulp.task('test', function () {
    console.log('Gulp works!');
});

gulp.task('default', ['test', 'html', 'sass', 'js', 'mywatch', 'server'], function () {
    console.log('Default task!!!');
});

var config = {
    app: './app',
    dist: './dist'
};

gulp.task('html', function () {
    gulp.src([config.app + '/html/index.html'])
        .pipe(gulp.dest(config.dist))
        .pipe(BS.reload({stream: true}));
});

gulp.task('sass', function () {
    gulp.src(config.app + '/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoPrefix())
        .pipe(gulp.dest(config.dist + '/css'))
        .pipe(BS.reload({stream: true}));

});

gulp.task('js', function () {
    gulp.src(config.app + '/js/**/*.js')
        .pipe(uglifyJs())
        .pipe(gulp.dest(config.dist + '/js'))
        .pipe(BS.reload({stream: true}));
});

gulp.task('mywatch', function () {
    gulp.watch(config.app + '/js/**/*.js', ['js']);
    gulp.watch(config.app + '/sass/**/*.sass', ['sass']);
    gulp.watch([config.app + '/html/index.html'], ['html']);
});

//Server
gulp.task('server', function () {
    BS({
        server: {
            baseDir: config.dist
        }
    });
});

//Image
gulp.task('image', function () {
    gulp.src(config.app + '/img1/**/*.jpg')
        .pipe(imageMin({
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(config.dist + '/img'));
});