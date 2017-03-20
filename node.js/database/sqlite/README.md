#sqlite 教學

##新增專案
**$mkdir sqliteDemo**

##進入專案
**$cd sqliteDemo**

##初始化
**$npm init**

##安裝sqlite
**$npm install sqlite3 --save**
(會自動在package.json的dependencies上新增 sqlite3)

##新增一個檔案sqliteDemo.js
**$mkdir sqliteDemo.js**

##引進sqlite
```
var file = "./sqliteDemo.db"; //載入資料庫
var sqlite3 = require("sqlite3").verbose(); //載入 sqlite3
var db = new sqlite3.Database(file); //新增一個sqlite3的資料庫sqliteDemo.js
```

##判斷table是否建立
```
db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS  tableName (name TEXT,remark TEXT)");
});

db.close();
```

##新增資料
```
var sqlInsert = "INSERT INTO tableName(name,remark) VALUES (?,?)";
db.run(sqlInsert,["A","aaa"]);
db.run(sqlInsert,["B","bbb"]);
db.run(sqlInsert,["C","ccc"]);
db.run(sqlInsert,["D","ddd"]);
```

##查詢
```
var sqlSelect = "SELECT rowid AS id, name,remark FROM tableName";
db.each(sqlSelect, function(err, row) {
    console.log(row.id + ": " + row.name + ":" + row.remark);
});
```

##修改
```
var sqlUpdate="update tableName set remark=? where name=?" ;
db.run(sqlUpdate,["J","D"]);
```

##刪除
var sqlDelete = "delete from tableName";  db.run(sqlDelete);

###sqlite基本指令
```
SQL指令都是以;做結尾
--表示註解
.help求助
.quit離開
create table tableName(one,two);新增table
Insert into tableName values('hello!',10);新增資料
select * from tableName;讀取資料
Update tableName set one = 'hello world!' where one = 'hello!';修改資料
```
