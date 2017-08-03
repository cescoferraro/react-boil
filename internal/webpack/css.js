'use strict';
const objectAssign = require('object-assign');
const defaultOptions = { fileBlacklist: [/\.map/] };
const serialize = require('serialize-javascript');
const createCssHash = require('webpack-flush-chunks/dist/createApiWithCss')
  .createCssHash;
const flush = require('webpack-flush-chunks');
const { flushChunkNames } = require('react-universal-component/server');
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
          filesToInclude =
            ' <script> window.__CSS_CHUNKS__ = ' +
            serialize(
              createCssHash({
                publicPath,
                assetsByChunkName: extractedChunks
              })
            ) +
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
