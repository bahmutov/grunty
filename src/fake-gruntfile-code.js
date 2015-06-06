require('lazy-ass');
var check = require('check-more-types');

function isValidSource(x) {
  if (check.not.defined(x)) {
    return true;
  }
  return check.unemptyString(x) ||
    check.array(x);
}

var optionsSchema = {
  plugin: check.unemptyString,
  target: check.maybe.unemptyString,
  src: isValidSource,
  dest: check.maybe.unemptyString
};
var isValidOptions = check.schema.bind(null, optionsSchema);

function isMultiTask(options) {
  return check.object(options) &&
    check.unemptyString(options.target) &&
    check.has(options, 'src') &&
    check.has(options, 'dest');
}

module.exports = function fakeGruntfileInit(options) {
  la(check.object(options), 'missing grunty options', options);
  la(isValidOptions(options), 'invalid options', options);

  function fakeGruntfile(grunt) {
    console.log('inside fake gruntfile');

    var pkg = grunt.file.readJSON('package.json');

    var config = {
      pkg: pkg
    };
    if (isMultiTask(options)) {
      config[options.target] = {
        default: options
      };
    }

    grunt.initConfig(config);
    grunt.task.loadNpmTasks(options.plugin);
    grunt.registerTask('default', []);
  }

  return fakeGruntfile;
};
