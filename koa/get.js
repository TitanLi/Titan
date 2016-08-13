var koa = require('koa');
var Router = require('koa-router');

var app = koa();
var router = new Router();

router.get('/',function * (){
  //127.0.0.1:3000/?name=xxx;
  console.log(this.request.query.name);
});

app.use(router.middleware());
app.listen(3000);
