var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

var app = koa();
var router = new Router();

app.use(bodyParser());

router.post('/',function * (){
  console.log(this.request.body);
  this.body = 'ok';
});


app.use(router.middleware());
app.listen(3000);
