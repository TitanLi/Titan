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
app.use(route.get('/customer/information',customerInformation));
app.use(route.get('/customer/admin',customerAdmin));
app.use(route.get('/customer/administer',customerAdminister));
app.use(route.get('/customer/administer/list',customerAdministerList));
app.use(route.get('/project',project));
app.use(route.get('/project/information',projectInformation));
app.use(route.get('/project/admin',projectAdmin));
app.use(route.get('/project/administer',projectAdminister));
app.use(route.get('/project/administer/list',projectAdministerList));
app.use(route.get('/staff',staff));
app.use(route.get('/staff/admin',staffAdmin));
app.use(route.get('/staff/information',information));
app.use(route.get('/staff/pay',pay));
app.use(route.get('/staff/list',list));
app.use(route.get('/administer',staffAdminister));
app.use(route.get('/administer/information',adminInformation));
app.use(route.get('/administer/pay',adminPay));
app.use(route.get('/administer/list',adminList));
app.use(route.post('/customer',customerSearch));
app.use(route.post('/customer/admin',customerAdminData));
app.use(route.post('/insert/customer',insertCustomer));
app.use(route.post('/update/customer',updateCustomer));
app.use(route.post('/delete/customer',deleteCustomer));
app.use(route.post('/project',projectSearch));
app.use(route.post('/project/admin',projectAdminData));
app.use(route.post('/insert/project',insertProject));
app.use(route.post('/update/project',updateProject));
app.use(route.post('/delete/project',deleteProject));
app.use(route.post('/admin',adminData));
app.use(route.post('/insert/information',insertInformation));
app.use(route.post('/update/information',updateInformation));
app.use(route.post('/delete/information',deleteInformation));
app.use(route.post('/insert/pay',insertPay));
app.use(route.post('/update/pay',updatePay));
app.use(route.post('/delete/pay',deletePay));
app.use(route.post('/insert/list',insertList));
app.use(route.post('/update/list',updateList));
app.use(route.post('/delete/list',deleteList));


function * index(){
  this.body = yield render('index');
}

function * customer(){
  this.body = yield render('customer');
}

function * customerInformation(){
  var collection = db.collection('information');                           //選擇collection為information
  var data = yield collection.find().toArray();
  var dataArray = [];
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"id" : data[i].id, "name" : data[i].name, "sex" : data[i].sex, "old" : data[i].old, "birthday" : data[i].birthday};
  }
  this.body = yield render('customer',{subject:"information",
                                      title:{"t1":"id","t2":"name","t3":"sex","t4":"old","t5":"birthday"},
                                      apple:dataArray});
}

function * customerAdmin(){
  this.body = yield render('customerAdmin');
}

function * customerAdminData(){
  var data = yield parse(this);
  if(data.account == 'root' && data.password == 'apple'){
    message='';
    this.redirect('/customer/administer');
  }else{
    this.redirect('/customer/admin');
  }
}

function * customerAdminister(){
  this.body = yield render('customerAdminister');
}

function * customerAdministerList(){
  var collection = db.collection('information');                           //選擇collection為information
  var data = yield collection.find().sort({id: 1}).toArray();
  var dataArray = [];
  count = 1;
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"td" : i+1,"id" : data[i].id, "name" : data[i].name, "sex" : data[i].sex, "old" : data[i].old, "birthday" : data[i].birthday};
    count = data[i].id+1;
  }
  this.body = yield render('customerAdminister',{subject:"information",
                                        title:{"t1":"數量","t2":"id","t3":"name","t4":"sex","t5":"old","t6":"birthday","t7":"動作"},
                                        apple:dataArray,
                                        countId:count,
                                        router:"/insert/customer",
                                        value:"新增"});
}

function * customerSearch(date){
  var data1 = yield parse(this);
  console.log(data1);
  var collection = db.collection('information');                           //選擇collection為information
  var data = yield collection.find({"name":data1.search}).toArray();
  var dataArray = [];
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"id" : data[i].id, "name" : data[i].name, "sex" : data[i].sex, "old" : data[i].old, "birthday" : data[i].birthday};
  }
  this.body = yield render('customer',{subject:"information",
                                    title:{"t1":"數量","t2":"id","t3":"name","t4":"sex","t5":"old","t6":"birthday","t7":"動作"},
                                    apple:dataArray});
}

function * insertCustomer(){
  var data = yield parse(this);
  var insertData = {"id" : count, "name" : data.name, "sex" : data.sex, "old" : data.old, "birthday" : data.birthday};
  var collection = db.collection('information');
  var data = yield collection.insert(insertData);
  this.redirect('/customer/administer/list');
}

function * updateCustomer(){
  var data = yield parse(this);
  console.log(data);
  var findData = {"id" : parseInt(data.id)};
  var collection = db.collection('information');
  var data = yield collection.update(findData,{
                                      '$set':{"id" : parseInt(data.id), "name" : data.name, "sex" : data.sex, "old" : data.old, "birthday" : data.birthday}
                                    });
  this.redirect('/customer/administer/list');
}

function * deleteCustomer(){
  var data = yield parse(this);
  console.log(data);
  var collection = db.collection('information');
  var data = yield collection.remove({"id" : parseInt(data.id), "name" : data.name, "sex" : data.sex, "old" : data.old, "birthday" : data.birthday});
  this.redirect('/customer/administer/list');
}

