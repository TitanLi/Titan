var koa = require('koa');
var Router = require('koa-router');
var mqtt = require('mqtt');

var app = koa();
var router = new Router();
var server = mqtt.connect('mqtt://127.0.0.1');

router.get('/',function * (){
  console.log('123');
    var client = mqtt.connect('mqtt://127.0.0.1');
      client.on('connect',function(){
        console.log('123');
        client.subscribe('presence');
        client.publish('presence','Hello mqtt');
      });

      client.on('message',function(topic,message){
        console.log(message.toString());
        client.end();
      });
});

server.on('connect',function(){
  server.subscribe('presence');
  server.subscribe('apple');
})

server.on('message',function(topic,message){
  // console.log(topic.toString() +" "+ message.toString());
  var mes = message.toString().split('#');
  // var mes = message.toString();
  // console.log(mes.slice(0,mes.search('#'))+':'+mes.slice(mes.search('#')+1));
  console.log(mes[0]+':'+mes[1]);
});

app.use(router.middleware());
app.listen(3000);
