var SerialPort = require("serialport");
var request = require('request');
var events = require('events');

var eventEmitter = new events.EventEmitter();

var port = new SerialPort("/dev/ttyACM0", {
    parser: SerialPort.parsers.readline('\n')
});

var url;
eventEmitter.on('update',function(){
  console.log(url);
  request(url, function (error, response, body) {
    console.log('body', body);
  });
});


port.on('open', function() {
    port.on('data', function(data) {
        // console.log(data);
        // console.log(typeof(data));
        // if (!(data == 'Timed out waiting for a card\r')) {
        //     var mes = data.split('\r');
        //     cardId = mes[0];
        // }
        var mes = data.split("#");
        if(mes[0]!=null && mes[1]!=null && mes[2]!=null && mes[3]!=null && mes[4]!=null){
          url="http://smart-factory.nutc-imac.com/mbed/"+"mbedDevice"+"/"+mes[1]+"/"+mes[2]+"/"+mes[3]+"/"+mes[4];
          eventEmitter.emit('update');
        }
    });
});

// open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message);
});
