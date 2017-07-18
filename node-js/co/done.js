var co = require('co');
function a(){
  return function(done){
    console.log("apple1");
    done();
  };
}

co(function * fun(){
  yield a();
  console.log("apple2");
})
