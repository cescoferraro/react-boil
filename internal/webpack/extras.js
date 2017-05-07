const webpack = require("webpack");

const resolve = {
    extensions: ['.js', '.tsx', '.json', 'pcss']
};

const LOADERS = {
    rules: [
	{
	    test: /\.(pcss)$/,
	    use:[ 
		{loader: 'isomorphic-style-loader'},
		{loader: 'css-loader',
		 options: {importLoaders: 1,
			   sourceMap: true,
			   modules: true,
			   localIdentName: "[name]_[local]_[hash:base64:3]"}},
		{loader: 'postcss-loader', options: {sourceMap: true}}]
	},
	{ test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader" },
	{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
};

const LOADERS_OPTIONS =  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
	context: '/',
	postcss: [
	    require("postcss-cssnext")({
		browsers: '> 0%', customProperties: true,
		colorFunction: true, customSelectors: true
	    })]
    }
});
const SERVER_PLUGINS = [LOADERS_OPTIONS];
const DEVTOOLS = 'source-map'; 

const CLIENT_PLUGINS = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    LOADERS_OPTIONS];


module.exports = {
    resolve: resolve,
    SERVER_PLUGINS: SERVER_PLUGINS,
    DEVTOOLS: DEVTOOLS,
    CLIENT_PLUGINS: CLIENT_PLUGINS,
    LOADERS: LOADERS 
};
