// Karma configuration
// Generated on Mon Sep 21 2015 14:52:54 GMT+0200 (CEST)

module.exports = function( config ) {
    config.set( {

        // Base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // Frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [ 'jasmine', 'sinon', 'fixture' ],

        // List of files / patterns to load in the browser
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            // 'example/polyfills/custom-event.js',
            // 'example/polyfills/object-assign.js',
            // 'example/polyfills/promise.js',
            'src/**/*.js',
            'test/**/*.js',
            {
                pattern: 'test/fixtures/**/*',
                included: true,
                served: true
            }
        ],

        // Preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': [ 'webpack' ],
            'test/**/*.js': [ 'webpack' ],
            'test/fixtures/**/*.html'   : [ 'html2js' ],
            'test/fixtures/**/*.json'   : ['json_fixtures']
        },

        jsonFixturesPreprocessor: {
            variableName: '__json__'
        },

        webpack: require( './webpack.config.js' )(),

        webpackMiddleware: {
            stats: 'errors-only'
		},

        plugins: [
            require( 'karma-webpack' ),
            require( 'karma-jasmine' ),
            require( 'karma-sinon' ),
            require( 'karma-phantomjs-launcher' ),
            require( 'karma-coverage' ),
            require( 'karma-tape-reporter' ),
            require( 'karma-fixture' ),
            require( 'karma-html2js-preprocessor' ),
            require( 'karma-json-fixtures-preprocessor' )
        ],

        // Test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            // 'progress',
            'tape'
            // 'coverage'
        ],

        // Web server port
        port: 9876,

        // Enable / disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ 'PhantomJS' ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // optionally, configure the reporter
        coverageReporter: {
            dir: './artifacts/test/coverage/',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
                { type: 'teamcity', subdir: '.', file: 'teamcity.txt' }
            ]
        }
    } );
};
