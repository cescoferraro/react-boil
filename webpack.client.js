const extras = require('./internal/webpack/extras.js');
const path = require('path');
const plugins = require('./internal/webpack/plugins.js');
const loaders = require('./internal/webpack/loaders.js');

module.exports = env => {
  const client = {
    devtool: extras.devTools(env),
    entry: {
      main: extras.hotLoader(
        path.resolve(__dirname, './client/client.tsx'),
        env
      )
    },
    externals: {
      vertx: 'vertx'
    },
    module: loaders.clientLoaders(env),
    name: 'client',
    output: {
      filename: 'js/[name]_[hash].js',
      path: path.join(__dirname, 'dist'),
      publicPath: extras.publicPath(env)
    },
    plugins: plugins.clientPlugins(env),
    resolve: extras.resolve,
    target: 'web'
  };
  if (env.production) {
    client.entry.vendorC = [
      'react',
      'lodash',
      'react-dom',
      'rxjs',
      'material-ui'
    ];
  }
  return client;
};
