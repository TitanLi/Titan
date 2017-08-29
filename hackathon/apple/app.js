var koa = require('koa');
var Router = require('koa-router')
var bodyParser = require('koa-bodyparser');
var MongoClient = require('mongodb').MongoClient;

var app = koa();
app.use(bodyParser());

var router = new Router();
var db;

MongoClient.connect("mongodb://localhost:27017/apple",function(err,pDb){
  if(err){
    return console.dir(err);
  }
  db = pDb;
});

router.post('/create/user',createUser);
router.post('/login',login);
router.post('/sensor/create',createSensor);
router.post('/sensor/status',sensorStatus);
router.post('/sensor/update',sensorUpdate);
router.get('/mbed/:sensorID/:w1/:w2/:w3/:w4/',mbedSensor);

function * createUser(){
  var request = this.request.body;
  var userName = request.userName;
  var account = request.account;
  var password = request.password;
  var collection = db.collection('user');
  var judgmentAccount = yield collection.find({account:account}).toArray();
  if(judgmentAccount != ""){
    this.body = {message:"此信箱已註冊"};
    console.log(1);
  }else{
    if(userName != "" && account != "" && password != ""){
      var data = {
        userName : userName,
        account : account,
        password : password
      }
      yield collection.insert(data);
      this.body = {message:"成功"};
    }else{
      this.body = {message:"輸入格式錯誤"};
    }
  }
  console.log(userName,account,password);
}

function * login(){
  var request = this.request.body;
  var account = request.account;
  var password = request.password;
  var collection = db.collection('user');
  var judgmentAccount = yield collection.findOne({account:account});
  console.log(judgmentAccount);
  if(judgmentAccount != null){
    this.body = {
      message : "成功",
      userName : judgmentAccount.userName,
      userID : judgmentAccount._id
    }
  }else{
    this.body = {
      message : "查無此用戶",
      userName : "",
      userID : ""
    }
  }
}

function * createSensor(){
  var request = this.request.body;
  var userID = request.userID;
  var sensorID = request.sensorID;
  var containerID = request.containerID;
  var containerName = request.containerName;
  var brand = request.brand;
  var collection = db.collection('sensor');
  var sensorStatus = yield collection.findOne({containerID:containerID});
  if(sensorStatus == null){
    if(userID != "" && sensorID != "" && containerID != "" && containerName != "" && brand != ""){
      var data = {
        userID : userID,
        sensorID : sensorID,
        containerID : containerID,
        containerName : containerName,
        brand : brand,
        weight : 100,
        setTime : new Date().getTime()
      }
      yield collection.insert(data);
      this.body = {
        message : "成功"
      }
    }else{
      this.body = {
        message : "失敗"
      }
    }
  }else {
    this.body = {
      message : "此容器已註冊"
    }
  }
}

function * sensorStatus(){
  var request = this.request.body;
  var userID = request.userID;
  var collection = db.collection('sensor');
  var sensorStatus = yield collection.find({userID:userID}).toArray();
  var data = new Array();
  yield function(done){
    for(var i=0 ; i<sensorStatus.length ; i++){
      let sensorData = {
        sensorID : sensorStatus[i].sensorID,
        containerID : sensorStatus[i].containerID,
        containerName : sensorStatus[i].containerName,
        brand : sensorStatus[i].brand,
        percent : sensorStatus[i].weight
      }
      data.push(sensorData);
    }
    done();
  }

  this.body = {
    data : data
  }
}

function * sensorUpdate(){
  var request = this.request.body;
  var userID = request.userID;
  var sensorID = request.sensorID;
  var containerID = request.containerID;
  var containerName = request.containerName;
  var collection = db.collection('sensor');
  var sensorStatus = yield collection.findOne({containerID:containerID});
  if(userID != "" && sensorID != "" && containerName != "" && containerID != ""){
    yield collection.update({containerID:containerID},{
      '$set': {
          'userID':userID,
          'sensorID':sensorID,
          'containerName':containerName
      }
    });
    this.body = {
      message : "成功"
    }
  }else{
    this.body = {
      message : "失敗"
    }
  }
}

function * mbedSensor(){
  var collection = db.collection('sensor');
  var data = yield collection.find({sensorID:this.params.sensor}).toArray();
  var sensorAry = new Array();
  yield function(done){
    for(var i=0 ; i<data.length ; i++){
      sensorAry[i] = data[i].containerID;
    }
    done();
  }
  yield collection.update({containerID:sensorAry[0]},{
    '$set': {
        'weight': this.params.w1/1000
    }
  });
  yield collection.update({containerID:sensorAry[1]},{
    '$set': {
        'weight': this.params.w2/1000
    }
  });
  yield collection.update({containerID:sensorAry[2]},{
    '$set': {
        'weight': this.params.w3/1000
    }
  });
  yield collection.update({containerID:sensorAry[3]},{
    '$set': {
        'weight': this.params.w4/1000
    }
  });
  this.body = {
    R_1:this.params.w1/1000*100,
    R_2:this.params.w2/1000*100,
    R_3:this.params.w3/1000*100,
    R_4:this.params.w4/1000*100
  }
}

app.use(router.middleware());
app.listen(3000,function(){
  console.log('listening port on 3000');
});
