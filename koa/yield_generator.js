var koa = require('koa');
var Router = require('koa-router');

var app = koa();
var router = new Router();



router.get('/',function * (){
  console.log('start');
  yield function(done){
    setTimeout(function(){
      console.log('TIMEOUT');
      done();
    },10000);
  };
  console.log('END');
})

app.use(router.middleware());
app.listen(3000);
