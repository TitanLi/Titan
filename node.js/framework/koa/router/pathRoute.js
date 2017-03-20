var koa = require('koa');
var app = koa();
var port = 3000;

app.use(function * (next){
  if(this.path !== '/'){
    return yield next ;
  }
  this.body = 'hello world';
});

app.use(function * (next){
  if(this.path !== '/hello'){
    return yield next ;
  }
  this.body = 'hello';
});

app.use(function * (next){
  if(this.path !== '/404'){
    return yield next;
  }
  this.body = 'page not found';
});

app.listen(port);
