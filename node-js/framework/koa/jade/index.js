var koa = require('koa');
var views = require('co-views');

var app = koa();

var render = views(__dirname + '/views', {ext:'jade'});

app.use(function *(){
  this.body = yield render('home',{message:'Koa is great!'});
});

app.listen(3000);
