const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const cacheTime = 86400000 * 30;
const maxAge = { maxAge: cacheTime };
app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(compression());
app.use('/js', express.static(path.join(__dirname, 'js'), maxAge));
app.use('/vendor', express.static(path.join(__dirname, 'vendor'), maxAge));
app.use('/icons', express.static(path.join(__dirname, 'icons'), maxAge));
app.use('/css', express.static(path.join(__dirname, 'css'), maxAge));
app.use('/html', express.static(path.join(__dirname, 'html'), maxAge));
app.use('/flags', express.static(path.join(__dirname, 'flags'), maxAge));
app.use('/images', express.static(path.join(__dirname, 'images'), maxAge));
app.use('/appcache', express.static(path.join(__dirname, 'appcache'), maxAge));
const clientStats = require('./stats.json');
const outputPath = __dirname;

app.get('/service-worker.js', (req, res) => {
  res.sendFile('./service-worker.js', {
    root: './',
    maxAge: cacheTime
  });
});

app.get('/manifest.json', (req, res) => {
  res.sendFile('/manifest.json', {
    root: './icons',
    maxAge: cacheTime
  });
});

app.get('/OneSignalSDKWorker.js', (req, res) => {
  res.sendFile('/OneSignalSDKWorker.js', {
    root: './signal',
    maxAge: 86400000 * 30
  });
});

app.get('/OneSignalSDKUpdaterWorker.js', (req, res) => {
  res.sendFile('/OneSignalSDKUpdaterWorker.js', {
    root: './signal',
    maxAge: 86400000 * 30
  });
});

app.use(
  require('./server/main').default({
    production: true,
    clientStats,
    outputPath
  })
);
app.listen(5000);
