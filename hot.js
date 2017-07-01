const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('./webpack.config.js')({production:false});
const app = express();

const compiler = webpack(config);
const clientCompiler = compiler.compilers[0]


app.use(webpackDevMiddleware(compiler, {noInfo: true}));
app.use(WebpackHotMiddleware(clientCompiler));


app.use(webpackHotServerMiddleware(compiler, {
    serverRendererOptions: {
	production: false,
    }
}));

app.listen(5000, () => {
    console.log('Server started: http://localhost:4000');
});
