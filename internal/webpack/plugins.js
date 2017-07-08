const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const noop = require("noop-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const path = require("path");


const icons =  new FaviconsWebpackPlugin({
    config: {
        appName: "react-boil",
        lang: "pt",
        start_url: "/",
        theme_color: "#00bfff",
    },
    logo: "./shared/icon/favicon.png",
    prefix: "icons/",
});

const SW = new SWPrecacheWebpackPlugin({
    directoryIndex : "html/index.html"
});

const HTML = [ 
    new HtmlWebpackPlugin({
	filename: "html/index.html",
	template:  "./server/index.ejs",
	chunks:['bootstrap','vendor', 'main'],
	chunksSortMode: (a, b) => { 
	    var order = ['bootstrap','vendor', 'main']; 
	    return order.indexOf(a.names[0]) - order.indexOf(b.names[0]); 
	}
    })
];

const SERVER_PLUGINS = (env) => {
    if (env.production) {
        return [
            icons,
            new CopyWebpackPlugin([ {from: "./server/server.js", to: "./server.js"} ]),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production"),
                },
            }),
        ];
    } else {
        return [
            icons,
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("development"),
                },
            }),
        ];
    }
};

const CLIENT_PLUGINS = ( env ) => {
    if (env.production) {
        return [
            new StatsPlugin("stats.json"),
            new ExtractCssChunks({
                filename: "css/[name]_[hash].css",
            }),
            new webpack.optimize.CommonsChunkPlugin({
                filename: "js/[name]_[hash].js",
                minChunks: Infinity,
                names: ["bootstrap"],
            }),
            new webpack.optimize.CommonsChunkPlugin({
                chunks: ["main", "vendorC"],
                filename: "js/vendor.js",
                name: "vendor",
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production"),
                },
            }),
            env.analyzer ? new BundleAnalyzerPlugin() : noop(),
	    icons,
	    SW,
            ...HTML
	];
    } else {
        return [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require("../../dll/vendor.dll.json"),
                name: "react",
            }),
            new webpack.HotModuleReplacementPlugin(),
            new ExtractCssChunks(),
            new webpack.optimize.CommonsChunkPlugin({
                filename: "js/[name].js",
                minChunks: Infinity,
                names: ["bootstrap"],
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("development"),
                },
            }),
	    SW,
        ];
    }
};

module.exports = {
    CLIENT_PLUGINS: CLIENT_PLUGINS,
    SERVER_PLUGINS: SERVER_PLUGINS,
};
