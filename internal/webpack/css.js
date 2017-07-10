/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const objectAssign = require('object-assign');
const defaultOptions = {
    fileBlacklist: [/\.map/]
};

class PreloadPlugin {
    constructor(options) {
	this.options = objectAssign({}, defaultOptions, options);
    }

    apply(compiler) {
	const options = this.options;
	let filesToInclude = '';
	let extractedChunks = [];
	compiler.plugin('compilation', compilation => {
	    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, cb) => {
		let asyncChunksSource = null;
		try {
		    asyncChunksSource = compilation
			.chunks.filter(chunk => !chunk.isInitial())
			.map(chunk => chunk.files);
		} catch (e) {
		    asyncChunksSource = compilation.chunks
			.map(chunk => chunk.files);
		}
		extractedChunks = [].concat.apply([], asyncChunksSource);

		const publicPath = compilation.outputOptions.publicPath || '';

		extractedChunks.filter(entry => {
		    return this.options.fileBlacklist.every(regex => regex.test(entry) === false);
		}).forEach(entry => {
		    entry = `${publicPath}${entry}`;
		    if(entry.endsWith("css"))  {
			    filesToInclude+= `<link rel="stylesheet" type="text/css" href="${entry}">\n`;
		    }
		});
		if (htmlPluginData.html.indexOf('</head>') !== -1) {
		    // If a valid closing </head> is found, update it to include preload/prefetch tags
		    htmlPluginData.html = htmlPluginData.html.replace('</head>', filesToInclude + '</head>');
		} else {
		    // Otherwise assume at least a <body> is present and update it to include a new <head>
		    htmlPluginData.html = htmlPluginData.html.replace('<body>', '<head>' + filesToInclude + '</head><body>');
		}
		cb(null, htmlPluginData);
	    });
	});
    }
}

module.exports = PreloadPlugin;
