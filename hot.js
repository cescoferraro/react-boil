const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('./webpack.config.js')({production:false});
const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true
}));

app.use(WebpackHotMiddleware(
    compiler.compilers.find(compiler => compiler.name === 'client')));

app.use(express.static("dist"));

app.use(webpackHotServerMiddleware(compiler, {
    serverRendererOptions: {
	production: false,
	title: 'React-boil Development'
    }
}));

app.listen(4000, () => {
    console.log('Server started: http://localhost:4000');
});
