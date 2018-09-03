const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const APP_DIR = path.resolve(__dirname, 'src', 'main.js');
const BUILD_DIR = path.resolve(__dirname, 'build');

module.exports = {
    name: "phaser3-phorge",
    mode: "production",
    entry: APP_DIR,
    output: {
            path: BUILD_DIR,
            filename: 'phaser3-phorge.js',
            library: 'phaser3-phorge',
            libraryTarget: 'umd',
    },
    externals : {
        phaser : 'phaser'
    },
    module: {
        rules: [ { test: /\.js$/, use: ['babel-loader'] } ]
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ]
}
