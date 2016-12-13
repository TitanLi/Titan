var koa = require('koa');
var Router = require('koa-router');
var mqtt = require('mqtt');
var mongodb = require('mongodb');
var assert = require('assert');
var conMqtt = require('./connection/con-mqtt.json');
var conMongodb = require('./connection/con-mongodb.json');



var app = koa();
var router = new Router();
var mqttBroker = mqtt.connect(conMqtt.broker);



var url = conMongodb.connectMongoLab;
var rfid = '';
var cardId = {};
var cardFind = {};
var rfidJson = JSON.parse(cardJson(rfid));

mqttBroker.on('connect', function() {
    mqttBroker.subscribe(conMqtt.topic);
});

mqttBroker.on('message', function(topic, message) {
    rfid = JSON.parse(message).rfid;
    console.log(rfid);
});

function cardJson(rfid) {
    cardId = {
        "roderID": rfid,
        "guestName": 'xxx',
        "guestPhone": 'xxx',
        "datalink": [{
            "urlPNG": "http://123.123.123.123/PNG/12345.png",
            "urlMusic": "http://123.123.123.123/MP3/12345.mp3"
        }, {
            "guestTable": 1,
            "guestMode": 2,
            "guestRFID": "FF:AA:11"
        }],
        "enable": true
    };
    return JSON.stringify(cardId);
}

function insertDocuments(db, dataJson, rfid, callback) {
    console.log(dataJson);
    var collection = db.collection(rfid);
    collection.insertMany([dataJson], function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        console.log("Inserted successfully");
        callback(result);
    });
}

function dropRestaurants(db, rfid, callback) {
    db.collection(rfid).drop(function(err, response) {
        console.log(response)
        callback();
    });
};

function updateDocument(db, dataJson, rfid, callback) {
    var collection = db.collection(rfid);
    collection.updateOne({}, {
        $set: dataJson
    }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated successfully");
        callback(result);
    });
}

function findDocuments(db, rfid, callback) {
    var collection = db.collection(rfid);
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        assert.equal(1, docs.length);
        console.log("Found successfully");
        console.dir(docs);
        callback(docs);
    });
}

router.post('/insert', function*() {
    mongodb.MongoClient.connect(url, {
      server: {auto_reconnect: true}
    }, function(err, db) {
        assert.equal(null, err);
        if (!err) {
            console.log('ok');
        } else {
            console.log('error');
        }
        insertDocuments(db, rfidJson, rfid, function(){
          db.close();
        });
    });
});

router.post('/delete', function*() {
    mongodb.MongoClient.connect(url, {
        server: {auto_reconnect: true}
    }, function(err, db) {
        assert.equal(null, err);
        if (!err) {
            console.log('ok');
        } else {
            console.log('error');
        }
        dropRestaurants(db, rfid, function() {
            db.close();
        });
    });
});

router.post('/update', function*() {
    mongodb.MongoClient.connect(url, {
        server: {auto_reconnect: true}
    }, function(err, db) {
        assert.equal(null, err);
        if (!err) {
            console.log('ok');
        } else {
            console.log('error');
        }

        updateDocument(db, rfidJson, rfid, function() {
            db.close();
        });
    });
});

router.post('/find', function*() {
    mongodb.MongoClient.connect(url, {
        server: {auto_reconnect: true}
    }, function(err, db) {
        assert.equal(null, err);
        if (!err) {
            console.log('ok');
        } else {
            console.log('error');
        }

        findDocuments(db, rfid, function() {
            db.close();
        });
    });
});

app.use(router.middleware());
app.listen(3000);
