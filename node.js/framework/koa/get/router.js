var koa = require('koa');
var router = require('koa-router')();

var app = koa();
const port = 3001;

router.get('/index','/aaaa',
  function * (next){
    this.body = "hello";
  })

router.get('/user/:name',
  function * (next){
    this.body = this.params.name;
  })

router.redirect('/index','/aaaa')

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port);
