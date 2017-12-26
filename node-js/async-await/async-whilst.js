//類是while
//whilst(test,fn,callback)
//test參數返回boolean決定是否繼續
//fn參數為非同步執行的操作，每次fn執行完璧後才會進入下一次迴圈
//callback參數是whilst()函數執行完後的回呼函數

var async = require('async');
var count = 0;
var list = [
  {name:'Titan',age:22},
  {name:'Jack',age:19},
  {name:'vincent',age:24},
  {name:'Lucy',age:26},
  {name:'Apple',age:23}
];

async.whilst(
  () => {
    return count < 5;
  },
  (funCallback) => {
    console.log(count);
    list[count].age += 1;
    count++;
    setTimeout(funCallback,1000);
  },
  (err) => {
    console.log(count);
    console.log(list);
  }
)
