'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      all: {
        src: [
          'src/**/*.js',
        ],
        options: {
          helpers: 'node_modules/imagediff/imagediff.js',
          vendor: 'lib/**/*.js',
          specs: 'spec/**/*.js',
          keepRunner: true
        }
      }
    },
    watch: {
      files: ['src/**/*.js', 'spec/**/*.js'],
      tasks: ['jasmine:all']
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['connect', 'watch']);

};