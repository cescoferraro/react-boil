const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

const postCSS =  {
    loader: 'postcss-loader',
    options: {
	plugins: (loader) => [
	    require('postcss-import')({ root: loader.resourcePath }),
	    require("postcss-cssnext")({
		browsers: '> 0%', customProperties: true,
		colorFunction: true, customSelectors: true
	    }),
	]
    }
}

const SERVER_LOADERS = (env)=>{
    let loader = [
	{ test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader",
          options: {
              sourceMap: true, 
              useCache: true, 
              useBabel: false 
          }

	},
	{
	    test: /\.pcss$/,
	    exclude: /node_modules/,
	    use: [ 
		{
		    loader: 'css-loader/locals',
		    options: {
			modules: true,
			localIdentName: '[name]__[local]--[hash:base64:5]'
		    }
		},
		postCSS
	    ]
	}
    ]
    return {rules:loader}
};

const CLIENT_LOADERS = (env)=>{
    let loader = [
      { test: /\.ejs$/, loader: 'ejs-loader?variable=data' },
	{ test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader" ,
          options: {
              sourceMap: true, 
              useCache: true, 
              useBabel: false 
          }
	},
	{
	    test: /\.pcss$/,
	    use: ExtractCssChunks.extract({
		use: [
		    {
			loader: 'css-loader',
			options: {
			    modules: true,
			    localIdentName: '[name]__[local]--[hash:base64:5]'
			}
		    },
		    postCSS
		]
	    })
	}
    ]
    return {rules:loader}
};

module.exports = {
    CLIENT_LOADERS: CLIENT_LOADERS,
    SERVER_LOADERS: SERVER_LOADERS 
};

