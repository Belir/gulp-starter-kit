var gulp            = require('gulp')
    gulpLoadPlugins = require('gulp-load-plugins')
    plugin          = gulpLoadPlugins();

var warn = function(err) { console.warn(err); };

var paths           = {
  public:  './public/',
  src: './source/'
}


gulp.task('default', [
  'clean', 'build', 'watch', 'server'
]);

gulp.task('build', [
  'slim', 'sass', 'coffee', 'images', 'fonts'
]);

gulp.task('watch', function(){
  return gulp.watch(paths.src + "**/*", ["build"]);
});

gulp.task('server', function(){
  // plugin.connect.server({
  //   root: 'public',
  //   port: '8888'
  // })
});

gulp.task('clean', function(){
  return gulp.src(paths.public, {read: false})
    .pipe(plugin.clean({force: true}));
});

// =============
// precompilers & file movers
// =============

gulp.task('slim', function(){
  return gulp.src(paths.src + '**.slim')
    .pipe(plugin.slim({pretty: true}).on('error', warn))
    .pipe(gulp.dest(paths.public))
});

gulp.task('sass', function(){
  return plugin.rubySass(paths.src + 'stylesheets/style.sass')
    .on('error', plugin.rubySass.logError)
    .pipe(gulp.dest(paths.public + '/'))
});

gulp.task('coffee', function(){
  return gulp.src(paths.src + '**/*.{coffee}')
    .pipe(plugin.coffee().on('error', warn))
    .pipe(gulp.dest(paths.public + 'javascript/'))
});

gulp.task('images', function(){
  return gulp.src(paths.src + '**/*.{png,jpg,jpeg}')
    .pipe(gulp.dest(paths.public + '/'))
});

gulp.task('fonts', function(){
  return gulp.src(paths.src + '**.{eot,ttf,woff}')
    .pipe(gulp.dest(paths.public + 'fonts/'))
});
