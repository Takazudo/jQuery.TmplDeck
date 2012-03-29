/**
 * grunt
 * This compiles coffee to js
 *
 * grunt: https://github.com/cowboy/grunt
 */
module.exports = function(grunt){

  grunt.initConfig({
    pkg: '<json:info.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        ' <%= grunt.template.today("m/d/yyyy") %>\n' +
        ' <%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      '../jquery.tmpldeck.js': [ '<banner>', '../jquery.tmpldeck.js' ]
    },
    watch: {
      files: [
        '../jquery.tmpldeck.coffee'
      ],
      tasks: 'coffee concat notifyOK'
    },
    coffee: {
      '../jquery.tmpldeck.js':  [ '../jquery.tmpldeck.coffee' ]
    },
    uglify: {
      '../jquery.tmpldeck.min.js': '../jquery.tmpldeck.js'
    }
  });

  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'coffee concat notifyOK');

};
