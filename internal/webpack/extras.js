const resolve = {
  extensions: ['.css', '.js', '.tsx', '.json', '.pcss']
};

const DEVTOOLS = env => (env.production ? 'source-map' : 'eval');

const PUBLIC_PATH = env =>
  env.production ? 'https://boil.cescoferraro.xyz/' : 'http://localhost:5000/';

const HOTLOADER = (entry, env) => {
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
  DEVTOOLS: DEVTOOLS,
  PUBLIC_PATH: PUBLIC_PATH,
  HOTLOADER: HOTLOADER
};
