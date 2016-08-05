var koa = require('koa');
var Router = require('koa-router');
var mqtt = require('mqtt');

var app = koa();
var router = new Router();
var server = mqtt.connect('mqtt://127.0.0.1');
var name = '';

router.get('/',function * (){
  var client = mqtt.connect('mqtt://127.0.0.1');
  name = this.request.query.name;
  client.on('connect',function (){
    client.subscribe('presence');
    client.publish('presence',name+'#'+'Hello apple');
  });
});

server.on('connect',function (){
  server.subscribe('presence');
});

server.on('message',function(topic,message){
  var mes = message.toString().split('#');
  console.log(mes[0]+':',mes[1]);
});

app.use(router.middleware());
app.listen(3002);
