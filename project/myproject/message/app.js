var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var serve = require('koa-static');
var render = require('./lib/render.js');

var app = koa();

app.use(logger());
app.use(serve(__dirname+'/lib'));

app.use(route.get('/',index));

function * index(){
  this.body = yield render('index');
}


app.listen(3000);
console.log('listening on port 3000');
