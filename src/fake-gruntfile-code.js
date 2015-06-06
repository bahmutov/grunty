require('lazy-ass');
var check = require('check-more-types');

var optionsSchema = {
  task: check.unemptyString,
  src: check.defined,
  dest: check.unemptyString
};
var isValidOptions = check.schema.bind(null, optionsSchema);

module.exports = function fakeGruntfileInit(options) {
  la(check.object(options), 'missing grunty options', options);
  la(isValidOptions(options), 'invalid options', options);

  function fakeGruntfile(grunt) {
    console.log('inside fake gruntfile');

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
      pkg: pkg,
      concat: {
        default: options
      }
    });
    grunt.task.loadNpmTasks(options.task);
    grunt.registerTask('default', []);

    console.log(grunt.option.flags())
  }

  return fakeGruntfile;
};
