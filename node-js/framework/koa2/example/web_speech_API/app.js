var koa = require('koa');
var Router = require('koa-router');
var logger = require('koa-logger');
var serve = require('koa-static');
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');
var render = require('./lib/render.js');

var app = new koa();
var router = Router();
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname+'/lib'));
app.use(serve(__dirname+'/img'));

router.get('/',async function(ctx){
  ctx.body = await render('index');
});


app.use(router.routes());
app.listen(3000,function(){
  console.log('listening on port 3000');
});
