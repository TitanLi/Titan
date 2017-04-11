var fs = require('fs');

//非同步讀取目錄檔案清單
fs.readdir('./',function(err,files){
  if(err){
    console.log(err);
    return;
  }

  for(var index in files){
    console.log(files[index]);
  }
});

//同步讀取目錄檔案清單
var files = fs.readdirSync('./');
for(var index in files){
  console.log(files[index]);
}

//監控
fs.watch('./myfile.txt',function(event,filename){
  console.log(event,filename);
})

//讀檔
fs.readFile('./myfile.txt',function(err,connect){
  if(!err){
    console.log(connect.toString());
  }else{
    console.log('Failed to read');
    return;
  }
});

//加入資料並覆蓋
fs.writeFile('./myfile.txt','hello',function(err){
  if(!err){
    console.log('ok');
  }else{
    console.log('Failed to write');
  }
});

//檔案是否存在
fs.exists('./myfile.txt',function(exists){
  if(exists){
    console.log('myfile.txt is exists');
  }else{
    console.log('myfile.txt doesn\'t exists!');
  }
});

//加入資料不覆蓋
fs.appendFile('./myfile.txt','Titan',function(err){
  if(!err){
    console.log('ok');
  }else{
    console.log('Failed to appendFile');
  }
});

//刪除檔案
fs.unlink('./myfile.txt',function(err){
  if(err){
    console.error(err);
    return;
  }
  console.log('Removed');
});
