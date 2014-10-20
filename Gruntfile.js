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
      'server' : {
      	command : 'http-server',
      	stdout : false,
      	failOnError : true
      },
    },
		browserify : {
			playground : {
				files : {
					'./test/playground.js' : ['./components/**/*.js']
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

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('develop', ['shell:build-jsx','stylus:playground','browserify:playground', 'watch']);
	grunt.registerTask('server', 'shell:server');
}