var views = require('koa-views');
var serve = require('koa-static');
var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

var app = koa();
var router = new Router();

app.use(views(__dirname + '/public', {
  map: {
    html: 'underscore'
  }
}));

//app.use(serve(__dirname + '/public'));

// app.use(function *(){
//   yield this.render('index', {
//     });
// });

router.get('/',function * (req,res){
  yield this.render('index',{});


});

router.get('/pay',function *(){
  yield this.render('pay',{});
});

router.post('/pay',function *(){

  this.redirect('/pay?100');
});

router.post('/main',function *(){

  this.redirect('/?a');
});

app.use(bodyParser());
app.use(router.middleware());
app.listen(3000);
