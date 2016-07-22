// Karma configuration
// Generated on Mon Jul 11 2016 17:05:15 GMT+0300 (FLE Daylight Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify','jasmine'],


        plugins: [
            'karma-jasmine',
            'karma-browserify',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-htmlfile-reporter'
        ],


        // list of files / patterns to load in the browser
        files: [
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './public/main.js',
            './test/client/modules/**/*.js'
        ],


        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './test/client/modules/**/*.js':['browserify'],
            './public/main.js': ['coverage']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/client/modules',
            moduleName: 'dir-templates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'html','coverage'],

        coverageReporter : {
  			type : 'text',
			},

        htmlReporter: {
            outputFile: './test/units.html',

            // Optional
            pageTitle: 'Unit Tests',
            subPageTitle: 'Pocket tanks : tests',
            groupSuites: true,
            useCompactStyle: true,
            useLegacyStyle: true
        },


        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher

        browsers: ['PhantomJS'],//
        // browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,


        browserNoActivityTimeout: 300000,  //5 minute for running tests

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }
    })
};
