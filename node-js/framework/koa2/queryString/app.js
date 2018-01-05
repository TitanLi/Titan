const koa = require('koa');
const Router = require('koa-router');

const app = new koa();
const router = Router();

//http://127.0.0.1:3001/?apple=123456
router.get('/',async (ctx) => {
  ctx.body = ctx.query.apple;
})

app.use(router.routes());
app.listen(3001);
