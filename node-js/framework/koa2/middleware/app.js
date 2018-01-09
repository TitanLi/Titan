//所有連線可透過一系列、不只一個Middleware來進行處理，可以利用多次koa.use()來加入多格Middleware，
//多個Middleware可以用來做到很多功能，例如紀錄和顯示每個連線狀態
const koa = require('koa');

const app = new koa();

app.use(async (ctx,next) => {
  console.log('hello middleware');
  await next();
});

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3001);
