#!/usr/bin/env node

console.log('grunty in', process.cwd());

var grunt = require('grunt');

// console.log(grunt.task.registerTask.toString());

var _exists = grunt.file.exists;
grunt.file.exists = function mockExists(filename) {
  console.log('mock exists', filename);
  if (filename === 'Gruntfile.js') {
    return true;
  } else {
    return _exists(filename)
  }
};

grunt.task.loadNpmTasks('grunt-contrib-concat');
// console.log('grunt.tasks', grunt.tasks);

function done() {
  console.log('grunt is done');
}

var options = {
  version: true,
  verbose: true
};

grunt.tasks(['concat'], options, done);

// console.log(grunt.file);
// grunt.cli();
