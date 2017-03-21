var fsextra = require('fs-extra');

//刪除有內容的目錄
fsextra.remove('./test',function(err){
  if(err){
    console.error(err);
    return;
  }
  console.log('Renamed');
});

//搬移檔案
fsextra.move('./test/test.js','./test1/demo.js',function(err){
  if(err){
    console.error(err);
  }

  console.log('Moved');
});

//搬移且覆蓋目標路徑
fsextra.move('./test/test.js','./test1/demo.js',{clobber : true},function(err){
  if(err){
    console.error(err);
    return;
  }
  console.log('Moved');
});

//複製檔案
fsextra.copy('./test/test.js','./test1/demo.js',function(err){
  if(err){
    console.error(err);
    return;
  }
  console.log('Copied');
})
