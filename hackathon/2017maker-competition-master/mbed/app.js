var koa = require('koa');
var Router = require('koa-router');
var logger = require('koa-logger');
var serve = require('koa-static');
var app = koa();
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
var events = require('events');
var render = require('./lib/render.js');

var router = new Router();
var eventEmitter = new events.EventEmitter();

var sensorID;
var R_1,R_2,R_3,R_4;

app.use(logger());
app.use(serve(__dirname+'/lib'));

router.get('/',index);
router.get('/mbed/:sensorID/:w1/:w2/:w3/:w4/',mbed);


io.sockets.on('connection',function(client){
  eventEmitter.on('update',function(){
    client.emit('event',{
                         sensorID:sensorID,
                         R_1:R_1,
                         R_2:R_2,
                         R_3:R_3,
                         R_4:R_4,
                       });
  });
});

function * index(){
  this.body = yield render('index');
}

function * mbed(){
  let request = this.params;
  sensorID = request.sensorID;
  R_1 = request.w1/1000*100;
  R_2 = request.w2/1000*100;
  R_3 = request.w3/1000*100;
  R_4 = request.w4/1000*100;
  eventEmitter.emit('update');
  this.body = {
    R_1:R_1,
    R_2:R_2,
    R_3:R_3,
    R_4:R_4
  }
}
app.use(router.middleware());
server.listen(3000,function(){
  console.log('listening on port 3000');
});
