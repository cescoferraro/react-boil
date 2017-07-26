'use strict';
const objectAssign = require('object-assign');
const defaultOptions = { fileBlacklist: [/\.map/] };
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
          let asyncChunksSource = null;
          try {
            asyncChunksSource = compilation.chunks
              .filter(chunk => !chunk.isInitial())
              .map(chunk => chunk.files);
          } catch (e) {
            asyncChunksSource = compilation.chunks.map(chunk => chunk.files);
          }
          extractedChunks = [...asyncChunksSource];

          const publicPath = compilation.outputOptions.publicPath || '';

          extractedChunks
            .filter(entry => {
              return this.options.fileBlacklist.every(
                regex => regex.test(entry) === false
              );
            })
            .forEach(entry => {
              entry = `${publicPath}${entry}`;
              if (entry.endsWith('css')) {
                filesToInclude +=
                  `<link ` +
                  `rel="stylesheet" type="text/css" href="${entry}">\n`;
              }
            });
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
