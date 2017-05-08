const path = require('path');
const webpack = require('webpack');
const dist = path.join(__dirname, 'dist');


module.exports = ( env ) => ( {
    name: 'server',
    target: 'node',
    entry: env.production ? "./server/production":'./server/server',
    output: {
        path: dist,
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    devtool: 'source-map',
    module: require("./internal/webpack/extras.js").LOADERS(env,false),
    resolve: require("./internal/webpack/extras.js").resolve,
    plugins:require("./internal/webpack/extras.js").SERVER_PLUGINS 
} );
