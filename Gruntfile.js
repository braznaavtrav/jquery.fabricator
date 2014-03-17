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
    },
    watch: {
      files: ['src/**/*.js', 'spec/**/*.js'],
      tasks: ['jasmine:all']
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', 'watch');

};