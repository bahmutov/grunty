#!/usr/bin/env node

require('lazy-ass');
var check = require('check-more-types');

var join = require('path').join;
var fromThis = join.bind(null, __dirname);
var pkg = require(fromThis('../package.json'));
console.log('%s@%s - %s\n  %s %s\n  cwd %s',
  pkg.name, pkg.version,
  pkg.description,
  pkg.author, pkg.homepage,
  process.cwd());

var resolve = require('path').resolve;

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

var grunt = require('grunt');
// console.log(grunt.task.registerTask.toString());
Object.keys(grunt.cli.options).forEach(function (key) {
  var str = grunt.cli.options[key];
  if (check.unemptyString(str)) {
    var split = str.split(',');
    if (split.length > 1) {
      grunt.cli.options[key] = split;
    }
  }
});

var fakeGruntfileFunc = require('../src/fake-gruntfile-code')({
  task: 'grunt-contrib-concat',
  src: grunt.cli.options.src,
  dest: 'test/out.js'
});
la(check.fn(fakeGruntfileFunc), 'expected fake gruntfile function', fakeGruntfileFunc);
la(fakeGruntfileFunc.length === 1,
  'fake gruntfile function should expect 1 argument', fakeGruntfileFunc.toString());
require.cache[resolved] = {
  id: resolved,
  exports: fakeGruntfileFunc,
  parent: null,
  filename: resolved,
  loaded: true
};

// process.exit(0);
var _exists = grunt.file.exists;
grunt.file.exists = function mockExists(filename) {
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
  verbose: Boolean(grunt.cli.options.verbose),
  gruntfile: fakeGruntfile
};

grunt.tasks(['concat'], options, done);
// console.log(grunt.file);
// grunt.cli();
