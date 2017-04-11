var fs = require('fs');

fs.rename(oldPath,newPath,callback) //重新命名檔案名檔案名稱
fs.renameSync(oldPath,newPath)  //重新命名檔案名稱
fs.rename('126.txt','126.txt', function(err){
 if(err){
  throw err;
 }
 console.log('done!');
})

fs.open(path,flags[,mode],callback) //打開檔案
// r 以讀取模式打開。如果文件不存在拋出錯誤訊息
// r+ 以讀寫模式打開。如果文件不存在拋出錯誤訊息
// rs 以同步的方式讀取文件
// rs+ 以同步的方式讀取和寫入文件
// w 以寫入模式打開文件，如果文件不存在則創建
// a 以追加模式打開文件，如果文件不存在則創建

fs.open('./126.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打開成功！");
});

fs.close(fd,'callback') //關閉檔案
fs.open('./126.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打開成功！");

   fs.close(fd,function(){
     console.log('Done');
   });
});

fs.ftruncate(fd,len,callback) //透過指定fd刪除檔案部份長度
fs.ftruncateSync(fd,len)  //透過指定fd刪除檔案部份長度
fs.open('./126.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打開成功！");

   fs.ftruncate(fd, 6, function(err){
     if(err){
       throw err;
     }
     console.log('文件内容截断成功');
   });
});

fs.truncate(path,len,callback)  //刪除檔案部份長度
fs.truncateSync(path,len) //刪除檔案部份長度
fs.truncate('126.txt',2,function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打開成功！");
 });

fs.chmod(path,mode,callback) //改變檔案的檔案權限
fs.chmodSync(path,mode) //改變檔案的檔案權限
//所有者（user）组群（group）其他人（other）
//mode=rwxrwxrwx(2)可用十六進位0xxx
//r 可被讀取
//w 可被寫入
//x 可被執行
//- 表示相應的權限還沒被授予
fs.chmod('./126.txt',0777,function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打開成功！");
});

fs.rmdir(path,callback) //移除資料夾
fs.rmdirSync(path)  //移除資料夾
fs.rmdir('./a',function(err){
  if(err){
    return console.error(err);
  }
});

fs.mkdir(path,[mode],callback)  //建立資料夾
fs.mkdirSync(path,[mode]) //建立資料夾
fs.mkdir('./a',0777,function(err){
  if(err){
    console.console.error(err);
  }
});

fs.readdir(path,callback) //讀取資料夾並用陣列回傳資料夾的檔案和目錄
fs.readdir('./a',function(err,files){
  if(err){
    return console.error(err);
  }
  console.log(files);
});

fs.readFile(filename,[options],callback)  //讀入檔案
fs.readFile('./126.txt',"utf8",function(err,content){
  //err用來表示錯誤訊息，如順利回傳null
  if (err) {
    console.log('Failed to read');
    return;
  }
  console.log(content);
});

fs.writeFile(filename,data,[options],callback)  //把資料寫入檔案
fs.writeFile('./126.txt','hello',"utf8",function(err){
  if(err){
    return console.error(err);
  }
});

fs.appendFile(filename,data,[options],callback)// 添加資料到檔案結尾
fs.appendFile('./126.txt','Titan',function(err){
  if(err){
    return console.error(err);
  }
});

fs.watchFile(filename,[listen]) //監聽檔案是否有被讀取及判斷是否被修改
fs.watchFile('./126.txt',function(curr,prev){
  console.log(prev.mtime);  //prev表示本次修改之前的訊息
  console.log(curr.mtime);  //curr表示修改之後的的訊息
  if (curr.mtime.getTime() !== prev.mtime.getTime())
        console.log('file update');
});

fs.unwatchFile(filename,[listen]) //取消監聽檔案是否被讀取
var listener1 = function (curr, prev) { console.log('touched 1'); };
fs.watchFile('126.txt', listener1);
fs.unwatchFile('126.txt', listener1);

fs.exists(path,callback) //判斷檔案是否存在
fs.existsSync(path) //判斷檔案是否存在
fs.exists('./126.txt',function(exists){
  if (exists) {
      console.log('126.txt exists!');
  }
  else {
    console.log('126.txt doesn\'t exists!');
  }
})
