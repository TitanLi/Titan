var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var render = require('./lib/render.js')
var app = koa();
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);

app.use(logger());

app.use(route.get('/', index));

function* index() {
  this.body = yield render('index');
}

io.sockets.on('connection', function (client) {
  let ans = "";
  console.log('connection');
  setInterval(() => {
    client.emit('subscriberRecevie', { 'data': JSON.stringify({ 'from': "123", 'message': 'asd' }) });
  }, 3000);
  client.on('publishSend', function (data) {     // 接收來自於瀏覽器的資料
    console.log(data);
    client.emit('subscriberRecevie', { data: data });       //發送資料
  });
});

server.listen(3000);
console.log('listening on port 3000');
