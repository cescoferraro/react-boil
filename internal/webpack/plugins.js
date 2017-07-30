const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin-cesco');
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
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const icons = new FaviconsWebpackPlugin({
  config: {
    appName: 'react-boil',
    display: ' fullscreen',
    lang: 'pt',
    start_url: '/',
    statsFilename: 'icons/[name].[ext]',
    gcm_sender_id: '482941778795',
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

const flags = () => {
  return new CopyWebpackPlugin([
    {
      from: './node_modules/react-flags/vendor/flags',
      to: './flags'
    }
  ]);
};

const copy = () => [
  new CopyWebpackPlugin(
    [
      { from: './server/server.js', to: './server.js' },
      {
        from: './shared/signal/OneSignalSDKUpdaterWorker.js',
        to: './signal/OneSignalSDKUpdaterWorker.js'
      },
      {
        from: './shared/signal/OneSignalSDKWorker.js',
        to: './signal/OneSignalSDKWorker.js'
      },
      { from: './node_modules/react-flags/vendor/flags', to: './flags' }
    ],
    { copyUnmodified: true }
  ),
  flags(),
  new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
];

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
const stats = () => {
  return new StatsPlugin('stats.json');
};
const analyzer = env => {
  return env.analyzer ? new BundleAnalyzerPlugin() : noop();
};
const hmr = () => {
  return new webpack.HotModuleReplacementPlugin();
};
const dllReference = () => {
  return new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('../../dll/vendor.dll.json'),
    name: 'react'
  });
};
const cssProd = () => {
  return new ExtractCssChunks({ filename: 'css/[name]_[hash].css' });
};
const cssDev = () => {
  return new ExtractCssChunks();
};

const clientPlugins = env => {
  if (env.production) {
    return [
      icons,
      stats(),
      cssProd(),
      common(),
      define(env),
      analyzer(env),
      vendor(),
      SW,
      ...HTML,
      Uglify
    ];
  } else {
    return [
      icons,
      dllReference(),
      hmr(),
      cssDev(),
      common(),
      new webpack.NoEmitOnErrorsPlugin(),
      define(env),
      SW
    ];
  }
};

const serverPlugins = env => {
  if (env.production) {
    return [...copy(), limit(), define(env), Uglify];
  } else {
    return [flags(), limit(), define(env)];
  }
};

module.exports = {
  clientPlugins: clientPlugins,
  serverPlugins: serverPlugins
};
