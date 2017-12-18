var MongoClient = require('mongodb').MongoClient;

var db;
var num;
MongoClient.connect("mongodb://localhost:27017/etag", function(err, dbs){
    db = dbs;
    var collection = db.collection('newPassrecord_v2');
    console.log(123);
    var map = function(){
      emit(this.car.typeName,this.car.carId);
    }

    var reduce = function(key,values) {
      return values.length;
    }

    collection.mapReduce(
      map,
      reduce,
      {
        // query:{dateTime:{$gte:new Date("2017-05-01T09:04:51.680Z"),$lte:new Date("2017-05-01T10:04:51.680Z")}},
        out: {replace:"asd"}
      }
    );
    //5573721
});
