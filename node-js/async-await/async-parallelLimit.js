//和parallel類是，但是多了limit參數限制任務只能同時併發一定的量

var async = require('async');

console.time('parallelLimit');
async.parallelLimit([
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
],
1,
(err,results) => {
  console.log(results);
  console.timeEnd('parallelLimit');
});
