var koa = require('koa');
var route = require('koa-route');
var app = koa();

app.use(route.get('/hello',function * (){
  this.body = 'hello';
})
)

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

app.listen(3000);
