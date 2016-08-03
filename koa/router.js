var koa = require('koa');
var Router = require('koa-router');

var app = koa();
var router = new Router();
// 統一添加/users
// var router = new Router({
//   prefix : '/users'
// });

router.get('/',function * (){
  this.body = 'HOME';
});

router.get('/myapi',function * (){
  this.body = 'API';
});

app.use(router.middleware());
app.listen(3000);
