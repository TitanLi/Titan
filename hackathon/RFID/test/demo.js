var mqtt = require('mqtt');

var server = mqtt.connect('mqtt://test.mosquitto.org');

server.on('connect',function(){
  server.subscribe('/RFID/v1/NUTC');
});

server.on('message',function(topic,message){
  var mes = message;
  console.log(JSON.parse(mes));
});
