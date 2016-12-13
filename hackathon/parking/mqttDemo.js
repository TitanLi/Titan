var mqtt = require('mqtt');
var server = mqtt.connect("mqtt://127.0.0.1");

server.on('connect',function(){
  server.subscribe("parking");
  server.subscribe("money");
  server.publish("money","4824aae0##1##true");
  // setTimeout(function(){
  //   server.publish("parking","aabbff##1##true");
  // },1000);
});

server.on('message',function(){
  // setTimeout(function(){
  //   server.publish("parking","aabbff##1##true");
  // },1000);
  server.publish("money","aabbff##1##true");
});
