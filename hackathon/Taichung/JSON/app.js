var koa = require('koa');
var Router = require('koa-router');
var json = require('koa-json');

var app = koa();
var router = new Router();

app.use(json());

router.get('/LoRa',function * (req,res){
  this.body = { foo: 'bar' };
});

app.use(router.middleware());
app.listen(3000);
