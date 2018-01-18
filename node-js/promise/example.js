function doAsyncTask(done){
  setTimeout(function(){
    console.log(123);
    done();
  },3000);
}

var task = new Promise(function(resolve, reject) {
    // 執行一個非同步的工作，完成後呼叫帶入的 callback
    doAsyncTask(function(err) {
        // 有問題呼叫 reject，並帶入錯誤值
        if (err)
            return reject(err);
        // 成功呼叫 resolve 並帶入回傳值
        resolve('VALUE');
    });
});

// 使用 then 去執行並等待工作完成，成功會呼叫 callback，失敗則用 catch 去接收。
task
    .then(function(val) {
        console.log(val);
    })
    .catch(function(err) {
        console.log(err);
    });
