var koa = require('koa');

var app = koa();

app.use(function * (){
  console.log('1');
  yield titan.call(this);

  function * apple(){
    console.log('2');
  }

  function * titan(){
    console.log('3');
  }
});

app.listen(3001);






var koa = require('koa');

var app = koa();

function * random(next){
  console.log('2');
  yield next;
}

function * backwards(next){
  console.log('3');
  yield next;
}

function * pi(next){
  console.log('4');
}

function * all(next){
  console.log('1');
  yield random.call(this,backwards.call(this,pi(this,next)));
}

app.use(all);
app.listen(3000);
