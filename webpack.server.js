const path = require('path');
const dist = path.join(__dirname, 'dist');
const extras = require('./internal/webpack/extras.js');
const plugins = require('./internal/webpack/plugins.js');
const loaders = require('./internal/webpack/loaders.js');

module.exports = env => ({
  devtool: extras.devTools(env),
  entry: './server/middleware',
  externals: { vertx: 'vertx' },
  module: loaders.serverLoaders(env),
  name: 'server',
  output: {
    filename: 'server/[name].js',
    libraryTarget: 'commonjs2',
    path: dist,
    publicPath: extras.publicPath(env)
  },
  plugins: plugins.serverPlugins(env),
  resolve: extras.resolve,
  target: 'node'
});
