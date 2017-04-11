var child_process = require('child_process');

//建立一個子行程，執行child.js
var child = child_process.fork('./child.js');

//等待命令完成並結束
child.on('closs',function (code){
  //印出訊息，以及命令的結束回傳值
  console.log('child process exited with code ' + code);
});
