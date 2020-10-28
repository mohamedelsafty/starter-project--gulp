// //Connect the gulp modules
// const gulp = require('gulp');
// const concat = require('gulp-concat');
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');
// const del = require('del');
// const browserSync = require('browser-sync').create();

// const sourcemaps = require('gulp-sourcemaps');
// const sass = require('gulp-sass');

// // Connection order of the sass/scss-files
// const cssFiles = [
//    './src/css/main.scss',
//    './src/css/another.scss'
// ];

// //Connection order of the js files
// const jsFiles = [
//    './src/js/lib.js',
//    './src/js/main.js'
// ];

// //Task for CSS styles
// function styles() {
//    return gulp.src(cssFiles)
//    .pipe(sourcemaps.init())
//    .pipe(sass())
//    //Merge files into one
//    .pipe(concat('style.css'))
//    //Add prefixes
//    .pipe(autoprefixer())
//    //CSS minification
//    .pipe(cleanCSS({
//       level: 2
//    }))
//    .pipe(sourcemaps.write('./'))
//    //Output folder for styles
//    .pipe(gulp.dest('./build/css'))
//    .pipe(browserSync.stream());
// }

// //Task for JS scripts
// function scripts() {
//    return gulp.src(jsFiles)
//    //Merge files into one
//    .pipe(concat('script.js'))
//    //JS minification
//    .pipe(uglify({
//       toplevel: true
//    }))
//    //Output folder for scripts
//    .pipe(gulp.dest('./build/js'))
//    .pipe(browserSync.stream());
// }

// //Delete all files from specified folder
// function clean() {
//    return del(['build/*'])
// }

// //Watch files
// function watch() {
//    browserSync.init({
//       server: {
//           baseDir: "./"
//       }
//   });
//   //Watch CSS files
//   gulp.watch('./src/css/**/*.css', styles);
//   gulp.watch('./src/css/**/*.sass', styles);
//   gulp.watch('./src/css/**/*.scss', styles);
//   //Watch JS files
//   gulp.watch('./src/js/**/*.js', scripts);
//   //Start synchronization after HTML changing
//   gulp.watch("./*.html").on('change', browserSync.reload);
// }

// //Task calling 'styles' function
// gulp.task('styles', styles);
// //Task calling 'scripts' function
// gulp.task('scripts', scripts);
// //Task for cleaning the 'build' folder
// gulp.task('del', clean);
// //Task for changes tracking
// gulp.task('watch', watch);
// //Task for cleaning the 'build' folder and running 'styles' and 'scripts' functions
// gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)));
// //Task launches build and watch task sequentially
// gulp.task('dev', gulp.series('build','watch'));
// //Default task
// gulp.task('default', gulp.series('build','watch'));

//Connect the gulp modules
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

// Connection order of the sass/scss-files
const cssFiles = [
   './src/scss/main.scss',
];

const srcPath = "./src/";
const distPath = "./dist/";

//Connection order of the js files
const jsFiles = [
   './src/js/lib.js',
   './src/js/main.js'
];

//Task for CSS styles
function styles() {
   return gulp.src(srcPath + "scss/**/*.scss")
   .pipe(sourcemaps.init())
   .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
   //Merge files into one
   .pipe(concat('style.css'))
   //Add prefixes
   .pipe(autoprefixer({
      browsers: ["last 2 versions"],
      cascade: false
    }))
   //CSS minification
   .pipe(cleanCSS({
      level: 2
   }))
   .pipe(sourcemaps.write('./maps/'))
   //Output folder for styles
   .pipe(gulp.dest(distPath + '/css'))
   .pipe(browserSync.stream());
   
}

//Task for JS scripts
function scripts() {
   return gulp.src(jsFiles)
   //Merge files into one
   .pipe(concat('script.js'))
   //JS minification
   .pipe(uglify({
      toplevel: true
   }))
   //Output folder for scripts
   .pipe(gulp.dest(distPath +'js'))
   .pipe(browserSync.stream());
}

//Delete all files from specified folder
function clean() {
   return del(['dist/*'])
}

gulp.task('minify', () => {
   return gulp.src('./src/*.html')
     .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest('./dist/'));
 });


//Watch files
function watch() {
   browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  //Watch CSS files
  gulp.watch(srcPath +'scss/**/*.css', styles);
  gulp.watch(srcPath +'scss/**/*.sass', styles);
  gulp.watch(srcPath + 'scss/**/*.scss', styles);
  //Watch JS files
  gulp.watch(srcPath +'js/**/*.js', scripts);
  //Start synchronization after HTML changing
  gulp.watch("./*.html").on('change', browserSync.reload);
}

//Task calling 'styles' function
gulp.task('styles', styles);
//Task calling 'scripts' function
gulp.task('scripts', scripts);
//Task for cleaning the 'build' folder
gulp.task('del', clean);
//Task for changes tracking
gulp.task('watch', watch);
//Task for cleaning the 'build' folder and running 'styles' and 'scripts' functions
gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)));
//Task launches build and watch task sequentially
gulp.task('dev', gulp.series('build','watch'));
//Default task
gulp.task('default', gulp.series('build','watch'));