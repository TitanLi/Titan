var koa = require('koa');
var Router = require('koa-router');

var app = koa();
var router = new Router();
var port = [3000,3001];

router.get('/',function * (){
  try{
    yield function(done){
      setTimeout(function(){
        done(new Error('WRONG'));
      },10000);
    }
  }catch(err){
    console.log(err);
  }
});

app.use(router.middleware());
port.map(function(x){
  app.listen(x);
});
