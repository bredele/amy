'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all : ['src/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
      },
      globals: {
        require: true,
        define: true
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src",
          mainConfigFile: "src/js/config.js",
          name : "config",
          out: "dist/js/optimized.js"
        }
      }
    },
    shell: {
      tests: {
          command: 'java -jar tools/JsTestDriver/JsTestDriver-1.3.5.jar --tests all --reset',
          options: {
            stdout: true
          }
      }
    },
    regarde: {
      js : {
        files : ['src/*.js', 'specs/*.js'],
        tasks : ['jshint', 'shell:tests']
      }
    }

  });

  grunt.loadNpmTasks('grunt-regarde');

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['regarde']);
  grunt.registerTask('build', ['requirejs']);
  grunt.registerTask("test", "jstd");
};