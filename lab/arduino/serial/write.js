var SerialPort = require("serialport");

var port = new SerialPort("/dev/ttyACM0", {
    parser: SerialPort.parsers.readline('\n'),
    baudRate: 9600
});

port.on('open', function() {
  setTimeout(function(){
    port.write('apple\r', function(err) {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('message written');
    });
  },6000);
});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
});
