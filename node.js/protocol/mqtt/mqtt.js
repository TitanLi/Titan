var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1');

console.log('mqtt.connect');

client.on('connect', function () {
  console.log('on connect');
  client.subscribe('presence');
  client.publish('presence', 'Hello mqtt');
});

client.on('error', function(err) {
  console.log('on error', err);
});

client.on('close', function() {
  console.log('on close');
});

client.on('disconnect', function() {
  console.log('on disconnect');
});

client.on('reconnect', function() {
  console.log('on reconnect');
});

client.on('offline', function() {
  console.log('on offline');
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
