var koa = require('koa');
var Router = require('koa-router');
var views = require('koa-views');

var app = koa();
var router = new Router();

app.use(views(__dirname+'/views',{
  map:{
    html:'underscore'               //npm install underscore --save
  }
}));

router.get('/',function * (){
  yield this.render('form',{formData:"apple"});
});

app.use(router.middleware());
app.listen(3000);
