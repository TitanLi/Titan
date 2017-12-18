var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var co = require('co');

var db;
var num = 1;
var dataObj = {};
MongoClient.connect("mongodb://localhost:27017/etag", function(err, dbs){
    db = dbs;

    var carCol = db.collection('newCar');
    var carStream = carCol.find().stream();

          // Execute find on all the documents
          carStream.on('close', function() {
            db.close();
          });

          carStream.on('data', function(data) {
            console.log(num++);
            dataObj[data.carid]=data.typename;
            console.log(dataObj);
        });
        //5573721
});
