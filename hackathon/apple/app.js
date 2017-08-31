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
router.post('/device/create',createDevice);
router.post('/device/delete',deleteDevice);
router.post('/sensor/create',createSensor);
router.post('/sensor/status',sensorStatus);
router.post('/sensor/update',sensorUpdate);
router.post('/sensor/delete',sensorDelete);
router.get('/mbed/:deviceID/:w1/:w2/:w3/:w4/',mbedSensor);
router.get('/popular',popular);

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
    if(userName != null && account != null && password != null){
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
  var judgmentAccount = yield collection.findOne({account:account,password:password});
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

function * createDevice(){
  var request = this.request.body;
  var userID = request.userID;
  var deviceID = request.deviceID;
  var collection = db.collection('device');
  var findDev = yield collection.findOne({deviceID:deviceID});
  if(findDev == null){
    yield collection.insert({'deviceID':deviceID,'setTime':new Date().getTime()});
    this.body = {
      message : "成功"
    }
  }else{
    this.body = {
      message : "此裝置已註冊"
    }
  }
}

function * deleteDevice(){
  var request = this.request.body;
  var userID = request.userID;
  var deviceID = request.deviceID;
  var collectionDevice = db.collection('device');
  var collectionSensor = db.collection('sensor');
  if(userID != null && deviceID != null){
    yield collectionDevice.remove({deviceID:deviceID});
    yield collectionSensor.remove({deviceID:deviceID});
    this.body = {
      message : "成功"
    }
  }else{
    this.body = {
      message : "失敗"
    }
  }
}

function * createSensor(){
  var request = this.request.body;
  var userID = request.userID;
  var deviceID = request.deviceID;
  var containerPosition = request.containerPosition;
  var containerName = request.containerName;
  var brand = request.brand;
  var collectionDevice = db.collection('device');
  var collectionSensor = db.collection('sensor');
  var collectionSensorLog = db.collection('sensorLog');
  var deviceStatus = yield collectionDevice.findOne({deviceID:deviceID});
  var sensorPosition = yield collectionSensor.findOne({deviceID:deviceID,containerPosition:containerPosition});
  if(deviceStatus != null){
    if(1 <= parseInt(containerPosition) && parseInt(containerPosition) <= 4){
      if(sensorPosition==null){
        if(userID != null && deviceID != null && containerPosition != null && containerName != null && brand != null){
          var data = {
            'userID' : userID,
            'deviceID' : deviceID,
            'containerPosition' : containerPosition,
            'containerName' : containerName,
            'brand' : brand,
            'weight' : 100,
            'setTime' : new Date().getTime()
          };
          var dataLog = {
            'userID':userID,
            'deviceID':deviceID,
            'containerPosition':containerPosition,
            'containerName':containerName,
            'brand':brand,
            'setTime' : new Date().getTime()
          };
          yield collectionSensor.insert(data);
          yield collectionSensorLog.insert(dataLog);
          this.body = {
            message : "成功"
          }
        }else{
          this.body = {
            message : "失敗"
          }
        }
      }else{
        this.body = {
          message : "此位子已有容器"
        }
      }
    }else{
      this.body = {
        message : "位子範圍錯誤"
      }
    }
  }else{
    this.body = {
      message : "此裝置上未註冊"
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
        deviceID : sensorStatus[i].deviceID,
        containerPosition : sensorStatus[i].containerPosition,
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
  var deviceID = request.deviceID;
  var containerPosition = request.containerPosition;
  var containerName = request.containerName;
  var brand = request.brand;
  var collectionSensor = db.collection('sensor');
  var collectionSensorLog = db.collection('sensorLog');
  var sensorUpdate = yield collectionSensor.findOne({deviceID:deviceID,containerPosition:containerPosition});
  if(1 <= parseInt(containerPosition) && parseInt(containerPosition) <= 4){
    if(sensorUpdate != null){
      if(userID != null && deviceID != null && containerPosition != null && containerName != null && brand != null){
        yield collectionSensor.update({deviceID:deviceID,containerPosition:containerPosition},{
          '$set': {
              'containerName':containerName,
              'brand':brand,
              'setTime' : new Date().getTime()
          }
        });
        var dataLog = {
          'userID':userID,
          'deviceID':deviceID,
          'containerPosition':containerPosition,
          'containerName':containerName,
          'brand':brand,
          'setTime' : new Date().getTime()
        };
        yield collectionSensorLog.insert(dataLog);
        this.body = {
          message : "成功"
        }
      }else{
        this.body = {
          message : "失敗"
        }
      }
    }else{
      this.body = {
        message : "此位子無容器"
      }
    }
  }else{
    this.body = {
      message : "位子範圍錯誤"
    }
  }
}

function * sensorDelete(){
  var request = this.request.body;
  var userID = request.userID;
  var deviceID = request.deviceID;
  var containerPosition = request.containerPosition;
  var collection = db.collection('sensor');
  var sensorDelete = yield collection.findOne({userID:userID,deviceID:deviceID,containerPosition:containerPosition});
  if(1 <= parseInt(containerPosition) && parseInt(containerPosition) <= 4){
    if(sensorDelete != null){
      if(userID != null && deviceID != null && containerPosition != null){
        yield collection.remove({userID:userID,deviceID:deviceID,containerPosition:containerPosition});
        this.body = {
          message : "成功"
        }
      }else{
        this.body = {
          message : "失敗"
        }
      }
    }else{
      this.body = {
        message : "此位子無容器"
      }
    }
  }else{
    this.body = {
      message : "位子範圍錯誤"
    }
  }
}

function * mbedSensor(){
  var collection = db.collection('sensor');
  yield collection.update({deviceID:this.params.deviceID,containerPosition:"1"},{
    '$set': {
        'weight': this.params.w1/1000
    }
  });
  yield collection.update({deviceID:this.params.deviceID,containerPosition:"2"},{
    '$set': {
        'weight': this.params.w2/1000
    }
  });
  yield collection.update({deviceID:this.params.deviceID,containerPosition:"3"},{
    '$set': {
        'weight': this.params.w3/1000
    }
  });
  yield collection.update({deviceID:this.params.deviceID,containerPosition:"4"},{
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

function * popular(){
  var collection = db.collection('sensorLog');
  var data = yield collection.find({}).toArray();
  var brand = new Array();
  var brandPopular = new Array();
  var count = 0;
  for(var i=0 ; i<data.length ; i++){
    brand.push(data[i].brand);
  }
  var result=brand.filter(function(element, index, arr){
    return arr.indexOf(element)=== index;
  });
  function * apple(){
    var collection = db.collection('sensorLog');
    var brandNum = yield collection.find({brand:result[count]}).toArray();
    yield function(done){
      brandPopular.push(
        {
          brand:result[count],
          count:brandNum.length
        }
      );
      done();
    }
    if(count<result.length-1){
      count++;
      yield apple();
    }else{
      return;
    }
  }
  yield apple();
  this.body = brandPopular;
}
app.use(router.middleware());
app.listen(3000,function(){
  console.log('listening port on 3000');
});
