var koa = require('koa');

var app = koa();
var port = [3000,3001];

function * foo(args){
  return args;
}

app.use(function * (){
  var result = foo(123);
  //{ value: 123, done: true }
  //result.next().value
  console.log(result.next());
});

port.map(function(x){
  app.listen(x);
});



var koa = require('koa');
var app = koa();

function * foo(){
  var index = 0;
  while (index<2) {
    yield index++;
  }
}

app.use(function * (){
  var bar = foo();
  console.log(bar.next());
  console.log(bar.next());
  console.log(bar.next());
})

app.listen(3000);
