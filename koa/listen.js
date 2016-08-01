var koa = require('koa');
var app = koa();
app.listen(3000);

//listen(...)method is simply sugar for the following
var http = require('http');
var koa = require('koa');
var app = koa();
http.createServer(app.callback()).listen(3000);
http.createServer(app.callback()).listen(3001);

//koa-port
var koa = require('koa');
var app = koa();
var port = [3000,3001];

app.use(function * (){
  this.body = 'hello';
})

port.map(function (x){
  app.listen(x);
})
