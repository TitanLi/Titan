var SerialPort = require('serialport');
var mqtt = require('mqtt');
var mongodb = require('mongodb');
var assert = require('assert');
//var dateFormat = require('dateformat');
var conMqtt = require('./con-mqtt.json');
var conMongodb = require('./con-mongodb.json');

var port = new SerialPort('/dev/ttyACM0',{
        baudRate : 9600,
        parser : SerialPort.parsers.readline('\n')
});
var server = mqtt.connect(conMqtt.Broker);
var url = conMongodb.connectMongoLab;

server.on('connect',function(){
        server.subscribe(conMqtt.topic);	
});

//function insertDocuments(db, rfid, callback) {
//  console.log(rfid);
//    var collection = db.collection('apple');
//    collection.insertMany([rfid], function(err, result) {
//         assert.equal(err, null);
//         assert.equal(1, result.result.n);
//         assert.equal(1, result.ops.length);
//        console.log("Inserted successfully");
//        callback(result);
//    });
//}

function updateDocument(db, dataJson, callback) {
    var collection = db.collection('apple');
    collection.updateOne({}, {
        $set: dataJson
    }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated successfully");
        callback(result);
    });
}

port.on('open',function(){
        console.log('ok');
        port.on('data',function(data){
                  var client = mqtt.connect(conMqtt.Broker);
                  console.log('Data:'+data);
                  var dealData = data.split('\r');
                  var mes = dealData[0].split('FF');
                  console.log(mes[0]+","+mes[1]+","+mes[2]+","+mes[3]+","+mes[4]+","+mes[5]);
                  var sensorData = {"PIR" : mes[0],
				    "Air" : mes[1],         
                                    "Hum" : mes[2],         
                                    "Tmp" : mes[3],         
                                    "Gas" : mes[4],
				    "Rfid": mes[5]};                              
                  console.log(sensorData);                                        
//                  var day = dateFormat('yyyy-mm-dd h:mm:ss');                   
//                  var card = { 'rfid' : mes[0] , 'time' : day};                 
//                  var dataJson = JSON.stringify(sensorData);                      
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
			 updateDocument(db, JSON.parse(JSON.stringify(sensorData)), function() {
            			db.close();
        		 });
                                                    
                });                                                             
                  server.publish(conMqtt.topic,JSON.stringify(sensorData));                         
        });                                                                       
});                                                               
