var child_process = require('child_process');

//第一個參數『命令名稱』 第個參數『帶入命令的參數』
var ls = child_process.spawn('ls',['-lh','/usr']);

//接收命令結果
ls.stdout.on('data',function(data){
  console.log('stdout:'+data);
});

//接收錯誤訊息
ls.stderr.on('data',function(data){
  console.log("stderr:"+data);
});

//等待命令完成並結束
ls.on('close',function(code){
  console.log('child_process exited with code ' + code);
});
