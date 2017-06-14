var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var serve = require('koa-static');
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');
var render = require('./lib/render.js');

var app = koa();

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname+'/lib'));

app.use(route.get('/',index));
app.use(route.post('/check',checkData));

function * index(){
  this.body = yield render('index');
}

function * checkData(){
  console.log(this.request.body.ID);
  if(this.request.body.ID == 'apple'){
    this.body=true;
  }else{
    this.body=false;
  }

}


app.listen(3000);
console.log('listening on port 3000');
