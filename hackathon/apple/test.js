var request = require('request');
var test = new Array();

function reqFun(callback){
  request('http://127.0.0.1:3000/popular', function (error, response, body) {
    test = JSON.parse(body);
    callback();
  });
}

reqFun(
  function (){
    for(key in test){
      console.log(test[key].brand,test[key].count);
    }
  }
);
