var koa = require('koa');

var result = yield function(done){
  setTimeout(function(){
    done(null,hello);
  },10000);
}
console.log(result);
