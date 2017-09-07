var myFirstPromise = new Promise(function(resolve,reject){
  // 當非同步作業成功時，呼叫 resolve(...),而失敗時則呼叫 reject(...)。
  setTimeout(function(){
    // 成功時(解決)
    resolve("success");
    // 失敗時(拒絕)
    reject("fail");
  },6000);
});

myFirstPromise.then(function (successMessage){
  // on fulfillment(已實現時)
  console.log(successMessage);
}, function(reason) {
  // on rejection(已拒絕時)
});
