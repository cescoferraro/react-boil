const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const noop = require('noop-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const Harmony = require('uglifyjs-webpack-plugin');
const PreloadWebpackPlugin = require('./css.js');

const icons = new FaviconsWebpackPlugin({
  config: {
    appName: 'react-boil',
    display: ' fullscreen',
    lang: 'pt',
    start_url: '/',
    theme_color: '#00bfff'
  },
  emitStats: true,
  logo: './shared/icon/favicon.png',
  persistentCache: false,
  prefix: 'icons/'
});

const Uglify = new Harmony();

const SW = new SWPrecacheWebpackPlugin({
  directoryIndex: 'html/index.html'
});

const HTML = [
  new HtmlWebpackPlugin({
    chunks: ['bootstrap', 'vendor', 'main'],
    chunksSortMode: (a, b) => {
      const order = ['bootstrap', 'vendor', 'main'];
      return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
    },
    filename: 'html/index.html',
    inject: true,
    showErrors: true,
    template: './server/index.html'
  }),
  new PreloadWebpackPlugin()
];

const limit = () =>
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  });

const copy = () =>
  new CopyWebpackPlugin([{ from: './server/server.js', to: './server.js' }]);

const define = env =>
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env.production ? 'production' : 'development')
    }
  });

const common = () =>
  new webpack.optimize.CommonsChunkPlugin({
    filename: 'js/[name]_[hash].js',
    minChunks: Infinity,
    names: ['bootstrap']
  });

const vendor = () =>
  new webpack.optimize.CommonsChunkPlugin({
    chunks: ['main', 'vendorC'],
    filename: 'js/vendor.js',
    name: 'vendor'
  });

const clientPlugins = env => {
  if (env.production) {
    return [
      icons,
      new StatsPlugin('stats.json'),
      new ExtractCssChunks({ filename: 'css/[name]_[hash].css' }),
      common(),
      define(env),
      vendor(),
      env.analyzer ? new BundleAnalyzerPlugin() : noop(),
      SW,
      ...HTML,
      Uglify
    ];
  } else {
    return [
      icons,
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('../../dll/vendor.dll.json'),
        name: 'react'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractCssChunks(),
      common(),
      new webpack.NoEmitOnErrorsPlugin(),
      define(env),
      SW
    ];
  }
};

const serverPlugins = env => {
  if (env.production) {
    return [copy(), limit(), define(env), Uglify];
  } else {
    return [limit(), define(env)];
  }
};

module.exports = {
  clientPlugins: clientPlugins,
  serverPlugins: serverPlugins
};
