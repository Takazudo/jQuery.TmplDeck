/**
 * grunt
 * This compiles coffee to js
 *
 * grunt: https://github.com/cowboy/grunt
 */
module.exports = function(grunt){

  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        ' <%= grunt.template.today("m/d/yyyy") %>\n' +
        ' <%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    coffee: {
      all: {
        files: [ 'jquery.tmpldeck.coffee' ],
        dest: 'jquery.tmpldeck.js'
      }
    },
    coffeelint: {
      all: {
        files: '<config:coffee.all.files>'
      }
    },
    concat: {
      all: {
        src: [ '<banner>', '<config:coffee.all.dest>' ],
        dest: '<config:coffee.all.dest>'
      }
    },
    uglify: {
      all: {
        src: '<config:coffee.dest>',
        dest: 'jquery.tmpldeck.min.js'
      }
    },
    watch: {
      files: '<config:coffee.all.files>',
      tasks: 'coffeelint coffee concat ok'
    }
  });

  grunt.loadTasks('build/gruntTasks');
  grunt.registerTask('default', 'coffeelint coffee concat ok');

};
