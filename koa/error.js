var koa = require('koa');
var app = koa();

function * foo(){
  try{
    x = yield 'B';
  }catch(err){
    throw err;
  }
}

app.use(function * (){
  var bar = foo();
  if(bar.next().value == 'B'){
    bar.throw(new Error("it is B!"));
  }
});

app.listen(3000);
