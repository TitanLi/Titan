//async串列模式
//series(tasks,callback)

var async = require('async');
console.info("--------Node.js非同步設計：Async series----------------");
console.time("async-series");

async.series([
  (callback) => {
    callback(null,'hello');
  },
  (callback) => {
    setTimeout(()=>{
      callback(null,'async');
    },3000);
  },
  (callback) => {
    setTimeout(()=>{
      callback(null,'series');
      console.timeEnd("async-series");
    },3000);
  }
],(err,results) => {
  console.log(results);
});

console.info("--------Node.js非同步設計：Async series----------------");
