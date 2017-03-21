var filewalker = require('filewalker');

//遍歷當前目錄檔案
filewalker('.')
  .on('dir',function(p){
    console.log('dir: %s', p);
  })
  .on('file',function(p,s){
    console.log('file: %s, %d bytes',p,s.size);
  })
  .on('error',function(err){
    console.log(err);
  })
  .on('done',function(){
    console.log('%d dirs, %d files, %d bytes', this.dirs, this.files, this.bytes);
  })
  .walk();
