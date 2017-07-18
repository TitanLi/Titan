var fs = require('fs');
var co = require('co');

var readFile = function(path,encoding){
  return function(done){
    fs.readFile(path,encoding,function(err,connect){
      if(!err){
        done(null,connect.toString());
      }else{
        console.log('Failed to read');
      }});
  };
};

co(function * (){
  var fileContent = yield readFile('./index.txt','utf8');
  console.log(fileContent);
  var fileCOntent1 = yield [readFile('./index.txt','utf8'),readFile('./index1.txt','utf8')];
  console.log(fileCOntent1);
});
