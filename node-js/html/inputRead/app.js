var koa = require('koa');
var Router = require('koa-router');
var views = require('koa-views'); //npm install koa-views@4.1.0
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');

var app = koa();
app.use(views(__dirname + '/views',{
  map : {
    html : 'underscore'
  }
}));
app.use(bodyParser());

var router = new Router();

router.get('/',function *(){
  yield this.render('index',{findName : "html應用"});
});

router.get('/textview',function *(){
  yield this.render('textview',{textName : "TextView"});
});

router.get('/view',function * (){
  var text = this.request.query.name;
  yield this.render('view',{val : text});
});

app.use(router.middleware());
app.listen(3000);
