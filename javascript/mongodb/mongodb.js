var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('127.0.0.1', 27017, {
    auto_reconnect: true
});
var db = new mongodb.Db('mongodb', mongodbServer);

db.open(function(err, db) {
    if (!err) {
        console.log('mongodb are connected');
        db.collection('mqtt', function(err, collection) {
            var data = {
                'name': 'apple'
            };
            collection.insert(data, function(err, data) {
                if (err) {
                    console.log('mqtt data insert failed');
                } else {
                    console.log('mqtt data insert successfully');
                }
            });
        });

        db.collection('mqtt', function(err, collection) {
            var updateData = {
                'name': 'apple'
            }
            collection.update(updateData, {
                '$set': {
                    'apple': 'titan'
                }
            });
        });

        // db.collection('mqtt',function(err,collection){
        //     var removeData = {
        //       'name' : 'apple'
        //     }
        //     collection.remove(removeData);
        // });

        db.collection('mqtt', function(err, collection) {
            var find = {
                'name': 'apple'
            }
            collection.findOne(find, function(err, item) {
                console.log(item['name']);
                console.log(item.apple);
            });
        });

        db.collection('mqtt', function(err, collection) {
              collection.find().toArray(function(err, items) {
                 console.log(items);
             });
        });
    } else {
        console.log('mongodb open error');
    }
});
