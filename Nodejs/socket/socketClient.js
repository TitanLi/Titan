var net = require('net');

var socket = new net.Socket();

//建立連線
socket.connect(3000,'127.0.0.1',function(){
  console.log('connection');
  //傳送訊息
  socket.write('end');

  //接收server訊息
  socket.on('data',function(mes){
    console.log(mes.toString());
  });

  //當client被中斷時觸發
  socket.on('end',function(){
    console.log('end');
    process.exit();
  });

  //中斷連線
  // socket.destroy();
});
