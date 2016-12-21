var koa = require('koa');
var Router = require('koa-router');
var serve = require('koa-static');
var websockify = require('koa-websocket');
var events = require('events');
var mongodb = require('mongodb');
var views = require('koa-views');

var app = koa();
var socket = websockify(app);

app.use(serve('./public'));

app.use(views(__dirname + '/public',{
  map : {
    html : 'underscore'
  }
}));

var eventEmitter = new events.EventEmitter();

var router = new Router();

var mongodbServer = new mongodb.Server('127.0.0.1',27017,{
  auto_reconnect : true
});

var db = new mongodb.Db('mongodb',mongodbServer);

router.get('/',function * (){
  var self = this;
  var areaA,foodA,peopleA,deaA;
  var name = [{"name" : "areaA"},{"name" : "areaB"},{"name" : "areaC"}];

  setInterval(function(){
    db.open(function(err,db){
      if(!err){
        console.log('mongodb connect');
        db.collection('LoRa',function(err,collection){
          for(var q=0 ; q<3 ; q++){
            collection.findOne(name[q],function(err,item){
              var data = {
                "name" : item.name.toString(),
                "food" : item.food,
                "people" : item.people,
                "dea" : item.dea
              }
              console.log(data);
                eventEmitter.emit('update',JSON.stringify(data));
            });
          }
          db.close();
        });
      }else{
        console.log('mongodb connect fail');
      }
    });
  }, 1000);

  function pushMessage(message){
    self.websocket.send(message);
  }

  this.websocket.send('Welcome');

  this.websocket.on('message',function(msg){
    eventEmitter.emit('update',msg);
    console.log(msg);
  });

  this.websocket.on('close',function(){
    console.log('disconnect');
    eventEmitter.removeListener('update',pushMessage);
  });

  eventEmitter.on('update',pushMessage);
});

router.get('/textview',function * (){
  //yield send(this, __dirname + '/index.html');
  yield this.render('apple',{"a":"green"});
});

app.ws
  .use(router.routes())
  .use(router.allowedMethods());

app.use(router.middleware());

app.listen(3000);
