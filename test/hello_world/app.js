var koa = require('koa');
var Router = require('koa-router');
var logger = require('koa-logger');
var serve = require('koa-static');
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');
var mongodb = require('mongodb');
var render = require('./lib/render.js');

var mongodbServer = new mongodb.Server('127.0.0.1', 27017, {
    auto_reconnect: true
});
var db = new mongodb.Db('test', mongodbServer);

var app = koa();
var router = new Router();

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname+'/lib'));

router.get('/',function * (){
  this.body = "<form action='/insert' method='get'>"+
              "<input type='text' name='test' id='test'/>"+
              "<input type='submit' value='送出'/>"+
              "</form>"
});

app.use(router.middleware());
app.listen(3000,function(){
  console.log('listening on port 3000');
});
