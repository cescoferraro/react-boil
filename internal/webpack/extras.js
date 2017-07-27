const resolve = {
  extensions: ['.css', '.js', '.tsx', '.json', '.pcss']
};

const devTools = env =>
  env.production ? 'source-map' : 'cheap-module-eval-source-map';

const publicPath = env =>
  env.production ? 'https://boil.cescoferraro.xyz/' : 'http://localhost:5000/';

const hotLoader = (entry, env) => {
  if (!env.production) {
    return [
      'webpack-hot-middleware/client?' +
        'path=/__webpack_hmr&timeout=20000&reload=true',
      'react-hot-loader/patch',
      entry
    ];
  }
  return entry;
};

module.exports = {
  resolve: resolve,
  devTools: devTools,
  publicPath: publicPath,
  hotLoader: hotLoader
};
