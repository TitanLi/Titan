var SerialPort = require("serialport");
var mongodb = require('mongodb');

var port = new SerialPort("/dev/ttyUSB0", {
  baudRate: 9600,
  parser : SerialPort.parsers.readline('\n')
});

var mongodbServer = new mongodb.Server('danny-zone.com', 27017, {
    auto_reconnect: true
});
var db = new mongodb.Db('acer', mongodbServer);

port.on('open',function (){
  port.on('data',function (data){
    console.log(data);
    var dataJson = data.split("#");
    db.open(function(err, db) {
      if (!err) {
        console.log('mongodb are connected');
        db.collection('acer', function(err, collection) {
          var dataString;
          if(dataJson[5] == "0"){
            dataString = {
                'X': dataJson[2],
                'Y': dataJson[3],
                'Z': dataJson[4]
                };
          }else if(dataJson[5] == "1"){
            dataString = {
                'N': dataJson[0],
                'E': dataJson[1],
                'X': dataJson[2],
                'Y': dataJson[3],
                'Z': dataJson[4]
            };
          }
            collection.insert(dataString, function(err, data) {
                if (err) {
                    console.log('mqtt data insert failed');
                } else {
                    console.log('mqtt data insert successfully');
                }
                db.close();
            });
        });
      }
    });
  });
});
