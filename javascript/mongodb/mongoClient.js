var mongodb = require('mongodb').MongoClient;

var url = 'mongodb://cardiagoUser:cardiagoReader_iii_05076416@211.23.50.130:55700/cardiago';

mongodb.connect(url, function(err, db) {
  console.log("Connected correctly to server");

  var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('cleanLog');
  // Find some documents
  collection.find().toArray(function(err, docs) {
    assert.equal(err, null);
    assert.equal(2, docs.length);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
  }
  findDocuments(db, function() {
          db.close();
        });
});
