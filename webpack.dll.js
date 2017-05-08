var path = require("path");
var webpack = require("webpack");

module.exports = (env)=>( {
    entry: {
        vendor: ["react","react-dom"]
    },
    output: {
        path: path.join(__dirname, "dist", "dll"),
        filename: "[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist","dll", "[name].json"),
            name: "[name]",
            context: path.resolve(__dirname, "client")
        }),
    ]
});
