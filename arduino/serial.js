var SerialPort = require("serialport");
var mongodb = require('mongodb');
var koa = require('koa');
var Router = require('koa-router');

var port = new SerialPort("/dev/ttyACM0", {
    parser: SerialPort.parsers.readline('\n')
});
var mongodbServer = new mongodb.Server('127.0.0.1', 27017, {
    auto_reconnect: true
});
var db = new mongodb.Db('mqtt', mongodbServer);
var app = koa();
var router = new Router();
var cardId;

port.on('open', function() {
    port.on('data', function(data) {
        console.log(data);
        // console.log(typeof(data));
        if (!(data == 'Timed out waiting for a card\r')) {
            var mes = data.split('\r');
            cardId = mes[0];
        }
    });
});

// open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message);
});

router.get('/', function*() {
    this.body = cardId;
    db.open(function(err, data) {
        db.collection('rfid', function(err, collection) {
            if (!err) {
                var find = {
                    'orderID': cardId
                }
                collection.findOne(find, function(err, item) {
                    if (item) {
                        console.log(item.orderID);
                    } else {
                        console.log('not find');
                    }
                });
            } else {
                console.log('mongodb open failed');
            }
            db.close();
        });
    });
});

router.get('/root', function*() {
    this.body = cardId;
    db.open(function(err, data) {
        db.collection('rfid', function(err, collection) {
            if (!err) {
                var cardData = {
                    'orderID': cardId
                }
                collection.insert(cardData, function(err, data) {
                    if (!err) {
                        console.log('card insert successfully');
                    } else {
                        console.log('card insert failed');
                    }
                });
            } else {
                console.log('mongodb open failed');
            }
            db.close();
        });
    });
});

app.use(router.middleware());
app.listen(3000);
