var koa = require('koa');
var serve = require('koa-static');
var Router = require('koa-router');
var websockify = require('koa-websocket');
var events = require('events');

var app = koa();
var socket = websockify(app);

app.use(serve('./public'));

var eventEmitter = new events.EventEmitter();

var router = new Router();

router.get('/',function * (){
  var socket = this;
  this.websocket.send('Welcome');

  this.websocket.on('message',function(msg){
    console.log(msg);
    console.log('b');
    socket.websocket.send('hello');
    eventEmitter.emit('update',msg);
  });

  eventEmitter.on('update',function(message){
    socket.websocket.send(message);
  });
});

app.ws
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
