const path = require('path');
const dist = path.join(__dirname, 'dist');
const extras = require('./internal/webpack/extras.js');
const plugins = require('./internal/webpack/plugins.js');
const loaders = require('./internal/webpack/loaders.js');

module.exports = env => ({
  devtool: extras.DEVTOOLS(env),
  entry: './server/middleware',
  externals: {
    vertx: 'vertx'
  },
  module: loaders.SERVER_LOADERS(env),
  name: 'server',
  output: {
    filename: 'server/[name].js',
    libraryTarget: 'commonjs2',
    path: dist,
    publicPath: extras.PUBLIC_PATH(env)
  },
  plugins: plugins.SERVER_PLUGINS(env),
  resolve: extras.resolve,
  target: 'node'
});
