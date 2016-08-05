var koa = require('koa');
var Router = require('koa-router');

var app = koa();
var router = new Router();

router.get('/apple',function * (){
  this.redirect('/titan');
});

router.get('/titan',function * (){
  this.body = 'titan';
});

app.use(router.middleware());
app.listen(3000);
