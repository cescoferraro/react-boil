const path = require("path");
const webpack = require("webpack");
const extras = require("./internal/webpack/extras.js");
const plugins = require("./internal/webpack/plugins.js");
const loaders = require("./internal/webpack/loaders.js");

module.exports = ( env ) => {
    const client = {
        devtool: extras.DEVTOOLS(env),
        entry: {main: extras.HOTLOADER(path.resolve(__dirname, "./client/client.tsx"), env) },
        externals: {
            "vertx": "vertx",
        },
        module:  loaders.CLIENT_LOADERS(env),
        name: "client",
        output: {
            filename: "js/[name]_[hash].js",
            path:  path.join(__dirname, "dist"),
            publicPath: extras.PUBLIC_PATH(env),
        },
        plugins: plugins.CLIENT_PLUGINS(env),
        resolve: extras.resolve ,
        target: "web",
    };
    if (env.production) {
        client.entry.vendorC = ["react", "lodash", "react-dom", "rxjs", "material-ui" ];
    }
    return ( client );
};
