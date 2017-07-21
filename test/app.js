var koa = require('koa');
var Router = require('koa-router');

var app = koa();
var router = new Router();

// function * fun1(){
//   yield function(done){setTimeout(function(){
//       console.log(1);
//       done();
//     },3000);
//   }
// }
// function * fun2(){
//   yield function(done){setTimeout(function(){
//       console.log(2);
//       done();
//     },3000);
//   }
// }
// router.get('/',function *(){
//   yield * fun1();
//   yield * fun2();
//   this.body = 'apple';
// })

// router.get('/',
//   function * (next){
//     yield function(done){
//       setTimeout(function(a){
//       console.log(1);
//       done();
//       },3000);
//     }
//     yield next;
//   },
//   function * (next){
//     setTimeout(function(){
//       console.log(2);
//     },3000);
//   });

var a = function(done){
  setTimeout(function(){
    console.log(1);
    done();
  },3000);
}

var a1 = function(done){
  setTimeout(function(){
    console.log(2);
    done();
  },3000);
}

router.get('/',function * (){
  yield a;
  yield a1;
  console.log(3);
  this.body = 'apple';
});
app.use(router.middleware());
app.listen(3000);
