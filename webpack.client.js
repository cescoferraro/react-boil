const path = require('path');
const webpack = require('webpack');
const extras = require("./internal/webpack/extras.js");
const plugins = require("./internal/webpack/plugins.js");
const loaders = require("./internal/webpack/loaders.js");

module.exports = ( env ) => {
    return ( {
	name: 'client',
	target: 'web',
	entry: extras.HOTLOADER(path.resolve(__dirname, './client/client.tsx'),env),
	output: {
	    path:  path.join(__dirname, 'dist'),
	    filename: 'js/[name]_[hash].js',
	    publicPath:  "http://localhost:5000/" 
	},
	devtool: extras.DEVTOOLS,
	plugins: plugins.CLIENT_PLUGINS(env), 
	module:  loaders.CLIENT_LOADERS(env),
	resolve: extras.resolve 
    } ); };
