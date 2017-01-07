var mongo = require('mongodb');
var SerialPort = require('serialport');
var mqtt = require('mqtt');

var port = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600,
    parser: SerialPort.parsers.readline('\n')
});

var mongodbServer = new mongo.Server('127.0.0.1',27017,{
  auto_reconnect : true
});

var db = new mongo.Db('arduino',mongodbServer);

var dataStr;


db.open(function(err,db){
  if(!err){
    db.collection('arduino',function(err,collection){
      var data = {
        'name' : 'LED1'
      }

      collection.update(data,{
        '$set' : {
          'ledSta' : 0
        }
      });
    });

    db.collection('arduino',function(err,collection){
      var data = {
        'name' : 'LED2'
      }

      collection.update(data,{
        '$set' : {
          'ledSta' : 0
        }
      });
    });

    db.collection('arduino',function(err,collection){
      var data = {
        'name' : 'LED3'
      }

      collection.update(data,{
        '$set' : {
          'ledSta' : 0
        }
      });
    });

    db.collection('arduino',function(err,collection){
      var data = {
        'name' : 'LED4'
      }

      collection.update(data,{
        '$set' : {
          'ledSta' : 0
        }
      });
    });
  }
  db.close();
});

port.on('open',function (){
  console.log('arduino open successfully');
  port.on('data',function (data){
    dataStr = data.split('#');
    db.open(function(err,db){
      if(!err){
        db.collection('arduino',function(err,collection){
          var data = {
                      'name' : dataStr[0]
                      };
          if(dataStr[0]=="LED3"){
            collection.update(data,{
              '$set' : {
                'ledSta' : parseInt(dataStr[1]),
                'data' : parseInt(dataStr[2])
              }
            });
          }else{
            collection.update(data,{
              '$set' : {
                'ledSta' : parseInt(dataStr[1])
              }
            });
          }
          db.close();
        });
      }
    });
  });
  var client = mqtt.connect('mqtt://127.0.0.1');
    client.on('connect', function() {
        client.subscribe('presence');
    });

    client.on('message', function(topic, message) {
    console.log(message.toString());
    port.write(message.toString());
   });
});
