var net = require('net');

var server = net.createServer();

server.listen(3000);
//當新的連線被建立
server.on('connection',function(socket){
  console.log('new connection');

  //socket 中對連線時觸發
  socket.on('end',function(){
    console.log('Disconnected');
  });

  //接收client訊息
  socket.on('data',function(mes){
    console.log(mes.toString());
    var str = mes.toString();

    //傳送訊息給client
    if(str == 'write'){
      socket.write('write');
    }

    //中斷client連線
    if(str == 'end'){
      socket.destroy();
    }
  });
});
