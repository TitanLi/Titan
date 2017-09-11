var koa = require('koa');
var Router = require('koa-router');
var logger = require('koa-logger');
var serve = require('koa-static');
var app = koa();
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
var events = require('events');
var request = require('request');
var render = require('./lib/render.js');

var router = new Router();
var eventEmitter = new events.EventEmitter();

var sensorID;
var bodyAry = new Array();

app.use(logger());
app.use(serve(__dirname+'/lib'));

router.get('/',index);

//裝置狀態
var data = {
  userID:"59b230fb22d1bb3c2737f836"
}

setInterval(function(){
  request.post('http://smart-factory.nutc-imac.com/sensor/status', {form:data},function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error(err);
    }
    var bodyJSON = JSON.parse(body);
    // console.log('body', body);
    var bodyData = bodyJSON[0].data;
    for(key in bodyData){
      console.log(bodyData[key]);
      bodyAry[parseInt(bodyData[key].containerPosition)] = bodyData[key].percent;
    }
  });
  eventEmitter.emit('update');
  console.log(bodyAry);
},1000);

io.sockets.on('connection',function(client){
  eventEmitter.on('update',function(){
    client.emit('event',{
                         sensorID:sensorID,
                         R_1:bodyAry[1],
                         R_2:bodyAry[2],
                         R_3:bodyAry[3],
                         R_4:bodyAry[4],
                       });
  });
});

function * index(){
  this.body = yield render('index');
}

app.use(router.middleware());
server.listen(3000,function(){
  console.log('listening on port 3000');
});
