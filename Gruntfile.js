module.exports = function (grunt) {
	grunt.initConfig({
		srcPath: 'jsx',
    buildPath: 'components',
    shell: {
      'build-jsx': {
        command: 'jsx --no-cache-dir -x jsx <%= srcPath %> <%= buildPath %>',
        stdout: true,
        failOnError: true
      },
      'playground' : {
      	command : 'http-server playground',
      	stdout : false,
      	failOnError : true
      },
    },
		browserify : {
			playground : {
				files : {
					'./playground/playground.js' : ['./components/**/*.js']
				}
			}
		},
		watch : {
			options : { nospawn : false, event: 'all', interrupt : false, interval : 200, debounceDelay: 200 },
			js : { files : './components/**/*.js', tasks : ['browserify:playground']},
			jsx : { files : './jsx/**/*.jsx', tasks : ['shell:build-jsx', 'browserify:playground'] },
			style : { files : './style/**/*.styl', tasks : ['stylus:playground'] },
		},

		stylus : {
			options : { pretty : true },
			playground : {
				options : { compress : false },
				files : {
					'./test/playground.css' : './style/playground.styl'
				}
			}
		},

		// mocha for client-side testing
		mocha : {
			client : {
				options : {
					reporter : "XUnit",
					run : true
				},
				src : ['tests/client/**/*.html']
			}
		},

		// mochaTest for server-side testing
    mochaTest: {
      server: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: true, // Optionally clear the require cache before running tests (defaults to false)

          // Require blanket wrapper here to instrument other required
          // files on the fly. 
          //
          // NB. We cannot require blanket directly as it
          // detects that we are not running mocha cli and loads differently.
          //
          // NNB. As mocha is 'clever' enough to only run the tests once for
          // each file the following coverage task does not actually run any
          // tests which is why the coverage instrumentation has to be done here
          require: 'test/blanket'
        },
        src: ['test/server/**/*_test.js']
      },
      coverage : {
        options: {
          reporter: 'html-cov',
          // use the quiet flag to suppress the mocha console output
          quiet: true,
          // specify a destination file to capture the mocha
          // output (the quiet option does not suppress this)
          captureFile: 'test/coverage.html'
        },
        src: ['test/server/**/*_test.js']
      }
    }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('build', ['shell:build-jsx','stylus:playground','browserify:playground']);
	grunt.registerTask('develop', ['build', 'watch']);
	grunt.registerTask('test', ['mochaTest','mocha:client']);
	grunt.registerTask('playground', 'shell:playground');
}