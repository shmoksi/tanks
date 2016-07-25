const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const concat = require('gulp-concat');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const templateCache = require('gulp-angular-templatecache');
const lint = require('gulp-eslint');
const Server = require('karma').Server;

const pathDist = 'public/';
const pathClient = 'src/client/';

gulp.task('fonts', () => {
  return gulp.src( pathClient + 'fonts/*')
    .pipe(gulp.dest( pathDist + 'fonts'));
});

gulp.task( 'sass', () => {
    gulp.src(  pathClient + 'scss/*.scss' )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( gulp.dest( pathDist ) );
});

gulp.task('images', () => {
     return gulp.src( pathClient + 'images/*')
         .pipe(gulp.dest( pathDist + 'images'));
});

gulp.task('template', () => {
    return gulp.src('**/*.html', { cwd:  pathClient + 'modules' })
        .pipe(templateCache({
            module: 'tanks',
            standalone: false,
            moduleSystem: 'IIFE'
        }))
        .pipe(rename('main-partials.js'))
        .pipe(gulp.dest(pathDist));
});

gulp.task('lintJS', function () {
    return gulp.src( './src/client/**/*.js')
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('test', ['js'], function (done) {
    new Server({
        configFile:__dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


gulp.task('js', () => {
    return browserify({ entries: __dirname + '/' + pathClient + 'app.js', debug: true })
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(__dirname + '/public/'))
});

gulp.task('build', ['js', 'fonts', 'sass', 'images', 'template'], () => {
    return gulp.src(__dirname + '/src/client/index.html')
        .pipe(inject(
            gulp.src(['main.js', 'main-partials.js', 'main.css'], { read: false, cwd: pathDist }), {
                relative: true,
                ignorePath: '../../',
                addRootSlash: true
             }
        ))
        .pipe(gulp.dest(pathDist));
});

gulp.task('default', ['build']);


gulp.task('watch', () => {
    gulp.watch( pathClient + 'modules/**/*.js', ['js']);
    gulp.watch( pathClient + 'modules/**/*.html', ['template'] );
    gulp.watch( pathClient + 'scss/**/*.scss', ['sass'] );
    gulp.watch( pathClient + 'models/*.js', ['js'] );
});
