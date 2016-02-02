'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    execute: {
      update: {
        src: ['update.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('update', [
    'execute:update'
  ]);
};