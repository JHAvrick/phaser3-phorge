const path = require('path');
const webpack = require('webpack');

const APP_DIR = path.resolve(__dirname, 'tests', 'game.js');
const BUILD_DIR = path.resolve(__dirname, 'tests', 'www');

module.exports = {
    name: "phaser3-phorge-tests",
    mode: "development",
    entry: APP_DIR,
    output: {
            path: BUILD_DIR,
            filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [ { test: /\.js$/, use: ['babel-loader'] } ]
    },
    optimization: {
        minimize: true
    },
    devServer: {
        contentBase:  path.resolve(__dirname, 'tests', 'www'),
        compress: true,
        port: 8000
    },
	resolve: {
		alias: {
            util: path.resolve(__dirname, 'src/util'),
            modifiers: path.resolve(__dirname, 'src/modifiers'),
		}
	}
}
