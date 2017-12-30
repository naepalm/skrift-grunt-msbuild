module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);
    var path = require("path");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        dest: grunt.option("target") || ".",

        watch: {
            options: {
                spawn: false,
                atBegin: true
            },
            dll: {
                files: ['../Skrift/**/*.cs'] ,
                tasks: ['msbuild:dist', 'copy:dll']
            }
        },

        copy: {
            dll: {
                cwd: '../Skrift/bin/debug/',
                src: 'Skrift.dll',
                dest: '<%= dest %>/bin/',
                expand: true
            }
        },

        msbuild: {
            options: {
                stdout: true,
                verbosity: 'quiet',
                maxCpuCount: 4,
                version: 4.0,
                buildParameters: {
                WarningLevel: 2,
                NoWarn: 1607
                }
            },
            dist: {
                src: ['../Skrift/Skrift.csproj'],
                options: {
                    projectConfiguration: 'Debug',
                    targets: ['Clean', 'Rebuild'],
                }
            }
        }
    });

    grunt.registerTask("default", [
        "msbuild:dist",
        "copy:dll"
    ]);
};