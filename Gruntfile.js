module.exports = function(grunt) {
	grunt.initConfig({
		 pkg: grunt.file.readJSON('package.json'),
		 jshint:{
		 	options:{
		 		immed:true,
		 		laxbreak:true,
		 		browser: true,
		 		evil:true,
		 		laxcomma:true,
		 		scripturl:true,
		 		smarttabs:true,
		 		expr:true
		 	},
		 	src:['js/jquery.easyform.js']
		 },
		 uglify: {
			options: {
				banner: '/*!<%= pkg.name%> v<%= pkg.version%> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			src:{
				files: {
					'js/jquery.easyform.min.js':['js/jquery.easyform.js']
				}
			}

		  }

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default',['jshint','uglify']);

};