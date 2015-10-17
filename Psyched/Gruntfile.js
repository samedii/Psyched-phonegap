module.exports = function (grunt) {
    'use strict';
 
    var port = grunt.option('port') || 9001,
        lrPort = grunt.option('lr-port') || 35731,
        hostname = 'localhost',
        baseFolder = '.';
 
    // Display the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);
    // Lazy load all Grunt tasks
    require('jit-grunt')(grunt);
 
    // Project configuration.
    grunt.initConfig({
        // Read settings from package.json
        pkg: grunt.file.readJSON('package.json'),
        // Paths settings
        dirs: {
            src: {
                src: 'src',
                css: 'src/css',
                js: 'src/js'
            }
        },
        // Check that all JS files conform to our `.jshintrc` files
        jshint: {
            options: {
                jshintrc: true
            },
            target: {
                src: '<%= dirs.src.js %>/**/*.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: 'src/js/**/*.js',
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        ngAnnotate: {
            options: {
                // Task-specific options go here.
            },
            js: {
                // Target-specific file lists and/or options go here.
                files: [{
                    expand: true,
                    src: ['dist/<%= pkg.name %>.js'],
                    ext: '.annotated.js', // dist filepaths will have this extension.
                    extDot: 'last', // Extensions in filenames begin after the last dot
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> ' +
                    '<%= grunt.template.today("dd-mm-yyyy") %> */\n',
                compress: true,
                mangle: false,
                sourceMap: true
            },
            js: {
                src: ['dist/<%= pkg.name %>.annotated.js'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        cssmin: {
            css: {
                files: {
                    src: ['<%= dirs.src.css %>/**/*.css'],
                    dest: 'dist/<%= pkg.name %>.min.css'
                }
            }
        },
        // Cleanup setup, used before each build
        clean: {
            dest: 'dist/*'
        },
        // Trigger relevant tasks when the files they watch has been changed
        // This includes adding/deleting files/folders as well
        watch: {
            // Will try to connect to a LiveReload script
            options: {
                livereload: lrPort
            },
            configs: {
                options: {
                    reload: true
                },
                files: ['Gruntfile.js', 'package.json']
            },
            css: {
                files: '<%= dirs.src.css %>/**/*.css',
                tasks: ['build-css']
            },
            js: {
                files: '<%= dirs.src.js %>/**/*.js',
                tasks: ['build-js']
            },
            partials: {
                files: ['partials/**/*.html']
            },
            index: {
                files: 'index.html'
            }
        },
        // Setup a local server (using Node) with LiveReload enabled
        connect: {
            server: {
                options: {
                    port: port,
                    base: baseFolder,
                    hostname: hostname,
                    livereload: lrPort,
                    open: true
                }
            }
        }
    });

    // Setup build tasks aliases
    grunt.registerTask('build-js', ['jshint', 'concat', 'ngAnnotate', 'uglify']);
    grunt.registerTask('build-css', ['cssmin']);
    grunt.registerTask('build', ['clean:dist', 'build-js', 'build-css']);
 
    // Open local server and watch for file changes
    grunt.registerTask('serve', ['connect', 'watch']);
 
    // Default task(s).
    grunt.registerTask('default', ['build', 'serve']);
};