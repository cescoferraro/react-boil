const webpack = require("webpack")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

const SERVER_PLUGINS = (env)=> {
    if (env.production){
	return [
	    new CopyWebpackPlugin([ {from: "./server/server.js",to:"./server.js"} ]),
	    new webpack.optimize.LimitChunkCountPlugin({
		maxChunks: 1
	    }),

	    new webpack.DefinePlugin({
		'process.env': {
		    NODE_ENV: JSON.stringify('production')
		}
	    })
	]
    }else {
	return [
	    new webpack.optimize.LimitChunkCountPlugin({
		maxChunks: 1
	    }),
	    new webpack.DefinePlugin({
		'process.env': {
		    NODE_ENV: JSON.stringify('development')
		}
	    })
	]
    }
};


const CLIENT_PLUGINS = ( env ) => {
    if (env.production){
	return [
	    new StatsPlugin('stats.json'),
	    new ExtractCssChunks({
		filename: 'css/[name].[hash].css'
	    }),
	    new webpack.optimize.CommonsChunkPlugin({
		names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
		filename: 'js/[name].[hash].js',
		minChunks: Infinity
	    }),

	    new webpack.DefinePlugin({
		'process.env': {
		    NODE_ENV: JSON.stringify('production')
		}
	    }),
	    new webpack.optimize.UglifyJsPlugin({
		compress: {
		    screw_ie8: true,
		    warnings: false
		},
		mangle: {
		    screw_ie8: true
		},
		output: {
		    screw_ie8: true,
		    comments: false
		},
		sourceMap: true
	    })
	]	

    }else {
	return [
	    new webpack.HotModuleReplacementPlugin(),
	    new ExtractCssChunks(),
	    new webpack.optimize.CommonsChunkPlugin({
		names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
		filename: 'js/[name].js',
		minChunks: Infinity
	    }),

	    new webpack.NoEmitOnErrorsPlugin(),
	    new webpack.DefinePlugin({
		'process.env': {
		    NODE_ENV: JSON.stringify('development')
		}
	    })
	]
    }
};


module.exports = {
    SERVER_PLUGINS: SERVER_PLUGINS,
    CLIENT_PLUGINS: CLIENT_PLUGINS
};
