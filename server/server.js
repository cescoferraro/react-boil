const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const maxAge = { maxAge: 86400000 * 30 };
const maxAgeJS = { maxAge: 86400000 * 30 };
const maxAgeII = { root: './', maxAge: 86400000 * 30 };
app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(compression());
app.use('/js', express.static(path.join(__dirname, 'js'), maxAgeJS));
app.use('/vendor', express.static(path.join(__dirname, 'vendor'), maxAge));
app.use('/icons', express.static(path.join(__dirname, 'icons'), maxAge));
app.use('/css', express.static(path.join(__dirname, 'css'), maxAge));
app.use('/html', express.static(path.join(__dirname, 'html'), maxAge));
app.use('/images', express.static(path.join(__dirname, 'images'), maxAge));
app.use('/appcache', express.static(path.join(__dirname, 'appcache'), maxAge));
const clientStats = require('./stats.json');
const outputPath = __dirname;
app.get('/service-worker.js', (req, res) => {
  res.sendFile('./service-worker.js', maxAgeII);
});
app.get('/sw.js', (req, res) => {
  res.sendFile('./sw.js', maxAgeII);
});
app.get('/index.html', (req, res) => {
  res.sendFile('./index.html', maxAgeII);
});
app.use(
  require('./server/main').default({
    production: true,
    clientStats,
    outputPath
  })
);
app.listen(5000);
