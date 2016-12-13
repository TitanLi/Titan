var koa = require('koa');
var Router = require('koa-router');
var mqtt = require('mqtt');
var mongo = require('mongodb');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views'); //npm install koa-views@4.1.0
var serve = require('koa-static');
var websockify = require('koa-websocket');
var events = require('events');

var app = koa();
var socket = websockify(app);
app.use(serve('./views'));
var eventEmitter = new events.EventEmitter();
var router = new Router();

var serverMqtt = mqtt.connect("mqtt://127.0.0.1:1883");

var serverMongo = mongo.Server;
var Db = mongo.Db;

var mongoDB = new serverMongo('localhost',27017,{auto_reconnect:true});
var db = new Db('smart-locker',mongoDB);

var nfc,gas,pir,red;

// app.use(views(__dirname + '/views',
//     extension: 'pug',
//     map: {
//         html: 'pug'
//     }
// }));

serverMqtt.on('connect',function(){
  serverMqtt.subscribe("smart-locker");
});

serverMqtt.on('message',function(topic,message){
  console.log(message.toString());
  var data = message.toString().split("##");
  nfc = data[0];
  gas = data[1];
  pir = data[2];
  red = data[3];


  db.open(function(err,db){
    if(!err){
	    console.log("We are connected");
      db.collection('data',function(err,collection){
		        var jsonData = {"NFC" : nfc,
                       "Pir" : pir,
                       "Gas" : gas,
                       "Red" : red};
        	    collection.insert(jsonData);
		    });
    }
    db.close();
  });
});


router.get('/',function *(){
  var socket = this;
  console.log();
  this.websocket.send('Welcome');
  this.websocket.on('message', function(msg,insert) {
    console.log(msg);
    // socket.websocket.send('hello');
    console.log(insert.buffer);
    if(insert.masked == 'true' ){
      console.log("insert");
    }
    eventEmitter.emit('update',msg);
  });

  eventEmitter.on('update',function(message){
    socket.websocket.send(message);
  });
});

// app.use(bodyParser());
// app.use(serve('./public'));
// app.use(router.middleware());
app.ws
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);
