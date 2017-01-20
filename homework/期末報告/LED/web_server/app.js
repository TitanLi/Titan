var koa = require('koa');
var Router = require('koa-router');
var mongo = require('mongodb');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');     //npm install koa-views@4.1.0
var serve = require('koa-static');
var mqtt = require('mqtt');
var websockify = require('koa-websocket');
var events = require('events');

var app = koa();
var socket = websockify(app);

app.use(serve('./public'));

app.use(views(__dirname + '/public',{
  map : {
    html : 'underscore'
  }
}));

var eventEmitter = new events.EventEmitter();

var mongodbServer = new mongo.Server('127.0.0.1',27017,{
  auto_reconnect : true
});

var db = new mongo.Db('arduino',mongodbServer);

var router = new Router();

var led1Pic,led2Pic,led3Pic,led4Pic;
var led1router,led2router,led3router,led4router;
var led1val,led2val,led3val,led4val;
var led3data;

router.get('/',function * (){
  var self = this;

  setInterval(function(){
    db.open(function(err,db){
      if(!err){
        db.collection('arduino',function(err,collection){
          var find = {
            'name' : 'LED1'
          }
          collection.findOne(find,function(err,item){
            console.log(item.ledSta);
            if(item.ledSta == 1){
              led1Pic = "bright.png";
              led1router = "/LED1_OFF";
              led1val = "關";
              console.log("1 ok");
            }else{
              led1Pic = "dark.png";
              led1router = "/LED1_ON";
              led1val = "開";
              console.log("2 ok");
            }
          });
        });

        db.collection('arduino',function(err,collection){
          var find = {
            'name' : 'LED2'
          }
          collection.findOne(find,function(err,item){
            console.log(item.ledSta);
            if(item.ledSta == 1){
              led2Pic = "bright.png";
              led2router = "/LED2_OFF";
              led2val = "關";
              console.log("1 ok");
            }else{
              led2Pic = "dark.png";
              led2router = "/LED2_ON";
              led2val = "開";
              console.log("2 ok");
            }
          });
        });

        db.collection('arduino',function(err,collection){
          var find = {
            'name' : 'LED3'
          }
          collection.findOne(find,function(err,item){
            console.log(item.ledSta);
            if(item.ledSta == 1){
              led3Pic = "bright.png";
              led3router = "/LED3_OFF";
              led3val = "關";
              led3data = item.data;
              console.log("1 ok");
            }else{
              led3Pic = "dark.png";
              led3router = "/LED3_ON";
              led3val = "開";
              led3data = item.data;
              console.log("2 ok");
            }
          });
        });

        db.collection('arduino',function(err,collection){
          var find = {
            'name' : 'LED4'
          }
          collection.findOne(find,function(err,item){
            console.log(item.ledSta);
            if(item.ledSta == 1){
              led4Pic = "bright.png";
              led4router = "/LED4_OFF";
              led4val = "關";
              console.log("1 ok");
            }else{
              led4Pic = "dark.png";
              led4router = "/LED4_ON";
              led4val = "開";
              console.log("2 ok");
            }
          });
        });
        var data = {
                      "LED1" : {
                                  "picture" : led1Pic,
                                  "router" : led1router,
                                  "val" : led1val
                                },
                      "LED2" : {
                                  "picture" : led2Pic,
                                  "router" : led2router,
                                  "val" : led2val
                                },
                      "LED3" : {
                                  "picture" : led3Pic,
                                  "router" : led3router,
                                  "val" : led3val,
                                  "data" : led3data
                                },
                      "LED4" : {
                                  "picture" : led4Pic,
                                  "router" : led4router,
                                  "val" : led4val
                                }
                    };
        eventEmitter.emit('update',JSON.stringify(data));
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

router.get('/main',function * (){

  yield this.render('app',{});
});

router.get('/get',function *(){
  console.log('apple');
  this.redirect('/');
});

router.get('/led_insert',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED1',
          'ledSta': 0
        }

        collection.insert(data,function(err,data){
          if(err){
            console.log('data insert failed');
          }else{
            console.log('data insert successfully');
          }
          db.close();
        });
      });

      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED2',
          'ledSta': 0
        }

        collection.insert(data,function(err,data){
          if(err){
            console.log('data insert failed');
          }else{
            console.log('data insert successfully');
          }
          db.close();
        });
      });

      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED3',
          'ledSta': 0
        }

        collection.insert(data,function(err,data){
          if(err){
            console.log('data insert failed');
          }else{
            console.log('data insert successfully');
          }
          db.close();
        });
      });

      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED4',
          'ledSta': 0
        }

        collection.insert(data,function(err,data){
          if(err){
            console.log('data insert failed');
          }else{
            console.log('data insert successfully');
          }
          db.close();
        });
      });
    }
  });
  this.redirect('/main');
});

