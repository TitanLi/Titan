var koa = require('koa');
var Router = require('koa-router');
var mqtt = require('mqtt');
var mongodb = require('mongodb');
var views = require('koa-views');
var serve = require('koa-static');
var dateFormat = require('dateformat');
var bodyParser = require('koa-bodyparser');

var server = mqtt.connect("mqtt://127.0.0.1");
var mongodbServer = new mongodb.Server('127.0.0.1',27017,{
  auto_reconnect: true
});

var app = koa();
app.use(views(__dirname + '/public', {
  map: {
    html: 'underscore'
  }
}));
var router = new Router();

var db = new mongodb.Db('parking',mongodbServer);

var nfc = "";
var nfcStatus = "";
var money ;

server.on('connect',function(){
  server.subscribe('parking');
  server.subscribe('money');
});

server.on('message',function(topic,message){
  var data = message.toString().split("##");
  nfc = data[0];
  var day = dateFormat('h:MM:ss');
  if(topic == "parking"){
    db.open(function(err,db){
      if(!err){
          db.collection('parkDB',function(err,collection){
            collection.insert({"nfc" : data[0],
                            "time" : day,
                            "id" : data[1],
                            "status" : data[2]});
          });
      }
      db.close();
    });
  }
});

router.get('/',function *(){
  yield this.render('index',{});
  // db.open(function(err,db){
  //   if(!err){
  //     db.collection('parkDB',function(err,collection){
  //       collection.findOne({"nfc" : nfc}, function(err, item) {
  //           console.log(item['time']);
  //           var time = item.time.split(":");
  //           var timeNow = dateFormat('h:MM:ss').toString().split(":");
  //           money = 0;
  //           console.log(time[1]);
  //           console.log(timeNow[1]);
  //           if(parseInt(timeNow[0])>parseInt(time[0])){
  //             money = (parseInt(timeNow[0])-parseInt(time[0]))*30;
  //           }else{
  //             money = 15;
  //           }
  //           console.log(dateFormat('h:MM:ss'));
  //
  //           // console.log(item.status);
  //       });
  //     });
  //     db.close();
  //   }
  // });
});

router.get('/pay',function *(){
  yield this.render('pay',{});
  // nfc = "";
});

router.post('/pay',function *(){

  this.redirect('/pay?' + 150);
});

router.post('/main',function *(){

  this.redirect('/?a');
});

app.use(bodyParser());
app.use(router.middleware());
app.listen(3000);
