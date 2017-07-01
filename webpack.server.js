const path = require('path');
const webpack = require('webpack');
const dist = path.join(__dirname, 'dist');
const extras = require("./internal/webpack/extras.js") 


module.exports = ( env ) => ( {
    name: 'server',
    target: 'node',
    entry: "./server/middleware",
    output: {
        path: dist,
        filename: 'server/[name].js',
        libraryTarget: 'commonjs2',
	publicPath: extras.PUBLIC_PATH(env) 
    },
    devtool: 'source-map',
    module: extras.LOADERS(env,false),
    resolve: extras.resolve,
    plugins:extras.SERVER_PLUGINS 
} );
