// Karma configuration

// Application configuration
const pkg = require('./package.json');

// Use the "export" command to define the KARMA_PORT port; otherwise,
// use the default port number specified in the package.json
const KARMA_PORT = process.env.KARMA_PORT || pkg.karmaPort;

module.exports = (config) => {
    config.set({
        // Base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // Frameworks to include: https://npmjs.org/browse/keyword/karma-adapter
        // jasmine: Development/Testing framework https://jasmine.github.io/
        // source-map-support: Create sourcemaps so that errors in the transpiled code matches the untranspiled code https://www.npmjs.com/package/source-map-support
        frameworks: ['jasmine', 'source-map-support'],

        // List of files/patterns to load into the browsers
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'src/emitter.js',
            'test/*Spec.js',
        ],

        // List of files/patterns to exclude from loading into the browsers
        exclude: [
        ],

        // Preprocess the files/patterns before loading into the browsers https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/emitter.js': ['babel'],
            'test/*Spec.js': ['babel', 'sourcemap'],
        },

        // Use the "babel preprocessor" for transpiling ES2015+ source code
        // to ES5 source code https://www.npmjs.com/package/karma-babel-preprocessor
        babelPreprocessor: {
            options: {
                // Use the latest JavaScript specification
                presets: ['env'],

                // Transform ES2015+ modules into UMD modules https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-umd
                plugins: ['transform-es2015-modules-umd'],
                sourceMap: 'inline',
            },
        },

        // Use "mocha" as the testing reporter https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // Web server port
        port: KARMA_PORT,

        // Enable/disable colors in the standard output stream (stdout) (reporters and logs)
        colors: true,

        // Supported values:
        // config.LOG_DISABLE, config.LOG_ERROR, config.LOG_WARN, config.LOG_INFO, config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable/disable watching files and executing tests whenever there are file changes
        autoWatch: true,

        // Start the following browsers https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // If true, Karma captures browsers, runs the tests and immdiately exits
        singleRun: false,

        // Concurrency level (number of browsers to start simultaneously)
        concurrency: Infinity,
    });
};
