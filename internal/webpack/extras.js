const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

let FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const resolve = {
    extensions: ['.js', '.tsx', '.json', 'pcss']
};

const LOADERS = (env, isClient)=>{
    const typed = [{
	loader: 'typed-css-modules-loader',
	options: {
	    searchDir: "**/*.pcss"
	}
    }];
    let rules = [
	{ test: /\.(pcss)$/,
	  use:[ 
	      {loader: 'isomorphic-style-loader'},
	      {loader: 'css-loader',
	       options: {importLoaders: 1,
			 sourceMap: true,
			 modules: true,
			 localIdentName: "[name]_[local]_[hash:base64:3]"}},
	      ... typed,
	      {loader: 'postcss-loader',
	       options: {
		   plugins: (loader) => [
		       require('postcss-import')({ root: loader.resourcePath }),
		       require("postcss-cssnext")({
			   browsers: '> 0%', customProperties: true,
			   colorFunction: true, customSelectors: true
		       })
		   ]
	       }}]
	},


	{ test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader" },
	{ enforce: "pre",  exclude: /node_modules/, test: /\.js$/, loader: "source-map-loader" },
	{ test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
	  use:[
	      {	loader: 'file-loader',
	       options:{
		   emitFile: isClient,
		   name: "fonts/font-[sha512:hash:base64:7].[ext]"
	       }}]},
	{
	    test: /\.(jpe?g|png|gif|svg)$/,
	    use:[
		{loader: 'file-loader',
		 options:{
		     emitFile: isClient,
		     name: "fonts/font-[sha512:hash:base64:7].[ext]"
		 }}]}];
    return ( {rules: rules} ); 
};


const LOADERS_OPTIONS =  new webpack.LoaderOptionsPlugin({
    minimize: false,
    debug: true,
    options: {
	context: '/'
    }
});
const SERVER_PLUGINS = [LOADERS_OPTIONS];
const DEVTOOLS = 'source-map'; 
const PUBLIC_PATH = (env) => 
    env.production ? "http://localhost:4000/" : "http://localhost:4000/";

const CLIENT_PLUGINS = ( env ) => {
    const og = [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new FaviconsWebpackPlugin({
	    prefix: 'icons/',
	    logo: './shared/icon/favicon.png'
	}),
	LOADERS_OPTIONS];
    if (env.production !== true){
	og.push(
	    new webpack.DllReferencePlugin({
	     	context: process.cwd(),
	     	manifest: require("../../dll/vendor.json")
	    }),
	    new webpack.optimize.CommonsChunkPlugin({
		names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
		filename: '[name].js',
		minChunks: Infinity
	    }));
    } else {
	og.push(
	    new StatsPlugin("stats.json"),
	    new CopyWebpackPlugin([ {from: "./server/server.js",to:"./server.js"} ])
	);

    };
    return  ( og );
};
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
    LOADERS: LOADERS 
};
