/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    var RE_USE_STRICT_STATEMENT = /(^|\n)[ \t]*'use strict';?\s*/g,
        RE_CONSOLE_METHODS = /console\.[\w]+\(.*?(\w*\(.*\))*\);/g,
        BANNER_TEMPLATE_STRING = '/*! <%= pkg.name %>' +
            ' ( <%= grunt.template.today("yyyy-mm-dd") %> ) - <%= pkg.license %> */';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            dev: ['dev'],
            css: ['<%= project.dev %>/stylesheets/application.scss']
        },

        /**
         * Concatenation
         */
        exec: {
            start: {
                command: 'http-server ./dev & grunt watch'
            }
        },
        copy: {
            test_to_public: {
                files: [
                    {
                        expand: true,
                        cwd: 'target/',
                        src: '**',
                        dest: '../public/'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'dev/images/',
                        src: '**',
                        dest: 'target/images/'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'dev/fonts/',
                        src: '**',
                        dest: 'target/fonts/'
                    }
                ]
            }
        },
        watch: {
            scss: {
                files: [
                    'dev/stylesheets/**/*.sass', 'dev/stylesheets/**/*.scss', 'dev/stylesheets/**/*.css'
                ],
                tasks: [
                    'sass'
                ]
            },
            js: {
                files: [
                    'dev/javascripts/**/*.js'
                ],
                tasks: [
                    'concat'
                ]
            },
            images: {
                files: [
                    'dev/images/**'
                ],
                tasks: [
                    'copy:images'
                ]
            },
            fonts: {
                files: [
                    'dev/fonts/**'
                ],
                tasks: [
                    'copy:font'
                ]
            },
            sync: {
                files: [
                    'target/**'
                ],
                tasks: [
                    'copy:test_to_public'
                ]
            }
        },
        concat: {
            dist: {
                src: [
                    'dev/javascripts/**/*.js'
                ],
                dest: 'target/javascripts/application.js'
            }
        },
        sass: {
            options: {
                style: 'compressed',
                compass: false
            },
            dist: {
                files: {
                    'target/stylesheets/app.css': 'dev/stylesheets/application.scss'
                }
            }
        }
    });

// plugin
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-exec');

// tasks
    /**
     * local 開発環境
     */
    grunt.registerTask('default', ['sass', 'exec:start']);
};