function promise(s){
  return new Promise(function (resolve,reject){
    setTimeout(resolve,s);
    // reject('error');
  });
}

promise().then(function(resolveValue){
  // console.log(resolveValue);
  console.log(1);
  return promise(6000);
},function(rejectValue){
  // console.log(rejectValue);
}).then(function(value){
  console.log(2);
}).catch(function(error){
  console.log(error);
});
