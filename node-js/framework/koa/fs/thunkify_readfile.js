var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);

function * bar(){
  try{
    var x = yield read('input.txt');
  }catch(err){
    throw err;
  }
  console.log(x);
}

var gen = bar();

//gen.next().value read function
gen.next().value(function(err,data){
  if(err){
    gen.throw(err);
  }
  gen.next(data.toString());
});
