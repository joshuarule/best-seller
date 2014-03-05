module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');


  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'js/script.js': ['assets/js/*.js']
        } // files
      } // my_target
    }, // uglify
    compass: {
      dev: {
        options: {
          config: 'config.rb'
        } // options
      } //dev
    }, // compass
    watch : {
      options: { livereload: true },
      scripts: {
        files: ['assets/js/*.js'],
        tasks: ['uglify']
      }, // script
      sass: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['compass:dev']
      }, // sass
      html: {
        files: ['index.html', '_layouts/*.html', '_includes/*.html', 
                'blog/*.html', 'approach/*.html', 'contact/*.html', 'projects/*.html']
      }, // html
    }
  }) // init config
  grunt.registerTask('images', [ 'responsive_images:thumb', 'responsive_images:detail']);
  grunt.registerTask('default', 'watch');
  
}; //exports