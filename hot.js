const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const WebpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const config = require("./webpack.config.js")({production: false});
const clientConfig = require("./webpack.client.js")({production: false});
const app = express();

const compiler = webpack(config);
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;

app.use("/dll", express.static(path.join(__dirname, "dll")));
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath}));
app.use(WebpackHotMiddleware(compiler.compilers.find(( comp ) => comp.name === "client")));
app.use(webpackHotServerMiddleware(compiler, {
    serverRendererOptions: {
        outputPath,
        production: false,
    },
}));

app.listen(5000, () => {
    console.log("Server started: http://localhost:5000");
});
