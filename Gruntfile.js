module.exports = function ( grunt ) {

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: false
			},
			my_target: {
				files: {
					'public/js/manifest.min.js': [
						// vendor
						'public/js/vendor/jquery.min.js',
						'public/js/vendor/underscore.min.js',
						'public/js/vendor/backbone.js',
						'public/js/vendor/d3.min.js',
						// lib
						'public/js/lib/inview.js',
						// sections
						'public/js/sections/section-0.js',
						'public/js/sections/section-1.js',
						'public/js/sections/section-2.js',
						'public/js/sections/section-3.js',
						'public/js/sections/section-4.js',
						// the rest
						'public/js/router.js',
						'public/js/app.js'
					]
				}					
			}
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.registerTask( 'default', [  'uglify' ] );

};