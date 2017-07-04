const path = require('path');
const webpack = require('webpack');

const dll = {
    devtool: 'source-map',
    target: 'web',

    entry: {
        vendor: [
            'react',
            'react-dom',
        ],
    },

    output: {
        path: path.resolve(__dirname, "dll"),
        filename: '[name].dll.js',
        library: '[name]',
    },

    resolve: {
        modules: ['node_modules'],
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname,"dll", '[name].dll.json'),
            name: '[name]',
        })

    ],
};

module.exports = dll;
