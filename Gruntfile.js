module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'app/src/css/Main.css': 'app/src/css/Main.scss'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'app/src/css/Main.min.css': 'app/src/css/Main.css'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'app/src/js/Main.min.js': 'app/src/js/Main.js',
                    'app/src/js/dojo.min.js': 'app/src/js/dojo.js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/src/js/Main.js', 'app/src/dojo.js'],
                tasks: ['uglify']
            },
            sass: {
                files: ['app/src/css/Main.scss'],
                tasks: ['sass']
            },
            styles: {
                files: ['app/src/css/Main.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'watch']);

}