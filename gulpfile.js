var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

var paths = {
    styles: {
        src: './view/scss',
        files: './view/scss/**/*.scss', //all subfolders
        dest: './view/css',
        buildDest: './build/view/css'
    },
    html: {
        files: './view/html/**/*.html', //all subfolders
        buildDest: './build/view/html'
    },
    img: {
        files: './view/img/**/*',
        buildDest: './build/view/img'
    },
    indexHtml: {
        files: './index.html', //all subfolders
        buildDest: './build'
    },
    systemJs: {
        files: './systemjs.config.js', //all subfolders
        buildDest: './build'
    },
    i18n: {
        files: './view/i18n/**/*.json',
        buildDest: './build/view/i18n'
    }
};
///////

// Sass configuration
//deletes old css before generating new 
gulp.task('cleanCss', function() {
    return del([
        paths.styles.dest,
        paths.styles.buildDest
    ]);
});
gulp.task('refreshCss', /*['cleanCss'],*/ function() { //this function will be the CB for cleanCss    
    gulp.src(paths.styles.files)
        .pipe(sass({
            //stablish the folder
            includePaths: [paths.styles.src]
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(gulp.dest(paths.styles.buildDest)); //for build
});
/////////

//Html configuration for build
//deletes old html before generating new 
gulp.task('cleanHtml', function() {
    return del(paths.html.buildDest);
});
gulp.task('htmlToBuild', /*['cleanHtml'],*/ function() {
    gulp.src(paths.html.files)
        .pipe(gulp.dest(paths.html.buildDest));
});
///////

//index Html configuration for build
gulp.task('indexHtmlToBuild', function() {
    gulp.src(paths.indexHtml.files)
        .pipe(gulp.dest(paths.indexHtml.buildDest));
});
//////

//systemjs config for build
gulp.task('systemJsToBuild', function() {
    gulp.src(paths.systemJs.files)
        .pipe(gulp.dest(paths.systemJs.buildDest));
});
/////////////////////////////////////////////////////////
//img
gulp.task('imgToBuild', function() {
    gulp.src(paths.img.files)
        .pipe(gulp.dest(paths.img.buildDest));
});
////////////
//i18n
gulp.task('i18nToBuild', function() {
    gulp.src(paths.i18n.files)
        .pipe(gulp.dest(paths.i18n.buildDest));
});
///////

gulp.task('default', ['refreshCss', 'htmlToBuild', 'indexHtmlToBuild', 'systemJsToBuild', 'imgToBuild', 'i18nToBuild'], function() { //can have a callback function    
    gulp.watch(paths.styles.files, ['refreshCss']); //when file in styles folder change, trigger runs
    gulp.watch(paths.html.files, ['htmlToBuild']);
    gulp.watch(paths.indexHtml.files, ['indexHtmlToBuild']);
    gulp.watch(paths.systemJs.files, ['systemJsToBuild']);
    gulp.watch(paths.img.files, ['imgToBuild']);
    gulp.watch(paths.i18n.files, ['i18nToBuild']);
    //takes too much time for node modules (remember to copy node modules)
});