module.exports = env => [
  require('./webpack.client.js')(env),
  require('./webpack.server.js')(env)
];
