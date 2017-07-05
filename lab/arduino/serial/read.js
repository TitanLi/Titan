var SerialPort = require("serialport");

var port = new SerialPort("/dev/ttyACM0", {
    parser: SerialPort.parsers.readline('\n')
});

port.on('open', function() {
    port.on('data', function(data) {
        console.log(data);
        console.log(typeof(data));
        // if (!(data == 'Timed out waiting for a card\r')) {
        //     var mes = data.split('\r');
        //     cardId = mes[0];
        // }
    });
});

// open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message);
});
