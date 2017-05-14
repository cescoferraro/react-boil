const webpack = require("webpack");
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const resolve = {
    extensions: ['.js', '.tsx', '.json', 'pcss']
};

const LOADERS = (env, isClient)=>{
    let rules = [
	{ test: /\.(pcss)$/,
	  use:[ 
	      {loader: 'isomorphic-style-loader'},
	      {loader: 'css-loader',
	       options: {importLoaders: 1,
			 sourceMap: true,
			 modules: true,
			 localIdentName: "[name]_[local]_[hash:base64:3]"}},
	      {loader: 'postcss-loader',
	       options: {
		   plugins: (loader) => [
		       require("postcss-cssnext")({
			   browsers: '> 0%', customProperties: true,
			   colorFunction: true, customSelectors: true
		       })
		   ]}
	      }]
	},
	{ test: /\.tsx?$/,
	  exclude: /node_modules/, 
	  loader: "awesome-typescript-loader" },
	{  test: /\.js$/,
	   enforce: "pre",  
	   exclude: /node_modules/, 
	   loader: "source-map-loader" },
	{ test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
	  use:[
	      {	loader: 'file-loader',
		options:{
		    emitFile: isClient,
		    name: "fonts/font-[sha512:hash:base64:7].[ext]"
		}}]},
	{ test: /\.(jpe?g|png|gif|svg)$/,
	  use:[
	      {loader: 'file-loader',
	       options:{
		   emitFile: isClient,
		   name: "fonts/font-[sha512:hash:base64:7].[ext]"
	       }}]}];
    return ( {rules: rules} ); 
};


const LOADERS_OPTIONS_PLUGIN =  new webpack.LoaderOptionsPlugin({
    minimize: false,
    debug: true,
    options: {
	context: '/'
    }
});
const SERVER_PLUGINS = env => {
    let og = [LOADERS_OPTIONS_PLUGIN];
    if (env.production !== true){og.push(dll);} 
    return og; 
    
};
const DEVTOOLS = 'source-map'; 
const dll = new webpack.DllReferencePlugin({
    context: process.cwd(),
    manifest: require("../../dist/dll/vendor.json")
});
const CLIENT_PLUGINS = env => {
    let og = [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new FaviconsWebpackPlugin({
	    prefix: 'icons/',
	    logo: './shared/icon/favicon.png'
	}),
	LOADERS_OPTIONS_PLUGIN];
    if (env.production !== true){og.push(dll); 
				};
    return  ( og );
};


module.exports = {
    resolve: resolve,
    SERVER_PLUGINS: SERVER_PLUGINS,
    DEVTOOLS: DEVTOOLS,
    CLIENT_PLUGINS: CLIENT_PLUGINS,
    LOADERS: LOADERS 
};
