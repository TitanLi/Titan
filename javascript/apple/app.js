var koa = require('koa');
var Router = require('koa-router');
var mongodb = require('mongodb');

var app = koa();
var router = new Router();

router.get('/',function * (){
  setInterval(function(){
    var mongodbServer = new mongodb.Server('127.0.0.1', 27017, {
        auto_reconnect: true
    });
    var db = new mongodb.Db('mongodb', mongodbServer);

    db.open(function(err, db) {
        if (!err) {
            console.log('mongodb are connected');
            db.collection('demo', function(err, collection) {
                  collection.find().toArray(function(err, items) {
                     console.log(items);
                 });
            });
        } else {
            console.log('mongodb open error');
        }
    });
   }, 1000);
});

app.use(router.middleware());
app.listen(3000);
