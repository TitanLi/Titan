var sleep = function(value){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(value*value);
    },3000);
  });
}

var errorSleep = () => {
  return new Promise(function(resolve,reject){
    setTimeout(() => {
      reject('ErrorSleep');
    },3000);
  });
}

var index = async () => {
  try{
    var result1 = await sleep(3);
    console.log("result1:"+result1);
    var result2 = await errorSleep();
  }catch(err){
    console.log(err);
  }
}

index();
