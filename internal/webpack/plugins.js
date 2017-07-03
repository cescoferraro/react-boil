const webpack = require("webpack")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const noop = require('noop-webpack-plugin')

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
		filename: 'css/[name]_[hash].css'
	    }),
	    new webpack.optimize.CommonsChunkPlugin({
		names: ['bootstrap'], 
		filename: 'js/[name]_[hash].js',
		minChunks: Infinity
	    }),
	    new webpack.optimize.CommonsChunkPlugin({
		name: "vendor",
		filename: "js/vendor.js", 
		chunks: ["main", "vendorC"]
	    }),
	    new webpack.DefinePlugin({
		'process.env': {
		    NODE_ENV: JSON.stringify('production')
		}
	    }),
	    env.analyzer ? new BundleAnalyzerPlugin() : noop() 
	]	

    }else {
	return [
	    new webpack.DllReferencePlugin({
		context: process.cwd(),
		manifest: require("../../dll/vendor.json")
	    }),
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
