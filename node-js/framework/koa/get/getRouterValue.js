var koa = require('koa');
var Router = require('koa-router');
var logger = require('koa-logger');
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');
var views = require('co-views');

var render = views(__dirname,{
                    map : {html : 'swig'}
                  });

var app = koa();
var router = new Router();

app.use(json());
app.use(logger());
app.use(bodyParser());

router.get('/',function * (){
  console.log(this.request.query.name);
  this.body = yield render("index");
});

app.use(router.middleware());
app.listen(3000);
console.log("listening 3000 port");
