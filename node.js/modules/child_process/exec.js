var child_process = require('child_process');

//執行命令ls ./
child_process.exec('ls ./',function(err,stdout,stderr){
  if(err){
    return;
  }
  console.log(stdout);
});
