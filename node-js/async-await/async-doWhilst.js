//與do...while類似
//doWhilst(fn,test,callback)
//至少做一次回圈動作

var async = require('async');
var count = 0;
var list = [
  {name:'Titan',age:22},
  {name:'Jack',age:19},
  {name:'vincent',age:24},
  {name:'Lucy',age:26},
  {name:'Apple',age:23}
];

async.doWhilst(
  (callback) => {
    console.log(count);
    list[count].age += 1;
    count++;
    setTimeout(callback,1000);
  },
  () => {
    return count < 5;
  },
  (err) => {
    console.log(count);
    console.log(list);
  }
)
