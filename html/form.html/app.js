var koa = require('koa');
var Router = require('koa-router');
var views = require('koa-views'); //npm install koa-views@4.1.0
var serve = require('koa-static');

var app = koa();  
app.use(views(__dirname + '/views',{
  map : {
    html : 'underscore'
  }
}));

var router = new Router();

var form = {{name : "a1", num : 1},
            {name : "a2", num : 2},
            {name : "a3", num : 3}};

router.get('/',function * (){
  yield this.render('form',{formData : form});
});

app.use(router.middleware());
app.listen(3000);
