var koa = require('koa');
var request = require('koa-request');

var app = koa();

app.use(function * (){
  var options = {
    url : 'http://127.0.0.1:3000/LoRa',
//    headers : {'User-Agent' : 'request'}
  };

  var response = yield request(options);
  var info = JSON.parse(response.body);

  // this.body = info.foo;
  console.log(info.foo);
});

app.listen(3001);
