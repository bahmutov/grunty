#!/usr/bin/env node


console.log('grunty in', process.cwd());
var resolve = require('path').resolve;
var join = require('path').join;
var fromThis = join.bind(null, __dirname);

/*
var pkg = require('../package');
var packageResolved = resolve(fromThis('../package.json'));
console.log('require cache has for package', packageResolved);
console.log(require.cache[packageResolved]);
*/

var fakeGruntfile = 'fake-gruntfile.js';
var resolved = resolve(fakeGruntfile);

// put fake stuff into the Require cache
var Module = require('module');
var _resolveFilename = Module._resolveFilename;
console.assert(typeof _resolveFilename === 'function');
Module._resolveFilename = function fakeResolveFilename(request, parent) {
  if (request === resolved) {
    return resolved;
  } else {
    return _resolveFilename(request, parent);
  }
};

console.log('putting fake function into', resolved);
require.cache[resolved] = {
  id: resolved,
  exports: function fakeGruntfile(grunt) {
    console.log('inside fake gruntfile');

    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
      pkg: pkg,
      concat: {
        all: {
          // TODO replace with actual command line values
          src: ['test/a.js', 'test/b.js'],
          dest: 'test/out.js'
        }
      }
    });
    grunt.task.loadNpmTasks('grunt-contrib-concat');
  },
  parent: null,
  filename: resolved,
  loaded: true
};

var grunt = require('grunt');

// console.log(grunt.task.registerTask.toString());

var _exists = grunt.file.exists;
grunt.file.exists = function mockExists(filename) {
  console.log('mock exists', filename);
  if (filename === fakeGruntfile) {
    return true;
  } else {
    return _exists(filename)
  }
};

// console.log('grunt.tasks', grunt.tasks);

function done() {
  console.log('grunt is done');
}

var options = {
  version: false,
  verbose: true,
  gruntfile: fakeGruntfile
};

grunt.tasks(['concat'], options, done);
// console.log(grunt.file);
// grunt.cli();
