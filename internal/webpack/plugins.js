const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require("webpack")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const noop = require('noop-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const icons =  new FaviconsWebpackPlugin({
    prefix: 'icons/',
    logo: './shared/icon/favicon.png',
    config: {
	appName: "react-boil",
	lang: "pt",
	start_url: '/',
	theme_color: '#00bfff'
    }
})

const SERVER_PLUGINS = (env)=> {
    if (env.production){
	return [
	    icons,
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
	    icons,
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

const SW = new SWPrecacheWebpackPlugin({
    staticFileGlobs: ['/?pwa=true'],
    filename: "js/sw.js",
    staticFileGlobsIgnorePatterns: [/\.map$/], 
    mergeStaticsConfig: true
}) 

const CLIENT_PLUGINS = ( env ) => {
    if (env.production){
	return [
	    SW,
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
		manifest: require("../../dll/vendor.dll.json"),
		context: __dirname, 
		name: "react"
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
