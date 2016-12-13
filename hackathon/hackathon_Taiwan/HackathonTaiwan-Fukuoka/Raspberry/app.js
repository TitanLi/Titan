var SerialPort = require('serialport');
var mqtt = require('mqtt');
var dateFormat = require('dateFormat');

var server = mqtt.connect('mqtt://60.249.15.88:1883');

var port = SerialPort.SerialPort('/dev/ttyUSB0',{
  baudRate : 9600,
  parser : SerialPort.parsers.readline('\n')
});

server.on('connect', function() {
    server.subscribe('/status/api');
});

port.on('open',function(){
  port.on('data',function(data){
    var dataStr = data.toString().split('\n');
    var day = dateFormat('yyyy-mm-dd h:mm:ss');
    var mes = dataStr[0].split('data');
    var dataJson = mes[1].split('FF');
    var json = {
            "peopleID":"01",
            "data":{
                    "sou":dataJson[0],
                    "air":dataJson[1],
                    "hum":dataJson[2],
                    "tmp":dataJson[3],
                    "gas":dateFormat[4],
                    "sdb":dataJson[5],
                    "date":date
                  }
           }
    server.publish('/mqtt/status',JSON.stringify(json));
  });
});
