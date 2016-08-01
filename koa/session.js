var koa = require('koa');
var Router = require('koa-router');
var session = require('koa-session');

var app = koa();
var router = new Router();

app.keys = ['aegrwgragah'];

app.use(session(app));

app.use(function * (next){
  if(!this.session.counter){
    this.session.counter = 0;
  }
  this.session.counter++;

  yield next;
});

router.get('/',function * (){
  this.body = this.session.counter;
});

app.use(router.middleware());
app.listen(3000);
