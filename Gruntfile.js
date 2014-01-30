module.exports = function(grunt) {
 
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    //This will look for things in your project that may require a 
    //modernizr polyfill and dynamically write one
    modernizr: {

      // [REQUIRED] Path to the build you're using for development.
      "devFile" : "js/vendor/modernizr.js",

      // [REQUIRED] Path to save out the built file.
      "outputFile" : "js/compiled/modernizr.js",

      // Based on default settings on http://modernizr.com/download/
      "extra" : {
          "shiv" : true,
          "printshiv" : false,
          "load" : true,
          "mq" : false,
          "cssclasses" : true
      },

      // Based on default settings on http://modernizr.com/download/
      "extensibility" : {
          "addtest" : false,
          "prefixed" : false,
          "teststyles" : false,
          "testprops" : false,
          "testallprops" : false,
          "hasevents" : false,
          "prefixes" : false,
          "domprefixes" : false
      },

      // By default, source is uglified before saving
      "uglify" : true,

      // Define any tests you want to implicitly include.
      "tests" : ['rgba'],

      // By default, this task will crawl your project for references to Modernizr tests.
      // Set to false to disable.
      "parseFiles" : true,

      // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
      // You can override this by defining a "files" array below.
      //"files" : ['js/{,*/}*.js', '!js/compiled/main.js'],

      // When parseFiles = true, matchCommunityTests = true will attempt to
      // match user-contributed tests.
      "matchCommunityTests" : false,

      // Have custom Modernizr tests? Add paths to their location here.
      "customTests" : []
    },

    //this handles your javascript compilation add js libraries in "paths"
    requirejs: {
        compile: {
            options: {
                baseUrl: 'js',
                paths: {
                    //jquery: 'jquery.min' //Use this to minifiy jquery into your main
                    modernizr: 'empty:',
                    //accordion: 'accordion',
                },
                name: 'main',
                out: 'js/compiled/main.js'  
            }
        }
    }, 

    //This handles your sass compilation, edit compass details in config file
    compass: {
      watch: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },

    //this handles jshinting for tight js
    jshint: {
        files: ['js/{,*/}*.js'],
         options: {
            ignores: ['js/vendor/{,*/}*.js', 'js/compiled/{,*/}*.js']
        }
    },

    //this will compress all the images in your images folder, part of build process
    imagemin: {
      dist: {
        files: [{
            expand: true,
            cwd: 'images',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: 'images'
        }]
      }
    },

    //on save of sass, js, html, php and images, run some commands
    watch: {
      compass: {
          files: ['sass/{,*/}*.{scss,sass}'],
          tasks: ['compass']
      },
      requirejs: {
          files: ['js/{,*/}*.js', '!js/compiled/main.js'],
          tasks: ['modernizr', 'requirejs']
      }, 
      //requirejs: {
      //    files: ['js/{,*/}*.js', '!js/compiled/main.js'],
      //    tasks: ['requirejs']
      //}, 
      options: {
          livereload: true,
      },
      livereload: {
          files: ['**/*.html', '**/*.php', 'images/**/*.{png,jpg,jpeg,gif,webp,svg}']
      }
    },

  });
 
  //name my commands
  grunt.registerTask('jserrors', 'jshint');
  grunt.registerTask('polling', 'watch');
  grunt.registerTask('build', function () {
    grunt.log.oklns('Testing All The Things');
    grunt.task.run(['jshint', 'imagemin', 'compass', 'modernizr', 'requirejs']);
  });


};