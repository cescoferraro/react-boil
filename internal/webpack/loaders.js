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

const IMAGES = (client = false) => {
    return   {
	test: /\.(gif|png|jpe?g|svg)$/i,
	loaders: [
	    {
		loader: 'file-loader',
		query: {
		    emitFile: client ,
		    name:"images/img-[sha512:hash:base64:7].[ext]"
		}
	    },
	    {
		loader: 'image-webpack-loader',
		query: {
		    mozjpeg: {
			progressive: true,
		    },
		    gifsicle: {
			interlaced: false,
		    },
		    optipng: {
			optimizationLevel: 4,
		    },
		    pngquant: {
			quality: '75-90',
			speed: 3,
		    },
		}
	    }
	]
    }
}

const TypeScript = () => (
    { test: /\.tsx?$/, 
      exclude: /node_modules/, 
      loader: "awesome-typescript-loader",
      options: {
          sourceMap: true, 
          useCache: true, 
          useBabel: false 
      }
    }
)

const CSS_HELPER = (client) => {
    return {
	loader:   client ? 'css-loader' : 'css-loader/locals' ,
	options: {
	    modules: true,
	    localIdentName: '[name]__[local]--[hash:base64:5]'
	}
    }
}

const CSS = (client = false) =>{
    const local = [ CSS_HELPER(client) ]
    return {
	test: /\.css$/,
	use: client ? ExtractCssChunks.extract({use: local}) : local
    }
}

const SERVER_LOADERS = (env)=>({
    rules:[IMAGES(), TypeScript(), CSS()]
})

const CLIENT_LOADERS = (env)=>({
    rules:[IMAGES(true), TypeScript(), CSS(true)]
}) 

module.exports = {
    CLIENT_LOADERS: CLIENT_LOADERS,
    SERVER_LOADERS: SERVER_LOADERS 
};

