var koa = require('koa');
var Router = require('koa-router');
var json = require('koa-json');
var SerialPort = require('serialport');
var mongodb = require('mongodb');
var assert = require('assert');

var app = koa();
var router = new Router();

var port = new SerialPort('/dev/ttyACM0',{
        baudRate : 9600,
        parser : SerialPort.parsers.readline('\n')
});

var url = "mongodb://apple:apple@ds161295.mlab.com:61295/imac-iot";
var dataNum = 0;
var dataMes = 0;

function updateDocument(db, num, dataJson, callback) {
    var collection = db.collection('apple');
    collection.updateOne({"ID" : num}, {
        $set: dataJson
    }, function(err, result) {
        assert.equal(err, null);
        // assert.equal(1, result.result.n);
        console.log("Updated successfully");
        db.close();
        callback(result);
    });
}

port.on('open',function(){
  console.log('ok');
  port.on('data',function(data){
    dataNum = data.split('\r');
    dataMes = dataNum[0].split("FF");

    var jsonData = {
                    "Data" : {"Heart" : dataMes[1]},
                    "status" : true
                   };

    mongodb.MongoClient.connect(url,{
                  server : {auto_reconnect : true}
                  },function(err,db){
                    assert.equal(null,err);
                    if(!err){
                              console.log('ok');
                            } else {
                             console.log('error');
                            }
                  //                         setTimeout(function(dataJson)
                  //                         insertDocuments(db, JSON.parse(JSON.stringify(sensorData)), function() {
                  //                              db.close();
                  //                         });
                   updateDocument(db, Number(dataMes[0]), JSON.parse(JSON.stringify(jsonData)), function() {

                   });
                  });
  });
});

app.use(json());
router.get('/LoRa',function * (){

  this.body = jsonData;
});

app.use(router.middleware());
app.listen(3002);
