module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/app/css/Main.css': 'app/src/css/Main.scss'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/app/css/Main.min.css': 'dist/app/css/Main.css'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/app/js/Main.min.js': 'dist/app/js/Main.js',
                    'dist/app/js/dojo.min.js': 'dist/app/js/dojo.js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['dist/app/js/Main.js', 'dist/app/js/dojo.js'],
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