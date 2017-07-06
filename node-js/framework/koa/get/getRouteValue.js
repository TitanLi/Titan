var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var serve = require('koa-static');
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');
var views = require('co-views');

var render = views(__dirname,{
                    map : {html : 'swig'}
                  });

var app = koa();

app.use(json());
app.use(logger());
app.use(bodyParser());

app.use(route.get('/',index));

function * index(){
  console.log(this.request.query.name);
  console.log(this.query.name);
  this.body = yield render('index');
}


app.listen(3000);
console.log('listening on port 3000');
