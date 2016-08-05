var koa = require('koa');
var Router = require('koa-router');
var mqtt = require('mqtt');

var app = koa();
var router = new Router();

router.get('/',function * (){
  var client = mqtt.connect('mqtt://127.0.0.1');
  client.on('connect',function (){
    client.subscribe('presence');
    client.publish('presence','client'+'#'+'Hello mqtt');
  });
});

app.use(router.middleware());
app.listen(3001);
