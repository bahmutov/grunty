require('lazy-ass');
var check = require('check-more-types');

function isValidSource(x) {
  return check.unemptyString(x) ||
    check.array(x);
}

var optionsSchema = {
  task: check.unemptyString,
  src: isValidSource,
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
  }

  return fakeGruntfile;
};
