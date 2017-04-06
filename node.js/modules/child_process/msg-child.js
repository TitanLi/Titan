//等待父行程所傳送的訊息
process.on('message',function(msg){
  //印出接收到的訊息
  console.log('[child] Received:',msg);

  //回傳一則訊息回父行程
  process.send('Got a Message');
});
