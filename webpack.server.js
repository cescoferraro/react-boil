const path = require('path');
const webpack = require('webpack');
const dist = path.join(__dirname, 'dist');
const extras = require("./internal/webpack/extras.js") 
const plugins = require("./internal/webpack/plugins.js");
const loaders = require("./internal/webpack/loaders.js");

module.exports = ( env ) => ( {
    name: 'server',
    target: 'node',
    entry: "./server/middleware",
    output: {
        path: dist,
        filename: 'server/[name].js',
        libraryTarget: 'commonjs2'
    },
    devtool: 'source-map',
    module: loaders.SERVER_LOADERS(env),
    resolve: extras.resolve,
    plugins: plugins.SERVER_PLUGINS(env)
} );
