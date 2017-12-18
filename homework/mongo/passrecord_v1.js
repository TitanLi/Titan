var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var co = require('co');

var db;
var num = 1;
var posts,data,carId,sId,gId,dateTime;
MongoClient.connect("mongodb://localhost:27017/etag", function(err, dbs){
    db = dbs;

    var carCol = db.collection('newCar');
    var passCol = db.collection('newPassrecord');
    var passStream = passCol.find().stream();
    var passCol_v1 = db.collection('newPassrecord_v1');

    var carIdSearch = async (carId,sId,gId,dateTime) => {
      posts = await carCol.findOne({"carid":carId});
      data = {
        car:{
	         carId:posts.carid,
	         typeName:posts.typename
        },
        sId:sId,
        gId:gId,
        dateTime:dateTime
      }
      carInsert(data);
    };

    var carInsert = async (data) => {
      await passCol_v1.insert(data)
      console.log(num++);
    }
    co(function * (){
          // Execute find on all the documents
          passStream.on('close', function() {
            db.close();
          });

          passStream.on('data', function(data) {
            carId = data.carid;
            sId = data.sid;
            gId = data.gid;
            dateTime = data.date_time;
            carIdSearch(carId,sId,gId,dateTime);
        });
        //5573721
    });
});
