const koa = require('koa');
const Router = require('koa-router');

const app = new koa();
const router = Router();

router.get('/',async (ctx) => {
  ctx.body = 'Hello World';
});

app.use(router.routes());
app.listen(3001);
