const path = require('path');
const webpack = require('webpack');
const extras = require("./internal/webpack/extras.js");

module.exports = ( env ) => {
    return ( {
	name: 'client',
	target: 'web',
	entry: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
	    'react-hot-loader/patch',
	    path.resolve(__dirname, './client/client.tsx')
	] ,
	output: {
	    path:  path.join(__dirname, 'dist'),
	    filename: 'js/[name]_[hash].js',
	    publicPath:  "http://localhost:5000/" 
	},
	devtool: extras.DEVTOOLS,
	plugins: extras.CLIENT_PLUGINS(env), 
	module:  extras.CLIENT_LOADERS(env),
	resolve: extras.resolve 
    } ); };
