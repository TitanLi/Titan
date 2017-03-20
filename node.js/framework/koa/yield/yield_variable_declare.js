var koa = require('koa');
var Router = require('koa-router');

var app = koa();
var router = new Router();

router.get('/',function * (){
  var result = yield function(done){
    setTimeout(function(){
      done(null,'hello world');
    },10000);
  }
  console.log(result);
  this.body = result;
});

app.use(router.middleware());
app.listen(3000);
