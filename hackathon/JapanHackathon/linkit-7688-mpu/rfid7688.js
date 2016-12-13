var SerialPort = require('serialport');
var mqtt = require('mqtt');
var dateFormat = require('dateformat');
var conMqtt = require('./con-mqtt.json');

var port = new SerialPort.SerialPort('/dev/ttyS0',{
        baudRate : 57600,
        parser : SerialPort.parsers.readline('\n')
});
var server = mqtt.connect(conMqtt.broker);

server.on('connect',function(){
        server.subscribe(conMqtt.topic);
});

port.on('open',function(){
        console.log('ok');
        port.on('data',function(data){
                console.log('Data:'+data);
                var mes = data.split('\r');
                var day = dateFormat('yyyy-mm-dd h:mm:ss');
                var card = { 'rfid' : mes[0] , 'time' : day};
                server.publish(conMqtt.topic,JSON.stringify(card));
        });
});
