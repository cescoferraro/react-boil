var path = require("path");
var webpack = require("webpack");

module.exports = (env)=>( {
    entry: {
        vendor: [
	    "react",
	    "react-dom"
	]
    },
    output: {
        path: path.join(__dirname, "dll"),
        filename: "[name].dll.js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "dll","[name].dll.json"),
            name: "[name]",
	    context: __dirname 
        }),
    ]
});
