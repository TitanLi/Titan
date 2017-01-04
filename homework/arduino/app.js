var SerialPort = require("serialport");
var mongodb = require('mongodb');

var port = new SerialPort("/dev/ttyACM0", {
    parser: SerialPort.parsers.readline('\n')
});
var mongodbServer = new mongodb.Server('127.0.0.1', 27017, {
    auto_reconnect: true
});
var db = new mongodb.Db('mongodb', mongodbServer);

var updateData = {};
port.on('open', function() {
  console.log('connect');
    port.on('data', function(data) {
        console.log(data);
        var date = new Date();
        var time = 100;
        var a = data.split("\r")

        var ans = a[0].split("#");
        if(ans[0]=='1'){
          ans[0] = "areaA";
        }else if(ans[0]=='2'){
          ans[0] = "areaB";
        }else if(ans[0]=='3'){
          ans[0] = "areaC";
        }else if(ans[0]=='4'){
          ans[0] = "areaD";
        }else if(ans[0]=='5'){
          ans[0] = "areaE";
        }else if(ans[0]=='6'){
          ans[0] = "areaF";
        }else if(ans[0]=='7'){
          ans[0] = "areaG";
        }else if(ans[0]=='8'){
          ans[0] = "areaH";
        }

        if(ans[0] == "areaA" || ans[0] == "areaB" || ans[0] == "areaC" || ans[0] == "areaD"
        || ans[0] == "areaE" || ans[0] == "areaF" || ans[0] == "areaG" || ans[0] == "areaH"){          //防止未註冊區域更改資料庫
          console.log("ok");
          db.open(function(err, data) {

            var options = {
                            "limit": 1,
                            "sort": {date : -1}
                          };
            db.collection(ans[0], function(err, collection) {
                  collection.find({},options).toArray(function(err, items) {      //找最近一筆的資料做比對
                    console.log(items);
                     time = parseInt(date.getTime())-items[0].date;
                     if(time < 1000){                                             //比對後時間小於1秒執行updateDate
                          updateData = {
                                     'date': items[0].date
                          }
                          collection.update(updateData, {
                                    '$set': {
                                       'name': ans[0],
                                       'food': ans[1],
                                       'people':ans[2],
                                       'dea':ans[3],
                                       'date':parseInt(date.getTime())
                                   }
                          });
                          db.close();
                    }else if(time > 1000){                                        //比對後時間大於1秒執行insert
                      var data = {
                          'name': ans[0],
                          'food': ans[1],
                          'people':ans[2],
                          'dea':ans[3],
                          'date':parseInt(date.getTime())
                      };
                      collection.insert(data, function(err, data) {
                          if (err) {
                              console.log('mqtt data insert failed');
                          } else {
                              console.log('mqtt data insert successfully');
                          }
                      });
                      db.close();
                    }
                 });
            });
          });
        }
    });
});
// open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message);
});
