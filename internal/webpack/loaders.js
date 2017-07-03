const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

const SERVER_LOADERS = (env)=>{
    let loader = [
	{ test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader" },
	{
	    test: /\.css$/,
	    exclude: /node_modules/,
	    use: {
		loader: 'css-loader/locals',
		options: {
		    modules: true,
		    localIdentName: '[name]__[local]--[hash:base64:5]'
		}
	    }
	}
    ]
    return {rules:loader}
};

const CLIENT_LOADERS = (env)=>{
    let loader = [
	{ test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader" },
	{
	    test: /\.css$/,
	    use: ExtractCssChunks.extract({
		use: {
		    loader: 'css-loader',
		    options: {
			modules: true,
			localIdentName: '[name]__[local]--[hash:base64:5]'
		    }
		}
	    })
	}
    ]
    return {rules:loader}
};

module.exports = {
    CLIENT_LOADERS: CLIENT_LOADERS,
    SERVER_LOADERS: SERVER_LOADERS 
};
