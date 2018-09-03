const path = require('path');
const webpack = require('webpack');

const APP_DIR = path.resolve(__dirname, 'src', 'main.js');
const BUILD_DIR = path.resolve(__dirname, 'build');

const LibBuild = require('./lib.webpack.config');
const TestBuild = require('./tests.webpack.config');

module.exports = [
    LibBuild,
    TestBuild
]

