var file = "./sqliteDemo.db";                                                            //載入資料庫

var sqlite3 = require("sqlite3").verbose();                                              //載入 sqlite3

var db = new sqlite3.Database(file);                                                     //新增一個sqlite3的資料庫sqliteDemo.db

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS  tableName (name TEXT,remark TEXT)");               //如果表格tableName不存在，就新增tableName

  var sqlInsert = "INSERT INTO tableName(name,remark) VALUES (?,?)";                     //新增資料
  db.run(sqlInsert,["A","aaa"]);
  db.run(sqlInsert,["B","bbb"]);
  db.run(sqlInsert,["C","ccc"]);
  db.run(sqlInsert,["D","ddd"]);

  var sqlSelect = "SELECT rowid AS id, name,remark FROM tableName";                      //查詢資料
  db.each(sqlSelect, function(err, row) {
    console.log(row.id + ": " + row.name + ":" + row.remark);                            //印出tableName的id,name,remark
  });

  var sqlUpdate="update tableName set remark=? where name=?" ;                           //更新資料
  db.run(sqlUpdate,["J","D"]);                                                           //找出name="D"的欄位將remark="J"

  var sqlUpdateSelect = "SELECT rowid AS id, name,remark FROM tableName where name=?";   //查詢更新後的資料
  db.each(sqlUpdateSelect,"J", function(err, row) {
    console.log(row.id + ":" + row.name + ":" + row.remark);                             //印出name="D"的id,name,remark
  });

  var sqlDelete = "delete from tableName";                                               //刪除資料
  db.run(sqlDelete);

});

db.close();
