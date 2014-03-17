'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      all: {
        src: [
          'src/**/*.js',
        ],
        options: {
          'vendor': 'lib/**/*.js',
          'specs': 'spec/**/*.js'
        }
      }
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', 'jasmine:all');

};