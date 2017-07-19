const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const SVG = {
  exclude: /node_modules/,
  loader: 'svg-react-loader',
  test: /\.svg$/
};

const postCSS = {
  loader: 'postcss-loader',
  options: {
    plugins: loader => [
      require('postcss-import')({ root: loader.resourcePath }),
      require('postcss-cssnext')({
        browsers: '> 0%',
        colorFunction: true,
        customProperties: true,
        customSelectors: true
      })
    ]
  }
};

const images = (client = false) => {
  return {
    test: /\.(gif|png|jpe?g)$/i,
    loaders: [
      {
        loader: 'file-loader',
        query: {
          emitFile: client,
          name: 'images/img-[sha512:hash:base64:7].[ext]'
        }
      },
      {
        loader: 'image-webpack-loader',
        query: {
          mozjpeg: {
            progressive: true
          },
          gifsicle: {
            interlaced: false
          },
          optipng: {
            optimizationLevel: 4
          },
          pngquant: {
            quality: '75-90',
            speed: 3
          }
        }
      }
    ]
  };
};

const typeScript = () => ({
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader'
    },
    {
      loader: 'awesome-typescript-loader',
      options: {
        sourceMap: true,
        useBabel: true,
        useCache: true
      }
    }
  ],
  test: /\.tsx?$/
});

const cssHelper = client => {
  return {
    loader: client ? 'css-loader' : 'css-loader/locals',
    options: {
      localIdentName: '[name]__[local]--[hash:base64:5]',
      modules: true
    }
  };
};

const css = (client = false) => {
  const local = [cssHelper(client), postCSS];
  return {
    test: /\.css$/,
    use: client ? ExtractCssChunks.extract({ use: local }) : local
  };
};

const org = () => {
  return {
    test: /\.org/,
    loader: 'org-loader'
  };
};

const serverLoaders = env => ({
  rules: [images(), SVG, typeScript(), css(), org()]
});

const clientLoaders = env => ({
  rules: [images(true), SVG, typeScript(), css(true), org()]
});

module.exports = {
  clientLoaders: clientLoaders,
  serverLoaders: serverLoaders
};
