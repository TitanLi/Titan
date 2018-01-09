var koa = require('koa');
var app = koa();
console.info('現在處理程序id：'+process.pid);

process.on('SIGHUP',function(){
  console.log('Got SIGHUP signal.');
});

//可kill其他程序，無法kill目前程序，但可以kill目前程序內的信號
process.kill(process.pid,'SIGHUP');

setTimeout(function(){
  //kill目前程序
  process.exit(0);
},6000);

app.listen(3000);
