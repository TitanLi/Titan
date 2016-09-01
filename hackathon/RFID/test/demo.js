var mqtt = require('mqtt');

// var server = mqtt.connect('mqtt://test.mosquitto.org');
var server = mqtt.connect('mqtt://10.26.1.112:1883');
var mes;

server.on('connect',function(){
  server.subscribe('/RFID/NUTC/IMAC/IOT');
});

server.on('message',function(topic,message){
  console.log(JSON.parse(message));
});
