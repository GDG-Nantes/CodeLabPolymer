module.exports = function (grunt) {

  // Configuration du build
  grunt.initConfig({

    // Paramétrage
    watch:{

    },
    browserSync: {
        bsFiles: {
            src : ['step*/*.*']
        },
        options: {
            server: {
                baseDir: "./"
            },
            watchTask: true 
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');   
  grunt.loadNpmTasks('grunt-browser-sync');
  
  // Déclaration des taches
  grunt.registerTask('default', ['browserSync','watch']);

};
