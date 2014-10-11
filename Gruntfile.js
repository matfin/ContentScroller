module.exports = function(grunt) {

	/**
	 *	Autoload Grunt NPM tasks
 	 */
 	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

 	grunt.initConfig({
 		pkg: grunt.file.readJSON('package.json'),

 		uglify: {
 			options: {
 				mangle: {
 					except: ['_src/*.js']
 				}
 			},
 			development: {
 				options: {
 					sourceMap: true,
 					sourceMapName: 'ContentScroller.map'
 				},
 				files: {
 					'ContentScroller.js': [
 						'bower_components/jquery/dist/jquery.js',
 						'bower_components/q/q.js',
 						'bower_components/underscore/underscore.js',
 						'_src/Scroller.js',
 						'_src/Fetcher.js'
 					]
 				}
 			}
 		},

 		watch: {
 			development: {
 				files: ['_src/*.js'],
 				tasks: ['uglify:development']
 			}
 		}
 	});

 	grunt.registerTask('default', 'watch');
};