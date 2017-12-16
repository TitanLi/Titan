var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var db;
MongoClient.connect("mongodb://localhost:27017/etag", function(err, dbs){
    db = dbs;
    var collection = db.collection('passrecord');
    var stream = collection.find().stream();

        // Execute find on all the documents
        stream.on('close', function() {
          db.close();
        });

        stream.on('data', function(data) {
          assert.ok(data != null);
          console.log(data);
      });
    //5573721
});
