var path = require("path");
var webpack = require("webpack");

module.exports = (env)=>( {
    entry: {
        vendor: ["react","react-dom"]
    },
    output: {
        path: path.join(__dirname, "dll"),
        filename: "dll.js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "dll","[name].json"),
            name: "[name]",
            context: path.resolve(__dirname, "client")
        }),
    ]
});
