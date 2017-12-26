var MongoClient = require('mongodb').MongoClient;

var db;
var num=0;
var startTime = new Date("2017-05-01T09:04:51.680Z");
var endTime = new Date("2017-05-01T10:04:51.680Z");

MongoClient.connect("mongodb://localhost:27017/etag", function(err, dbs){
    db = dbs;
    var collection = db.collection('passrecord_v3');
    console.time("aggregate");
    collection.aggregate([{$match:{date_time:{$gte:startTime,$lte:endTime}}},
                          {$group:{_id:"$typename",count:{$sum:1}}}]).toArray(function(err,doc){
      for(var i=0;i<doc.length;i++){
        num=num+doc[i].count;
      }
      for(var i=0;i<doc.length;i++){
        doc[i].proportion=doc[i].count/num;
      }
      console.log(doc);
      console.timeEnd("aggregate");
      db.close();
    });
});
