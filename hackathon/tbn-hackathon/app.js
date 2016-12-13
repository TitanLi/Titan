var request = require('request');
var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');     //npm install koa-views@4.1.0
var SerialPort = require('serialport');
var mongo = require('mongodb');
var mqtt = require('mqtt');

var port = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600,
    parser: SerialPort.parsers.readline('\n')
});

var app = koa();
var router = new Router();

var num1 = 0 , num2 = 0 , num3 = 0;

var mongodbServer = new mongo.Server('127.0.0.1',27017,{
  auto_reconnect : true
});

var db = new mongo.Db('tbn',mongodbServer);

app.use(views(__dirname + '/public',{
  map : {
    html : 'underscore'
  }
}));

port.on('open',function (){
  console.log('arduino open successfully');
  var client = mqtt.connect('mqtt://127.0.0.1');
    client.on('connect', function() {
        client.subscribe('presence');
    });

    client.on('message', function(topic, message) {
    console.log(message.toString());
    port.write(message.toString());
   });
});

router.get('/',function *(){
  yield this.render('app',{});
});

router.get('/find',function *(){
  var name = this.request.query.name.toString();
  var name1 = this.request.query.name1.toString();
  var item1,item2,item3;

  db.open(function(err,db){
    if(!err){
      db.collection('tbn',function(err,collection){
        var find = {
          'memery' : 'item1'
        }
        collection.findOne(find,function(err,item){
          item1 = item.name;
        });
      });

      db.collection('tbn',function(err,collection){
        var find = {
          'memery' : 'item2'
        }
        collection.findOne(find,function(err,item){
          item2 = item.name;
        });
      });

      db.collection('tbn',function(err,collection){
        var find = {
          'memery' : 'item3'
        }
        collection.findOne(find,function(err,item){
          item3 = item.name;
        });
      });
    }
    db.close();
  });
  console.log("E:"+name);
  console.log("N:"+name1);
  request('http://api.tbn.org.tw/api/Survey/SurveyListByLatlng?Lon='+name+'&Lat='+name1+'&type=json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body) // Show the HTML for the Google homepage.
      // console.log(JSON.parse(body));
      var apple = JSON.parse(body);
      // console.log(apple[0]);
      // console.log(apple[0].SpeciesTypeName);
      //雙子葉植物
      //120.677&Lat=24.124
      for(var i = 0 ; i<apple.length ; i++){
        console.log(apple[i]);
        if(apple[i].SpeciesTypeName == item1){
          num1 ++;
        }
        if(apple[i].SpeciesTypeName == item2){
          num2 ++;
        }
        if(apple[i].SpeciesTypeName == item3){
          num3 ++;
        }
      }
      console.log(item1 + ':' + num1);
      console.log(item2 + ':' + num2);
      console.log(item3 + ':' + num3);
      var client = mqtt.connect('mqtt://127.0.0.1');
      client.on('connect',function(){
        client.subscribe('presence');
        if(num1>=10){
          num1 = 'F';
        }
        if(num2>=10){
          num2 = 'F';
        }
        if(num3>=10){
          num3 = 'F';
        }
        client.publish('presence','1#'+num1+'\r');
        client.publish('presence','2#'+num2+'\r');
        client.publish('presence','3#'+num3+'\r');
      });
      // console.log(response);
      // console.log(body);
    }
  });
  num1=0;
  num2=0;
  num3=0;
  this.redirect('/');
});

router.get('/setName',function *(){
  yield this.render('setName',{});
});

router.get('/setName1',function *(){
  var name1 = this.request.query.name1.toString();
  var name2 = this.request.query.name2.toString();
  var name3 = this.request.query.name3.toString();
  db.open(function(err,db){
    if(!err){
      db.collection('tbn',function(err,collection){
        var data = {
          'memery' : 'item1'
        }
        collection.update(data,{
          '$set' : {
            'name' : name1
          }
        });
      });

      db.collection('tbn',function(err,collection){
        var data = {
          'memery' : 'item2'
        }
        collection.update(data,{
          '$set' : {
            'name' : name2
          }
        });
      });

      db.collection('tbn',function(err,collection){
        var data = {
          'memery' : 'item3'
        }
        collection.update(data,{
          '$set' : {
            'name' : name3
          }
        });
      });
    }
    db.close();
  });
  this.redirect('/');
});

router.get('/insert',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('tbn',function(err,collection){
        var data = {
          'memery' : 'item1',
          'name' : ''
        }
        collection.insert(data,function(err,data){
          if(err){
            console.log('data insert failed');
          }else{
            console.log('data insert successfully');
          }
        });
      });

      db.collection('tbn',function(err,collection){
        var data = {
          'memery' : 'item2',
          'name' : ''
        }
        collection.insert(data,function(err,data){
          if(err){
            console.log('data insert failed');
          }else{
            console.log('data insert successfully');
          }
        });
      });

      db.collection('tbn',function(err,collection){
        var data = {
          'memery' : 'item3',
          'name' : ''
        }
        collection.insert(data,function(err,data){
          if(err){
            console.log('data insert failed');
          }else{
            console.log('data insert successfully');
          }
        });
      });
    }
    db.close();
  });
  this.redirect('/');
});

app.use(router.middleware());
app.listen(3000);
