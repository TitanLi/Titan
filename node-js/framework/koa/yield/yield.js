var koa = require('koa');
var Router = require('koa-router');
var mongodb = require('mongodb');
var render = require('./lib/render.js');

var app = koa();
var router = new Router();

var mongodbServer = new mongodb.Server('127.0.0.1', 27017, {
    auto_reconnect: true
});
var db = new mongodb.Db('test', mongodbServer);

router.get('/',index);

function * index(){
  var text = this.request.query.data;
  var indexData = new Array();
  if(text != null){
    console.log(text);
    yield function(done){
      db.open(function(err, db) {
          if (!err) {
              console.log('mongodb are connected');
              db.collection('test', function(err, collection) {
                  var data = {
                      'data': text
                  };
                  collection.insert(data, function(err, data) {
                      if (err) {
                          console.log('mqtt data insert failed');
                      } else {
                          console.log('mqtt data insert successfully');
                          console.log(1);
                      }
                  db.close();
                  done();
                  });
              });
          }
      });
    }
  }
  console.log(2);
  yield function(done){
    db.open(function(err, db) {
        if (!err) {
            console.log('mongodb are connected');
            db.collection('test', function(err, collection) {
                  collection.find().toArray(function(err, items) {
                     console.log(items);
                     for(var i=0; i<items.length; i++){
                       indexData[i]=items[i].data;
                     }
                     db.close();
                     done();
                 });
            });
        }
    });
  }
  this.body = yield render('index',{data:indexData});
};

app.use(router.middleware());
app.listen(3000);
