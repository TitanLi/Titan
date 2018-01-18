//平行處理
var sleep = function(value){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(value*value);
    },3000);
  });
}

async function index(){
  var result = await Promise.all([sleep(1),sleep(2)]);
  console.log(result);
}

index();
