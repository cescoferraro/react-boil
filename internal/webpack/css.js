'use strict';
const objectAssign = require('object-assign');
const defaultOptions = { fileBlacklist: [/\.map/] };
const serialize = require('serialize-javascript');
const createCssHash = require('webpack-flush-chunks/dist/createApiWithCss')
  .createCssHash;

/** Class representing a point. */
class PreloadPlugin {
  /**
  * Create a point.
  * @param {options} options - The options.
  */
  constructor(options) {
    this.options = objectAssign({}, defaultOptions, options);
  }

  /**
  * Create a point.
  * @param {compiler} compiler - The webpack compiler.
  */
  apply(compiler) {
    let filesToInclude = '';
    let extractedChunks = [];
    compiler.plugin('compilation', compilation => {
      compilation.plugin(
        'html-webpack-plugin-before-html-processing',
        (htmlPluginData, cb) => {
          extractedChunks = [...compilation.chunks.map(chunk => chunk.files)];
          const publicPath = compilation.outputOptions.publicPath || '';
          const hashes = createCssHash({
            publicPath,
            assetsByChunkName: extractedChunks
          });
          Object.keys(hashes).forEach(function(key) {
            const tt = hashes[key].split('_')[0].split('/').reverse()[0];
            hashes[tt] = hashes[key];
            delete hashes[key];
          });
          filesToInclude =
            ' <script> window.__CSS_CHUNKS__ = ' +
            serialize(hashes) +
            '</script> ';
          if (htmlPluginData.html.indexOf('</head>') !== -1) {
            htmlPluginData.html = htmlPluginData.html.replace(
              '</head>',
              filesToInclude + '</head>'
            );
          } else {
            htmlPluginData.html = htmlPluginData.html.replace(
              '<body>',
              '<head>' + filesToInclude + '</head><body>'
            );
          }
          cb(null, htmlPluginData);
        }
      );
    });
  }
}

module.exports = PreloadPlugin;
