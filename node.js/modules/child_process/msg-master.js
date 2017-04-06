var child_process = require('child_process');

//建立一個子行程，執行msg-child.js
var child = child_process.fork('./msg-child.js');
var child1 = child_process.fork('./msg-child0.js');

//等待子行程所傳送的訊息
child.on('message',function(msg){
  //印出接收到的訊息
  console.log('[master] Received:',msg);
});

//等待命令完成並結束
child.on('close',function(code){
  //印出訊息，以及命令的結束回傳值
  console.log('child process exited with code ' + code);
});

//傳一則訊息給子行程
child.send('Hey!');
