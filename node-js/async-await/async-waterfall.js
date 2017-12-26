//非同步設計瀑布模式
//waterfall(tasks,callback)
//callback(null,1) ==> 如果第一個參數非空時，流程將會在此終止

var async = require('async');

async.waterfall([
  (callback) => {
    callback(null,1);
  },
  (data,callback) => {
    console.log(data);
    callback('test',2);
  },
  (data,callback) => {
    callback(null,3);
  }
],(err,results) => {
  console.log(results);
});
