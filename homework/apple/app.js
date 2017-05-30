var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var serve = require('koa-static');
var parse = require('co-body');
var MongoClient = require('mongodb').MongoClient;
var render = require('./lib/render');

var app = koa();

var db;
var count;

MongoClient.connect("mongodb://localhost:27017/apple",function(err,pDb){
  if(err){
    return console.dir(err);
  }
  db = pDb;
});

app.use(logger());
app.use(serve('./views'));

app.use(route.get('/',index));
app.use(route.get('/customer',customer));
app.use(route.get('/project',project));
app.use(route.get('/staff',staff));
app.use(route.get('/staff/admin',admin));
app.use(route.get('/staff/information',information));
app.use(route.get('/staff/pay',pay));
app.use(route.get('/staff/list',list));
app.use(route.get('/administer',administer));
app.use(route.get('/administer/information',adminInformation));
app.use(route.get('/administer/pay',adminPay));
app.use(route.get('/administer/list',adminList));
app.use(route.post('/customer',customerData));
app.use(route.post('/admin',adminData));
app.use(route.post('/insert/information',insertInformation));
app.use(route.post('/update/information',updateInformation));
app.use(route.post('/delete/information',deleteInformation));
app.use(route.post('/insert/pay',insertPay));
app.use(route.post('/update/pay',updatePay));
app.use(route.post('/delete/pay',deletePay));

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
  var collection = db.collection('staff');                           //選擇collection為staff
  var data = yield collection.find().toArray();
  this.body = yield render('staff',data[6]);
}

function * admin(){
  this.body = yield render('admin');
}

function * adminData(){
  var data = yield parse(this);
  if(data.account == 'root' && data.password == 'apple'){
    message='';
    this.redirect('/administer');
  }else{
    this.redirect('/staff/admin');
  }
}

function * information(){
  var collection = db.collection('information');                           //選擇collection為information
  var data = yield collection.find().toArray();
  var dataArray = [];
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"id" : data[i].id, "name" : data[i].name, "sex" : data[i].sex, "old" : data[i].old, "birthday" : data[i].birthday};
  }
  this.body = yield render('staff',{subject:"information",
                                    title:{"t1":"id","t2":"name","t3":"sex","t4":"old","t5":"birthday"},
                                    apple:dataArray});
}

function * pay(){
  var collection = db.collection('pay');                           //選擇collection為pay
  var data = yield collection.find().toArray();
  var dataArray = [];
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"id" : data[i].id, "name" : data[i].name, "month" : data[i].month, "money" : data[i].money};
  }
  this.body = yield render('staff',{subject:"pay",
                                    title:{"t1":"id","t2":"name","t3":"month","t4":"money"},
                                    apple:dataArray});
}

function * list(){
  var collection = db.collection('list');                           //選擇collection為list
  var data = yield collection.find().toArray();
  var dataArray = [];
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"id" : data[i].id, "name" : data[i].name, "project" : data[i].project, "date" : data[i].date, "hours" : data[i].hours};
  }
  this.body = yield render('staff',{subject:"list",
                                    title:{"t1":"id","t2":"name","t3":"project","t4":"date","t5":"hours"},
                                    apple:dataArray});
}


function * administer(){
  this.body = yield render('administer');
}

function * adminInformation(){
  var collection = db.collection('information');                           //選擇collection為information
  var data = yield collection.find().sort({id: 1}).toArray();
  var dataArray = [];
  count = 1;
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"td" : i+1,"id" : data[i].id, "name" : data[i].name, "sex" : data[i].sex, "old" : data[i].old, "birthday" : data[i].birthday};
    count = data[i].id+1;
  }
  this.body = yield render('administer',{subject:"information",
                                        title:{"t1":"數量","t2":"id","t3":"name","t4":"sex","t5":"old","t6":"birthday","t7":"動作"},
                                        apple:dataArray,
                                        countId:count,
                                        router:"/insert/information",
                                        value:"新增"});
}

function * adminPay(){
  var collection = db.collection('pay');                           //選擇collection為pay
  var data = yield collection.find().sort({id: 1}).toArray();
  var dataArray = [];
  count = 1;
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"td" : i+1,"id" : data[i].id, "name" : data[i].name, "month" : data[i].month, "money" : data[i].money};
    count = data[i].id+1;
  }
  this.body = yield render('administer',{subject:"pay",
                                         title:{"t1":"數量","t2":"id","t3":"name","t4":"month","t5":"money","t6":"動作"},
                                         apple:dataArray,
                                         countId:count,
                                         router:"/insert/pay",
                                         value:"新增"});
}

function * adminList(){
  var collection = db.collection('list');                           //選擇collection為list
  var data = yield collection.find().toArray();
  var dataArray = [];
  count = 1;
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"id" : data[i].id, "name" : data[i].name, "project" : data[i].project, "date" : data[i].date, "hours" : data[i].hours};
    count = data[i].id+1;
  }
  this.body = yield render('administer',{subject:"list",
                                         title:{"t1":"id","t2":"name","t3":"project","t4":"date","t5":"hours","t6":"動作"},
                                         apple:dataArray});
}

function * insertInformation(){
  var data = yield parse(this);
  var insertData = {"id" : count, "name" : data.name, "sex" : data.sex, "old" : data.old, "birthday" : data.birthday};
  var collection = db.collection('information');
  var data = yield collection.insert(insertData);
  this.redirect('/administer/information');
}

function * updateInformation(){
  var data = yield parse(this);
  console.log(data);
  var findData = {"id" : parseInt(data.id)};
  var collection = db.collection('information');
  var data = yield collection.update(findData,{
                                      '$set':{"id" : parseInt(data.id), "name" : data.name, "sex" : data.sex, "old" : data.old, "birthday" : data.birthday}
                                    });
  this.redirect('/administer/information');
}

function * deleteInformation(){
  var data = yield parse(this);
  console.log(data);
  var collection = db.collection('information');
  var data = yield collection.remove({"id" : parseInt(data.id), "name" : data.name, "sex" : data.sex, "old" : data.old, "birthday" : data.birthday});
  this.redirect('/administer/information');
}

function * insertPay(){
  var data = yield parse(this);
  var insertData = {"id" : parseInt(data.id), "name" : data.name, "month" : data.month, "money" : data.money};
  var collection = db.collection('pay');
  var data = yield collection.insert(insertData);
  this.redirect('/administer/pay');
}

function * updatePay(){
  var data = yield parse(this);
  console.log(data);
  var findData = {"id" : parseInt(data.id)};
  var collection = db.collection('pay');
  var data = yield collection.update(findData,{
                                      '$set':{"id" : parseInt(data.id), "name" : data.name, "month" : data.month, "money" : data.money}
                                    });
  this.redirect('/administer/pay');
}

function * deletePay(){
  var data = yield parse(this);
  console.log(data);
  var collection = db.collection('pay');
  var data = yield collection.remove({"id" : parseInt(data.id), "name" : data.name, "month" : data.month, "money" : data.money});
  this.redirect('/administer/pay');
}

app.listen(3000);
console.log('listening on port 3000');
