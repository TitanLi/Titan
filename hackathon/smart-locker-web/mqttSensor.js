var koa = require('koa');
var mqtt = require('mqtt');

var app = koa();
var server = mqtt.connect("mqtt://127.0.0.1:1883");

server.on('connect',function(){
  server.subscribe("smart-locker");
});

server.on('message',function(topic,message){
  console.log("topic : " + topic.toString() +"\tmessage : " + message.toString());
});
app.use(function * (){
  this.body = "Hello Mqtt";
  server.publish("smart-locker","123##456##789##159");
});

app.listen(3001);
