var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');
var logger = require('koa-logger');
var locale = require('koa-locale');
var views = require('koa-views');
var path = require('path');

// Loading settings
var settings = require('./lib/config.js');
if (!settings) {
	console.error('Failed to load settings');
	process.exit(1);
}

var app = koa();

// Static file path
app.use(serve(path.join(__dirname, 'public')));

// Show server logger
app.use(logger());

// Enabling BODY
app.use(bodyParser());

// Setup default locale
locale(app, 'en');

// Create render
app.use(views(__dirname + '/views', {
    extension: 'pug',
    map: {
        html: 'pug'
    }
}));

var router = new Router();

// Routes
app.use(require('./routes/views').middleware());

app.use(router.middleware());

// Start the server
app.listen(settings.general.server.port, function() {
	console.log('server is running at port', settings.general.server.port);
});