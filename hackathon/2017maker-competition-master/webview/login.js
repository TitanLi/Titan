var koa = require('koa');
var app = koa();
var Router = require('koa-router');
var bodyparser = require('koa-bodyparser');
var views = require('co-views');
var router = new Router();
const logger = require('koa-logger'); //show post||get log
const session=require('koa-session');
const static = require('koa-static')
const path = require('path')
const staticPath = './img/'

var request = require('request');
app.use(static(
    path.join( __dirname,staticPath)
  ))
app.keys = ['this is my secret'];
app.use(session({
  key: 'koa:sess', // cookie name
  maxAge: 720000, // (number) maxAge in ms (default is 1 days)
  overwrite: true, //(boolean) can overwrite or not (default true) //
  httpOnly: true, // (boolean) httpOnly or not (default true) //
  signed: true, // (boolean) signed or not (default true) //
},app));

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var db;
MongoClient.connect("mongodb://localhost:27017/apple", function (err, pDb) {
    if (err) {
        return console.dir(err);
    }
    db = pDb;
});
var render = views(__dirname, {
    map : {html : 'swig'}
});
app.use(bodyparser());

// Api
var brandName = new Array();
var num = new Array() ;
var data = {userID:"" }

var getApi = function getApi (done){
    request.get('http://127.0.0.1:3000/popular', {form:data},function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error(err);
          }
          //console.log('body', body);
          var popular = JSON.parse(body);
          for(key in popular){
              brandName[key] = popular[key]["brand"];
              num[key] = popular[key]["count"];
          }
        consoleRequest();
        done();
        });
}
function consoleRequest(){
    console.log(brandName);
}


// var define mongo showUser collections
var login;
var user,pwd;
var userId = new Array();
var userName = new Array();
var userAccount = new Array();
var time = new Array();
var tableNum = new Array();

//show USER DATA FUNC
var showUserInfo = function showUserInfo(done) {
    var collection = db.collection('user');
    collection.find({}).sort( { setTime: -1 } ).toArray(function (err, data) {
       // console.log(data);
        for (var i = 0; i < data.length; i++) {
            userId[i] = data[i]._id.toString(),
            userName[i] = data[i].userName,
            userAccount[i] = data[i].account,
            time[i] = data[i].setTime,
            tableNum[i] = i;
        }
      done();
     });
};

router.get('/',function * (){
    this.body = yield render("index");
});
router.get('/admin',function * (){
    if (this.session.user ) {
        console.log('login....');
        yield getApi;
        yield showUserInfo;
        this.body = yield render("admin", {
            // for html's var
            "userId": userId,
            "userName": userName,
            "userAccount":userAccount,
            "time":time,
            "num": tableNum,
            "brand":brandName,
            "brandNum":num
        });
     }
    else {
        this.redirect("/");
     }
});

router.post('/',function * (){
    this.body = yield render("index");
    login = this.request.body;
    username = login['adminLogin'];
    psw = login['adminPassword'];
    if (username=='Admin'&&psw==='password') {
        //保存登入狀態
       console.log(this.session);
       this.session.user = username;
       this.redirect("admin");
   }
   else{
       this.redirect("/");
   }

});

app.use(router.middleware());
app.listen(5500,function(){
    console.log('listening port 5500');
});
