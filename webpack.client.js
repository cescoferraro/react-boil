const path = require('path');
const webpack = require('webpack');
const extras = require("./internal/webpack/extras.js");

module.exports = ( env ) => {
    console.log("hello");
    console.log(env);
    return ( {
	name: 'client',
	target: 'web',
	entry: extras.HOTLOADER(['./client/client'],env),
	output: {
	    path:  path.join(__dirname, 'dist'),
	    filename: 'js/[name]_[hash].js',
	    publicPath: extras.PUBLIC_PATH(env) 
	},
	devtool: extras.DEVTOOLS,
	plugins: extras.CLIENT_PLUGINS(env,true), 
	module:  extras.LOADERS(env),
	resolve: extras.resolve 
    } ); };
