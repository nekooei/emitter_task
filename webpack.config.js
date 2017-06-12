const path = require('path');

// Application configuration
const pkg = require('./package.json');

module.exports = {
    context: getRelativePath(pkg.directoryName.src),
    entry: `../${pkg.main}`,
    output: {
        path: getRelativePath(pkg.directoryName.dist),
        filename: pkg.fileName.bundle,
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [
                getRelativePath(pkg.directoryName.src)],
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env'],
                    ],
                },
            }],
        }],
    },
};

/**
 * Get the relative path name inside the current directory
 *
 * @param {string} pathName Relative path name
 * @returns {string} Absolute path
 */
function getRelativePath(pathName) {
    return path.resolve(__dirname, pathName);
}
