#koa
```
koa採用Generator來控制非同步流程，常會使用yield
Generator長的會是一個以*符號開頭的function
```
```javascript
function * (){

}
```
##koa路由處理
```javascript
router.get('/apple',function * (){

});
```
##koa_server
-hello_world.js
##function中斷，執行下一個function，執行完後，繼續原function動作
-yield_next.js
##Koa application is not a 1-to-1 representation of a HTTP server
-listen.js
##錯誤偵測
-error_handling.js
