const koa = require('koa');
const Router = require('koa-router');

const app = new koa();
const router = Router();

router.get('/api/v1/user',async (ctx) => {
  //檢查Token,若有問題回傳 400 HTTP StatusCode
  if(ctx.query.token == '123'){
    ctx.throw(400);
  }

  ctx.body = 'Hello World';
});

app.use(router.routes());
app.listen(3001);
