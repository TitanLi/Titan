var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var serve = require('koa-static');
var render = require('./lib/render');

var app = koa();

app.use(logger());
app.use(serve('./views'));

app.use(route.get('/',index));
app.use(route.get('/customer',customer));
app.use(route.get('/project',project));
app.use(route.get('/staff',staff));

function * index(){
  this.body = yield render('index');
}

function * customer(){
  this.body = yield render('customer');
}

function * project(){
  this.body = yield render('project');
}

function * staff(){
  this.body = yield render('staff');
}

app.listen(3000);
console.log('listening on port 3000');
