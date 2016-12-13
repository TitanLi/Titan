var koa = require('koa');
var Router = require('koa-router');
var mqtt = require('mqtt');
var mongo = require('mongodb');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views'); //npm install koa-views@4.1.0
var serve = require('koa-static');
var websockify = require('koa-websocket');
var events = require('events');
var dateFormat = require('dateformat');

var app = koa();
var socket = websockify(app);
app.use(views(__dirname + '/public', {
  map: {
    html: 'underscore'
  }
}));
var eventEmitter = new events.EventEmitter();
var router = new Router();

var serverMqtt = mqtt.connect("mqtt://127.0.0.1:1883");

var serverMongo = mongo.Server;
var Db = mongo.Db;

var mongoDB = new serverMongo('localhost',27017,{auto_reconnect:true});
var db = new Db('smart-locker',mongoDB);

var nfc,co2,pir,red;
var itemData;
var itemNFC,itemPir,itemco2,itemRed;

serverMqtt.on('connect',function(){
  serverMqtt.subscribe("smart-locker");
});

serverMqtt.on('message',function(topic,message){
  console.log(message.toString());
  var data = message.toString().split("##");
  var day = dateFormat('yyyy-mm-dd h:mm:ss');

  nfc = data[0];
  co2 = data[1];
  pir = data[2];
  red = data[3];


  db.open(function(err,db){
    if(!err){
	    console.log("We are connected");
      db.collection('data',function(err,collection){
		        var jsonData = {"NFC" : nfc,
                       "Pir" : pir,
                       "co2" : co2,
                       "Red" : red,
                       "date": day};
        	    collection.insert(jsonData);
              db.close();
		    });
    }
  });
});

router.get('/',function *(){
  yield this.render('index',{});
});

router.get('/insert',function *(){
  var name = this.request.query.name;
  db.open(function(err,db){
    if(!err){
      db.collection('name', function(err, collection) {
          var updateData = {
              "NFC" : nfc
          }
          collection.update(updateData, {
              '$set': {
                  "name" : name
              }
          });
          db.close();
      });
    }
  });
  this.redirect('/');
});

router.get('/update',function *(){
  var name = this.request.query.name;
  db.open(function(err,db){
    if(!err){
      db.collection('name', function(err, collection) {
          var updateData = {
              "NFC" : nfc
          }
          collection.update(updateData, {
              '$set': {
                  "name" : name
              }
          });
          db.close();
      });
    }
  });
  this.redirect('/');
});

router.get('/remove',function *(){
  yield this.render('remove',{});
  db.open(function(err,db){
    if(!err){
      db.collection('name',function(err,collection){
          var removeData = {
            "NFC" : nfc
          }
          collection.remove(removeData);
      });
    }
    db.close();
  });
});

router.get('/find',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('name', function(err, collection) {
        collection.find().toArray(function(err, items) {
        // console.log(items);
        itemData = items;
        console.log(itemData);
        db.close();
        });
      });
    }
  });
  yield this.render('find',{findName : itemData});
});

router.post('/insert',function *(){
  yield this.render('insert',{nfcData : nfc});
  db.open(function(err,db){
    if(!err){
	    console.log("We are connected");
      db.collection('name',function(err,collection){
		        var jsonData = {"NFC" : nfc};
        	    collection.insert(jsonData);
		    });
    }
    db.close();
  });
  // this.redirect('/insert');
});

router.post('/update',function *(){
  yield this.render('update',{nfcData : nfc});
});

router.post('/remove',function *(){

  this.redirect('/remove?'+nfc);
});

router.post('/find',function *(){
  this.redirect('/find?'+itemData);
});

app.use(bodyParser());
app.use(router.middleware());
app.listen(3000);
