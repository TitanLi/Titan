var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1');

client.on('connect',function(){
  client.subscribe('presence');
  client.publish('presence','Hello mqtt');
});

client.on('message',function(topic,message){
  console.log(message.toString());
  client.end();
});