// router.get('/LED2_INSERT',function * (){
//   db.open(function(err,db){
//     if(!err){
//       db.collection('arduino',function(err,collection){
//         var data = {
//           'name' : 'LED2',
//           'ledSta': 1
//         }
//
//         collection.insert(data,function(err,data){
//           if(err){
//             console.log('data insert failed');
//           }else{
//             console.log('data insert successfully');
//           }
//           db.close();
//         });
//       });
//     }
//   });
//   this.redirect('/LED3_INSERT');
// });
//
// router.get('/LED3_INSERT',function * (){
//   db.open(function(err,db){
//     if(!err){
//       db.collection('arduino',function(err,collection){
//         var data = {
//           'name' : 'LED3',
//           'ledSta': 1
//         }
//
//         collection.insert(data,function(err,data){
//           if(err){
//             console.log('data insert failed');
//           }else{
//             console.log('data insert successfully');
//           }
//           db.close();
//         });
//       });
//     }
//   });
//   this.redirect('/LED4_INSERT');
// });
//
// router.get('/LED4_INSERT',function * (){
//   db.open(function(err,db){
//     if(!err){
//       db.collection('arduino',function(err,collection){
//         var data = {
//           'name' : 'LED4',
//           'ledSta': 1
//         }
//
//         collection.insert(data,function(err,data){
//           if(err){
//             console.log('data insert failed');
//           }else{
//             console.log('data insert successfully');
//           }
//           db.close();
//         });
//       });
//     }
//   });
//   this.redirect('/');
// });

router.get('/LED1_ON',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED1'
        }

        collection.update(data,{
          '$set' : {
            'ledSta' : 1
          }
        });
        db.close();
      });
    }
  });
  var client = mqtt.connect('mqtt://127.0.0.1');
  client.on('connect',function(){
    client.subscribe('presence');
    client.publish('presence','1#1');
  });
  this.redirect('/main');
});

router.get('/LED2_ON',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED2'
        }

        collection.update(data,{
          '$set' : {
            'ledSta' : 1
          }
        });
        db.close();
      });
    }
  });
  var client = mqtt.connect('mqtt://127.0.0.1');
  client.on('connect',function(){
    client.subscribe('presence');
    client.publish('presence','2#1');
  });
  this.redirect('/main');
});

router.get('/LED3_ON',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED3'
        }

        collection.update(data,{
          '$set' : {
            'ledSta' : 1
          }
        });
        db.close();
      });
    }
  });
  var client = mqtt.connect('mqtt://127.0.0.1');
  client.on('connect',function(){
    client.subscribe('presence');
    client.publish('presence','3#1');
  });
  this.redirect('/main');
});

router.get('/LED4_ON',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED4'
        }

        collection.update(data,{
          '$set' : {
            'ledSta' : 1
          }
        });
        db.close();
      });
    }
  });
  var client = mqtt.connect('mqtt://127.0.0.1');
  client.on('connect',function(){
    client.subscribe('presence');
    client.publish('presence','4#1');
  });
  this.redirect('/main');
});

router.get('/LED1_OFF',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED1'
        }

        collection.update(data,{
          '$set' : {
            'ledSta' : 0
          }
        });
        db.close();
      });
    }
  });
  var client = mqtt.connect('mqtt://127.0.0.1');
  client.on('connect',function(){
    client.subscribe('presence');
    client.publish('presence','1#0');
  });
  this.redirect('/main');
});

router.get('/LED2_OFF',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED2'
        }

        collection.update(data,{
          '$set' : {
            'ledSta' : 0
          }
        });
        db.close();
      });
    }
  });
  var client = mqtt.connect('mqtt://127.0.0.1');
  client.on('connect',function(){
    client.subscribe('presence');
    client.publish('presence','2#0');
  });
  this.redirect('/main');
});

router.get('/LED3_OFF',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED3'
        }

        collection.update(data,{
          '$set' : {
            'ledSta' : 0
          }
        });
        db.close();
      });
    }
  });
  var client = mqtt.connect('mqtt://127.0.0.1');
  client.on('connect',function(){
    client.subscribe('presence');
    client.publish('presence','3#0');
  });
  this.redirect('/main');
});

router.get('/LED4_OFF',function *(){
  db.open(function(err,db){
    if(!err){
      db.collection('arduino',function(err,collection){
        var data = {
          'name' : 'LED4'
        }

        collection.update(data,{
          '$set' : {
            'ledSta' : 0
          }
        });
        db.close();
      });
    }
  });
  var client = mqtt.connect('mqtt://127.0.0.1');
  client.on('connect',function(){
    client.subscribe('presence');
    client.publish('presence','4#0');
  });
  this.redirect('/main');
});

router.post('/',function * (){
  setTimeout(function(){
    this.redirect('/main');
  },3000);
});

app.ws
  .use(router.routes())
  .use(router.allowedMethods());

app.use(router.middleware());

app.listen(3000);
