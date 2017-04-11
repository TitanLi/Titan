var koa = require('koa');
var serve = require('koa-static');
var Router = require('koa-router');
var websockify = require('koa-websocket');
var events = require('events');

var app = koa();
var socket = websockify(app);

app.use(serve('./public'));

var eventEmitter = new events.EventEmitter();

var wsRouter = new Router();
wsRouter.get('/',function *(){
  var self = this;

  function pushMessage(message){
    self.websocket.send(message);
  }

  this.websocket.send('Welcome');
  this.websocket.on('message',function(msg){
    eventEmitter.emit('update',msg);
    console.log(msg);
  });

  this.websocket.on('close',function(){
    console.log('disconnect');
    eventEmitter.removeListener('update',pushMessage);
  });

  eventEmitter.on('update',pushMessage);
});

app.ws
  .use(wsRouter.routes())
  .use(wsRouter.allowedMethods());

app.listen(3000);
