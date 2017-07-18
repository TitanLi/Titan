var co = require('co');

function updateInfo() {
    // 返回一個將被執行的函數
    return function(done) {
        // 可以執行各種異步工作
        setTimeout(function() {
            // 完成工作後執行 callback，參數一為錯誤訊息，參數二為回傳值
            done(null, 'Done');
        }, 1000);
    };
}

co(function *() {
    // 執行並等待回傳值
    var ret = yield updateInfo();
    // 一秒後收到回傳值並印出來
    console.log(ret);
});
