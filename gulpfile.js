'use strict'
const gulp = require('gulp')
const connect = require('gulp-connect')
const riot = require('gulp-riot')
const babel = require('gulp-babel')

const PATH = {
  src: 'src',
  build: 'build',
  components: 'src/components/*.tag',
  componentsBuild: 'build/components',
  assets: 'src/assets/**/**',
  assetsBuild: 'build/assets',
  index: 'src/*.html',
  core: 'src/core/**/*.js',
  coreBuild: 'build/core'
}

gulp.task('webserver', () => {
  connect.server({
    root: PATH.build
  })
})

gulp.task('riot', () => {
  gulp.src(PATH.components)
    .pipe(riot())
    .pipe(gulp.dest(PATH.componentsBuild))
})

gulp.task('copyAssets', () => {
  gulp.src(PATH.assets)
    .pipe(gulp.dest(PATH.assetsBuild))
})

gulp.task('core', () => {
  gulp.src(PATH.core)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(PATH.coreBuild))
})

gulp.task('copyIndex', () => {
  gulp.src(PATH.index)
    .pipe(gulp.dest(PATH.build))
})

gulp.task('default', ['webserver', 'riot', 'core', 'copyAssets', 'copyIndex'])
