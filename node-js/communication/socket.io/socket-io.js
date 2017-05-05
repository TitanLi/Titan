var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var render = require('./lib/render.js')
var app = koa();
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);

app.use(logger());

app.use(route.get('/',index));

function * index(){

  this.body = yield render('index');
  io.sockets.on('connection',function(client){
    client.emit('event',{date:new Date()});       //發送資料
    console.log('connection');

    client.on('client_data', function(data) {     // 接收來自於瀏覽器的資料
      console.log(data.data);
    });
  });
}

server.listen(3000);
console.log('listening on port 3000');
