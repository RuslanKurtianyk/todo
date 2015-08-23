module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'public/css/style.css': 'public/css/scss/style.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sasswatch']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.registerTask('sasswatch', ['newer:sass']);
    grunt.registerTask('default', ['watch']);
}