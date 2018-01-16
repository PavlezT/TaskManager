var gulp = require('gulp');
var watch = require('gulp-watch');
var changed = require('gulp-changed');

gulp.task('watch', function () {
    return watch(['./Client/dist/**/*.js','./Client/dist/**/*.js.map'])
    .pipe(changed('./Client/dist/**'))
    .pipe(gulp.dest('./Server/src'))
});