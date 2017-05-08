const path = require('path');
const webpack = require('webpack');
const extras = require("./internal/webpack/extras.js");

module.exports = env => {
    console.log("hello");
    console.log(env);
    return ( {
	name: 'client',
	target: 'web',
	entry: ['react-hot-loader/patch', 
		'webpack-hot-middleware/client',
		'./client/client' ],
	output: {
	    path:  path.join(__dirname, 'dist'),
	    filename: 'client.js'
	},
	devtool: require("./internal/webpack/extras.js").DEVTOOLS,
	plugins:require("./internal/webpack/extras.js").CLIENT_PLUGINS(env,true), 
	module: require("./internal/webpack/extras.js").LOADERS(env),
	resolve: require("./internal/webpack/extras.js").resolve 
    } ); };
