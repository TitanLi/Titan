//順序處理
var sleep = function(value){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(value*value);
    },3000);
  });
}

var index = async () => {
  var result1 = await sleep(1);
  console.log(result1,result2,result3);
  var result2 = await sleep(2);
  console.log(result1,result2,result3);
  var result3 = await sleep(3);
  console.log(result1,result2,result3);
}

index();
