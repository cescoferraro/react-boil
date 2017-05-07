const path = require('path');
const webpack = require('webpack');
const dist = path.join(__dirname, 'dist');

module.exports = (env)=>[ 
    require("./webpack.client.js")(env), 
    require("./webpack.server.js")(env) 
];
