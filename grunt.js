'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'src/dangle.module.js',
          'src/modules/**/*.js'
        ],
        dest: 'dist/dangle.js'
      },
      dangle: {
        src: [
          '<banner:meta.banner>',
          'src/dangle.module.js'
        ],
        dest: 'dist/dangle.module.js'
      },
      donut: {
        src: [
          '<banner:meta.banner>',
          'src/modules/donut/donut.js'
        ],
        dest: 'dist/dangle.donut.js'
      },
      pie: {
        src: [
          '<banner:meta.banner>',
          'srcmodules/pie/pie.js'
        ],
        dest: 'dist/dangle.pie.js'
      },
      bar: {
        src: [
          '<banner:meta.banner>',
          'src/modules/bar/bar.js'
        ],
        dest: 'dist/dangle.bar.js'
      },
      column: {
        src: [
          '<banner:meta.banner>',
          'src/modules/column/column.js'
        ],
        dest: 'dist/dangle.column.js'
      },
      area: {
        src: [
          '<banner:meta.banner>',
          'src/modules/area/area.js'
        ],
        dest: 'dist/dangle.area.js'
      },
      datehisto: {
        src: [
          '<banner:meta.banner>',
          'src/modules/date-histo/datehisto.js'
        ],
        dest: 'dist/dangle.datehisto.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/dangle.min.js'
      },
      module: {
        src: ['<banner:meta.banner>', 'src/dangle.module.js'],
        dest: 'dist/dangle.module.min.js'
      },
      donut: {
        src: ['<banner:meta.banner>', 'src/modules/donut/donut.js'],
        dest: 'dist/dangle.donut.min.js'
      },
      pie: {
        src: ['<banner:meta.banner>', 'src/modules/pie/pie.js'],
        dest: 'dist/dangle.pie.min.js'
      },
      bar: {
        src: ['<banner:meta.banner>', 'src/modules/bar/bar.js'],
        dest: 'dist/dangle.bar.min.js'
      },
      column: {
        src: ['<banner:meta.banner>', 'src/modules/column/column.js'],
        dest: 'dist/dangle.column.min.js'
      },
      area: {
        src: ['<banner:meta.banner>', 'src/modules/area/area.js'],
        dest: 'dist/dangle.area.min.js'
      },
      datehisto: {
        src: ['<banner:meta.banner>', 'src/modules/date-histo/datehisto.js'],
        dest: 'dist/dangle.datehisto.min.js'
      }
    },
    lint: {
      files: [
        'grunt.js', 
        '<config:concat.dist.dest>', 
        'src/**/*.js'
      ]
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    jshint: {
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        globalstrict: true
      },
      globals: {
        exports: true,
        module: false
      }
    },
    uglify: {
      codegen: {
        ascii_only: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat min');

};
