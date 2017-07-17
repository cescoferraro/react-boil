var path = require("path");
var webpack = require("webpack");

module.exports = (env) => ( {
    entry: {
        vendor: [
            "react",
            "react-dom",
        ],
    },
    output: {
        filename: "[name].dll.js",
        library: "[name]",
        path: path.join(__dirname, "dll"),
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            name: "[name]",
            path: path.join(__dirname, "dll", "[name].dll.json"),
        }),
    ],
});
