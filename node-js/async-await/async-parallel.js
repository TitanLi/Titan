//非同步並行模式
//parallel(tasks,callback);
//tasks可為Array,JSON

var async = require('async');

console.time('parallel');
async.parallel([
  (callback) => {
    setTimeout(() => {
      callback(null,'one');
    },2000);
  },
  (callback) => {
    setTimeout(() => {
      callback(null,'two');
    },1000);
  }
],(err,results) => {
  console.log(results);
  console.timeEnd('parallel');
});
