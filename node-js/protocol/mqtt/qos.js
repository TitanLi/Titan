var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1');

console.log('mqtt.connect');
var i = 1;
client.on('connect', function() {
    console.log('on connect');
    client.subscribe('apple', { qos: 2 });
    setInterval(function() { client.publish('apple', String(i++), { qos: 2, retain: true }); }, 1000);
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

client.on('message', function(topic, message, packet) {
    // message is Buffer
    console.log(topic);
    console.log(message.toString());
    console.log(packet);
    // client.end();
});