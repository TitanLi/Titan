const koa = require('koa');
const logger = require('koa-logger');

const app = new koa();

app.use(logger());

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3001);
