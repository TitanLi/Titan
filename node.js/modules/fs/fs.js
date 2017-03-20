var fs = require('fs');

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
