// Add this to the very top of the first file loaded in your app
var apm = require('elastic-apm-node').start({
  serviceName: 'launch-store',
  secretToken: 'Y7d7OSEPrk8D6la7LN',
  serverUrl: 'https://83b3f99bef9b414cbf05f09b44fcfc4f.apm.us-east-1.aws.cloud.es.io:443',
  environment: 'production'
})
const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const routes = require('./routes');
const session = require('./config/session');

const server = express();

server.use(session);
server.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true
});

server.listen(80, function () {
  console.log('server is running on port 80.');
});
