const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

let FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const resolve = {
    extensions: ['.css','.js', '.tsx', '.json', '.pcss']
};

const SERVER_LOADERS = (env)=>{
    let loader =[]
    if(env.production){
	loader = [
	    { test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader" },
	    {
		test: /\.css$/,
		exclude: /node_modules/,
		use: {
		    loader: 'css-loader/locals',
		    options: {
			modules: true,
			localIdentName: '[name]__[local]--[hash:base64:5]'
		    }
		}
	    }
	]
    }else {
	loader = [
	    { test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader" },
	    {
		test: /\.css$/,
		exclude: /node_modules/,
		use: {
		    loader: 'css-loader/locals',
		    options: {
			modules: true,
			localIdentName: '[name]__[local]--[hash:base64:5]'
		    }
		}
	    }
	]

    }
    return {rules:loader}
};

const CLIENT_LOADERS = (env)=>{
    let loader =[]
    if(env.production){
	loader =  [
	    { test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader" },
	    {
		test: /\.css$/,
		use: ExtractCssChunks.extract({
		    use: {
			loader: 'css-loader',
			options: {
			    modules: true,
			    localIdentName: '[name]__[local]--[hash:base64:5]'
			}
		    }
		})
	    }
	]
    }else {
	loader = [
	    { test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader" },
	    {
		test: /\.css$/,
		use: ExtractCssChunks.extract({
		    use: {
			loader: 'css-loader',
			options: {
			    modules: true,
			    localIdentName: '[name]__[local]--[hash:base64:5]'
			}
		    }
		})
	    }
	]

    }
    return {rules:loader}
};



const SERVER_PLUGINS = (env)=> {
    if (env.production){
	return [
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
	    new ExtractCssChunks(),
	    new webpack.optimize.CommonsChunkPlugin({
		names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
		filename: '[name].[chunkhash].js',
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
	    new ExtractCssChunks(),
	    new webpack.optimize.CommonsChunkPlugin({
		names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
		filename: '[name].js',
		minChunks: Infinity
	    }),

	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoEmitOnErrorsPlugin(),
	    new webpack.DefinePlugin({
		'process.env': {
		    NODE_ENV: JSON.stringify('development')
		}
	    })
	]
    }
};
























const DEVTOOLS = 'source-map'; 

const PUBLIC_PATH = (env) => 
    env.production ? "http://localhost:4000/" : "/";

const HOTLOADER = (entry, env)=>{
    if (!env.production) {
	return ['react-hot-loader/patch',
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&overlay=false', 
		...entry]; 
    }
    return entry;

};

module.exports = {
    resolve: resolve,
    SERVER_PLUGINS: SERVER_PLUGINS,
    DEVTOOLS: DEVTOOLS,
    CLIENT_PLUGINS: CLIENT_PLUGINS,
    HOTLOADER:HOTLOADER,
    PUBLIC_PATH: PUBLIC_PATH,
    CLIENT_LOADERS: CLIENT_LOADERS,
    SERVER_LOADERS: SERVER_LOADERS 
};
