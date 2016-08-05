var file = './mqttSqlite.db';
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(file);

db.serialize(function(){
  db.run("CREATE TABLE IF NOT EXISTS  mqtt (user TEXT,message TEXT)");

  var sqlInsert = "INSERT INTO mqtt(user,message) VALUES (?,?)";                     //新增資料
  db.run(sqlInsert,["A","aaa"]);

  var sqlSelect = "SELECT rowid AS id, user,message FROM mqtt";                      //查詢資料
  db.each(sqlSelect, function(err, row) {
    console.log(row.id + ": " + row.user + ":" + row.message);                       //印出TABLENAME的id,NAME,REMARK
  });

  var sqlDelete = "delete from mqtt";                                                //刪除資料
  db.run(sqlDelete);
});
