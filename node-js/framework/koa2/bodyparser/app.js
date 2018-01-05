const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new koa();
const router = Router();

app.use(bodyParser());

router.post('/',async (ctx) => {
  ctx.body = ctx.request.body.apple;
});

app.use(router.routes());
app.listen(3001);
