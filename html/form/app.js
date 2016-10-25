var koa = require('koa');
var Router = require('koa-router');
var views = require('koa-views');
var serve = require('koa-static');

var app = koa();
app.use(views(__dirname + '/views',{
  map : {
    html : 'underscore'
  }
}));

var form = {name : "a1" , num : 1 ,name : "a2" , num : 2 ,name : "a3" , num : 3};

var router = new Router();

router.get('/',function * (){
  yield this.render('form',{formData : form});
});

app.use(router.middleware());
app.listen(3000);
