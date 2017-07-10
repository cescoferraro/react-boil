const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const noop = require("noop-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const PreloadWebpackPlugin = require('./css.js');


const icons =  new FaviconsWebpackPlugin({
    config: {
        appName: "react-boil",
        lang: "pt",
        start_url: "/",
	display: " fullscreen",
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
	template:  "./server/index.html",
	showErrors: true,
	inject: true,
	chunks:['bootstrap','vendor', 'main'],
	chunksSortMode: (a, b) => { 
	    var order = ['bootstrap','vendor', 'main']; 
	    return order.indexOf(a.names[0]) - order.indexOf(b.names[0]); 
	}
    }),
    new PreloadWebpackPlugin()
];

const LIMIT= () => new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
})
const COPY = () => (
    new CopyWebpackPlugin([ {from: "./server/server.js", to: "./server.js"} ])
) 

const DEFINE = (env) => (
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(env.production ? "production" : "development")
        },
    })
)
const COMMON = () => (
    new webpack.optimize.CommonsChunkPlugin({
        filename: "js/[name]_[hash].js",
        minChunks: Infinity,
        names: ["bootstrap"],
    })
)
const VENDOR= () => (
    new webpack.optimize.CommonsChunkPlugin({
        chunks: ["main", "vendorC"],
        filename: "js/vendor.js",
        name: "vendor",
    })
)

const CLIENT_PLUGINS = ( env ) => {
    if (env.production) {
        return [
	    icons,
            new StatsPlugin("stats.json"),
            new ExtractCssChunks({filename: "css/[name]_[hash].css"}),
	    COMMON(),
	    DEFINE(env),
	    VENDOR(),
            env.analyzer ? new BundleAnalyzerPlugin() : noop(),
	    SW,
            ...HTML
	];
    } else {
        return [
	    icons,
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require("../../dll/vendor.dll.json"),
                name: "react",
            }),
            new webpack.HotModuleReplacementPlugin(),
            new ExtractCssChunks(),
	    COMMON(),
            new webpack.NoEmitOnErrorsPlugin(),
	    DEFINE(env),
	    SW,
        ];
    }
};

const SERVER_PLUGINS = (env) => {
    if (env.production) {
        return [COPY(), LIMIT(), DEFINE(env)];
    } else {
        return [LIMIT(), DEFINE(env)];
    }
};

module.exports = {
    CLIENT_PLUGINS: CLIENT_PLUGINS,
    SERVER_PLUGINS: SERVER_PLUGINS,
};
