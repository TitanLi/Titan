var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var co = require('co');

var db;
var num = 1;
var posts,data,carId,sId,gId,dateTime;
var dataObj = {};
MongoClient.connect("mongodb://localhost:27017/etag", function(err, db){

    var passCol = db.collection('newPassrecord');
    var passStream = passCol.find().stream();
    var passCol_v1 = db.collection('newPassrecord_v2');
    var carCol = db.collection('newCar');
    var carStream = carCol.find().stream();

    var carInsert = async (carId,sId,gId,dateTime) => {
      data = {
        car:{
	         carId:carId,
	         typeName:dataObj[carId]
        },
        sId:sId,
        gId:gId,
        dateTime:dateTime
      }
      await passCol_v1.insert(data)
    };

    function fun1(done){
      // Execute find on all the documents
      carStream.on('end', function() {
        num=1;
        console.log(dataObj);
        done();
      });

      carStream.on('data', function(data) {
        console.log(num++);
        dataObj[data.carid]=data.typename;
        // console.log(dataObj);
      });
    }

    function fun2(done){
      passStream.on('end', function() {
        db.close();
        done();
      });

      passStream.on('data', function(data) {
        carId = data.carid;
        sId = data.sid;
        gId = data.gid;
        dateTime = data.date_time;
        carInsert(carId,sId,gId,dateTime);
        console.log(num++);
      });
    }

    co(function * (){
      yield fun1;
      yield fun2;
    });
    //5573721
    //db.newPassrecord_v2.aggregate([{$group:{_id:"$car.typeName",count:{$sum:1}}}])
    //db.newPassrecord_v2.mapReduce(function(){emit(this.car.typeName,this._id);},function(key,values){return values.length;},query:{dateTime:{$lt:ISODate("2017-05-01T09:31:51.680Z"),$gte:ISODate("2017-05-01T09:04:51.680Z")}}, out:"asd"})
});
