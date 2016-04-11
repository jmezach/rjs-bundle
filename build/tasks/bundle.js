var gulp = require('gulp');
var glob = require("glob");
var rjs = require("requirejs");
var runSequence = require('run-sequence');

var configBase = {
  mainConfigFile: './config.js'
};

gulp.task('bundle-aurelia', done => {
  var config = {
    name: 'aurelia-manifest',
    out: 'bundles/aurelia.js',
    rawText: {
      'aurelia-manifest': `
        define([
          "aurelia-binding",
          "aurelia-bootstrapper",
          "aurelia-dependency-injection",
          "aurelia-event-aggregator",
          "aurelia-framework",
          "aurelia-http-client",
          "aurelia-history",
          "aurelia-history-browser",
          "aurelia-loader",
          "aurelia-loader-default",
          "aurelia-logging",
          "aurelia-logging-console",
          "aurelia-metadata",
          "aurelia-pal",
          "aurelia-pal-browser",
          "aurelia-path",
          "aurelia-polyfills",
          "aurelia-router",
          "aurelia-route-recognizer",
          "aurelia-task-queue",
          "aurelia-templating",
          "aurelia-templating-binding",

          "aurelia-templating-router",
          "aurelia-templating-resources"
        ], function() {});`
    },
    optimize: 'none'
  };

  Object.assign(config, configBase);
  rjs.optimize(config, () => done());
});

function unbundle(name, done) {
  var config = {
    name: name + '-manifest',
    out: 'bundles/' + name + '.js',
    rawText: {},
    optimize: 'none'
  };
  config.rawText[name + '-manifest'] = 'define([], function() {});';

  Object.assign(config, configBase);
  rjs.optimize(config, () => done());
}

gulp.task('unbundle-aurelia', done => {
   unbundle('aurelia', done);
});

gulp.task('bundle', ['bundle-aurelia']);
gulp.task('unbundle', ['unbundle-aurelia']);
