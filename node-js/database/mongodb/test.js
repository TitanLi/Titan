var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('127.0.0.1', 37017, {
    auto_reconnect: true
});
var db = new mongodb.Db('test', mongodbServer);

db.open(function(err, db) {
    if (!err) {
        console.log('mongodb are connected');
        db.collection('mongodb1', function(err, collection) {
            var data = {
                'name': 'apple'
            };
            collection.insert(data, function(err, data) {
                if (err) {
                    console.log('mqtt data insert failed');
                } else {
                    console.log('mqtt data insert successfully');
                }
                db.close();
            });
        });
    } else {
        console.log('mongodb open error');
    }
});
