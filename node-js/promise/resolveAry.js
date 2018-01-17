var delay = (r,s) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve([r,s]);
    },s);
  });
}

delay('a',1).then((value) => {
  console.log(value[0]+":"+value[1]);
  return delay('b',1000);
}).then((value) => {
  console.log(value[0]+":"+value[1]);
  return delay('c',2000);
}).then((value) => {
  console.log(value[0]+":"+value[1]);
}).catch((value) => {
  console.log(value);
});
