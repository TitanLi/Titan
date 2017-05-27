var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var serve = require('koa-static');
var parse = require('co-body');
var render = require('./lib/render');

var app = koa();

app.use(logger());
app.use(serve('./views'));

app.use(route.get('/',index));
app.use(route.get('/customer',customer));
app.use(route.get('/project',project));
app.use(route.get('/staff',staff));
app.use(route.get('/staff/information',information));
app.use(route.get('/staff/pay',pay));
app.use(route.get('/staff/list',list));
app.use(route.post('/customer',customerData));

function * index(){
  this.body = yield render('index');
}

function * customer(){
  this.body = yield render('customer');
}

function * customerData(date){
  var data = yield parse(this);
  console.log(data);
  this.redirect('/customer');
}

function * project(){
  this.body = yield render('project');
}

function * staff(){
  this.body = yield render('staff',{title:{"t1":"id","t2":"name","t3":"sex","t4":"old","t5":"birthday"},
                                    apple:[{"id":1,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"},
                                           {"id":2,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"},
                                           {"id":3,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"}]});
}

function * information(){
  this.body = yield render('staff',{title:{"t1":"id","t2":"name","t3":"sex","t4":"old","t5":"birthday"},
                                    apple:[{"id":1,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"},
                                           {"id":2,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"},
                                           {"id":3,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"}]});
}

function * pay(){
  this.body = yield render('staff',{title:{"t1":"id","t2":"name","t3":"sex","t4":"old","t5":"birthday"},
                                    apple:[{"id":4,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"},
                                           {"id":5,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"},
                                           {"id":6,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"}]});
}

function * list(){
  this.body = yield render('staff',{title:{"t1":"id","t2":"name","t3":"sex","t4":"old","t5":"birthday"},
                                    apple:[{"id":7,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"},
                                           {"id":8,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"},
                                           {"id":9,"name":"apple","sex":"男","old":18,"birthday":"85/07/06"}]});
}

app.listen(3000);
console.log('listening on port 3000');
