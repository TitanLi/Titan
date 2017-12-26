//queue可想像是parallel的加強版，其功能實際上是一個串列的訊息序列，透過限制worker數量，不再一次性全部執行
//當worker數量不夠時，新加入的任務將會排隊等候，直到有心的worker可用
//該函數有多個點可供回傳，如worker用完、無等候任務時、全部執行完時
//queue(worker,concurrency)

var async = require('async');

var q = async.queue((task,callback) => {
  console.log('worker is processing task:',task.name);
  callback();
},2);

q.push({name:'foo'},(err) => {
  setTimeout(() => {
    console.log('finished processing foo');
  },3000);
});

q.push({name:'bar'},(err) => {
  setTimeout(() => {
    console.log('finished processing bar');
  },3000);
});

q.push({name:'cap'},(err) => {
  console.log('finished processing cap');
});

q.push({name:'egg'},(err) => {
  console.log('finished processing egg');
});

q.push({name:'app'},(err) => {
  console.log('finished processing app');
});

q.push({name:'apple'},(err) => {
  console.log('finished processing apple');
});

//無等候任務時
q.empty = () => {
  console.log('no more tasks wating');
};

//全部執行完時
q.drain = () => {
  console.log('all tasks have been processed');
}
