//非同步串列json

var async = require('async');

async.series({
  one:(callback) => {
    callback(null,'hello');
  },
  two:(callback) => {
    callback(null,'async');
  },
  three:(callback) => {
    callback(null,'series');
  }
},(err,results) => {
  console.log(results);
})
