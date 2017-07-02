const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
app.disable('x-powered-by');
app.use(morgan("combined"));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));
app.use('/icons', express.static(path.join(__dirname, 'icons')));
app.use('/css', express.static(path.join(__dirname, 'css')));
const clientStats = require('./stats.json')
const outputPath = "http://localhost:4000/"
app.use(require("./server/main").default({ production: true, clientStats , outputPath}));
app.listen(5000);
