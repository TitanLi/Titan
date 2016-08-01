var koa = require('koa');
var app = koa();

app.use(function * (next){
  yield next;
  console.log('3');
})

app.use(function * (next){
  yield next;
  console.log('2');
})

app.use(function * (next){
  console.log(1);
  this.body = 'hello';
})

app.listen(3000);
