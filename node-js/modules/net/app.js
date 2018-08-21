var net = require('net');

var client = new net.Socket();
client.connect(9807, '10.21.20.148', function() {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});