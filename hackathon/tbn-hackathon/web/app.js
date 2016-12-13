var koa = require('koa');
var Router = require('koa-router');
var views = require('koa-views');     //npm install koa-views@4.1.0

var app = koa();
var router = new Router();

app.use(views(__dirname + '/public',{
  map : {
    html : 'underscore'
  }
}));

router.get('/',function * (){
  yield this.render('web',{});
});

app.use(router.middleware());
app.listen(3001);
