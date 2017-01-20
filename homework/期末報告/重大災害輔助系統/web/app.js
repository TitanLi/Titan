var koa = require('koa');
var Router = require('koa-router');
var serve = require('koa-static');
var websockify = require('koa-websocket');
var views = require('koa-views');
var events = require('events');
var mongodb = require('mongodb');

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
  var name = ["areaA","areaB","areaC","areaD","areaE","areaF","areaG","areaH"];

  setInterval(function(){
    db.open(function(err,db){
      if(!err){
        console.log('mongodb connect');
        for(var i=0 ; i<name.length ; i++){
            db.collection(name[i],function(err,collection){
                var options = {
                                "limit": 1,
                                "sort": {date : -1}
                              };

                var optionsLog = {
                                "limit": 10,
                                "sort": {date : -1}
                              };
                collection.find({},options).toArray(function(err, items) {      //找最近一筆的資料做比對
                      var data = {
                                    "name" : items[0].name.toString(),
                                    "food" : items[0].food,
                                    "people" : items[0].people,
                                    "dea" : items[0].dea
                                  }
                      console.log(data);
                      eventEmitter.emit('update',JSON.stringify(data));
                });

                collection.find({},optionsLog).toArray(function(err, items) {      //找最近一筆的資料做比對
                      var data = {
                                "areaA" : items
                              }
                      console.log(data);
                      eventEmitter.emit('update',JSON.stringify(data));
                });
           });
        }
        db.close();
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
  yield this.render('apple',{});
});

router.get('/areaA',function * (){
  yield this.render('areaA',{});
});

router.get('/areaB',function * (){
  yield this.render('areaB',{});
});

router.get('/areaC',function * (){
  yield this.render('areaC',{});
});

router.get('/areaD',function * (){
  yield this.render('areaD',{});
});

router.get('/areaE',function * (){
  yield this.render('areaE',{});
});

router.get('/areaF',function * (){
  yield this.render('areaF',{});
});

router.get('/areaG',function * (){
  yield this.render('areaG',{});
});

router.get('/areaH',function * (){
  yield this.render('areaH',{});
});

app.ws
  .use(router.routes())
  .use(router.allowedMethods());

app.use(router.middleware());

app.listen(3000);