function * project(){
  this.body = yield render('project');
}

function * projectInformation(){
  var collection = db.collection('information');                           //選擇collection為information
  var data = yield collection.find().toArray();
  var dataArray = [];
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"id" : data[i].id, "name" : data[i].name, "sex" : data[i].sex, "old" : data[i].old, "birthday" : data[i].birthday};
  }
  this.body = yield render('project',{subject:"information",
                                    title:{"t1":"id","t2":"name","t3":"sex","t4":"old","t5":"birthday"},
                                    apple:dataArray});
}

function * projectAdmin(){
  this.body = yield render('projectAdmin');
}

function * projectAdminData(){
  var data = yield parse(this);
  if(data.account == 'root' && data.password == 'apple'){
    message='';
    this.redirect('/project/administer');
  }else{
    this.redirect('/project/admin');
  }
}

function * projectAdminister(){
  this.body = yield render('projectAdminister');
}

function * projectAdministerList(){
  var collection = db.collection('information');                           //選擇collection為information
  var data = yield collection.find().sort({id: 1}).toArray();
  var dataArray = [];
  count = 1;
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"td" : i+1,"id" : data[i].id, "name" : data[i].name, "sex" : data[i].sex, "old" : data[i].old, "birthday" : data[i].birthday};
    count = data[i].id+1;
  }
  this.body = yield render('projectAdminister',{subject:"information",
                                        title:{"t1":"數量","t2":"id","t3":"name","t4":"sex","t5":"old","t6":"birthday","t7":"動作"},
                                        apple:dataArray,
                                        countId:count,
                                        router:"/insert/project",
                                        value:"新增"});
}

function * projectSearch(date){
  var data1 = yield parse(this);
  console.log(data1);
  var collection = db.collection('information');                           //選擇collection為information
  var data = yield collection.find({"name":data1.search}).toArray();
  var dataArray = [];
  for(let i=0;i<data.length;i++){
    dataArray[i] = {"id" : data[i].id, "name" : data[i].name, "sex" : data[i].sex, "old" : data[i].old, "birthday" : data[i].birthday};
  }
  this.body = yield render('project',{subject:"information",
                                    title:{"t1":"數量","t2":"id","t3":"name","t4":"sex","t5":"old","t6":"birthday","t7":"動作"},
                                    apple:dataArray});
}

function * insertProject(){
  var data = yield parse(this);
  var insertData = {"id" : count, "name" : data.name, "sex" : data.sex, "old" : data.old, "birthday" : data.birthday};
  var collection = db.collection('information');
  var data = yield collection.insert(insertData);
  this.redirect('/project/administer/list');
}

function * updateProject(){
  var data = yield parse(this);
  console.log(data);
  var findData = {"id" : parseInt(data.id)};
  var collection = db.collection('information');
  var data = yield collection.update(findData,{
                                      '$set':{"id" : parseInt(data.id), "name" : data.name, "sex" : data.sex, "old" : data.old, "birthday" : data.birthday}
                                    });
  this.redirect('/project/administer/list');
}

function * deleteProject(){
  var data = yield parse(this);
  console.log(data);
  var collection = db.collection('information');
  var data = yield collection.remove({"id" : parseInt(data.id), "name" : data.name, "sex" : data.sex, "old" : data.old, "birthday" : data.birthday});
  this.redirect('/project/administer/list');
}

function * staff(){
  var collection = db.collection('staff');                           //選擇collection為staff
  var data = yield collection.find().toArray();
  this.body = yield render('staff',data[6]);
}

function * staffAdmin(){
  this.body = yield render('staffAdmin');
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


function * staffAdminister(){
  this.body = yield render('staffAdminister');
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
  this.body = yield render('staffAdminister',{subject:"information",
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
  this.body = yield render('staffAdminister',{subject:"pay",
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
    dataArray[i] = {"td" : i+1,"id" : data[i].id, "name" : data[i].name, "project" : data[i].project, "date" : data[i].date, "hours" : data[i].hours};
    count = data[i].id+1;
  }
  this.body = yield render('staffAdminister',{subject:"list",
                                         title:{"t1":"數量","t2":"id","t3":"name","t4":"project","t5":"date","t6":"hours","t7":"動作"},
                                         apple:dataArray,
                                         countId:count,
                                         router:"/insert/list",
                                         value:"新增"});
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

function * insertList(){
  var data = yield parse(this);
  var insertData = {"id" : parseInt(data.id), "name" : data.name, "project" : data.project, "date" : data.date, "hours" : data.hours};
  var collection = db.collection('list');
  var data = yield collection.insert(insertData);
  this.redirect('/administer/list');
}

function * updateList(){
  var data = yield parse(this);
  console.log(data);
  var findData = {"id" : parseInt(data.id)};
  var collection = db.collection('list');
  var data = yield collection.update(findData,{
                                      '$set':{"id" : parseInt(data.id), "name" : data.name, "project" : data.project, "date" : data.date, "hours" : data.hours}
                                    });
  this.redirect('/administer/list');
}

function * deleteList(){
  var data = yield parse(this);
  console.log(data);
  var collection = db.collection('list');
  var data = yield collection.remove({"id" : parseInt(data.id), "name" : data.name, "project" : data.project, "date" : data.date, "hours" : data.hours});
  this.redirect('/administer/list');
}

app.listen(3000);
console.log('listening on port 3000');
