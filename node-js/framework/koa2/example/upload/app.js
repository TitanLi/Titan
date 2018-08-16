const koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const serve = require('koa-static');
const koaBody = require('koa-body');
const logger = require('koa-logger');
// const parse = require('await-busboy');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = new koa();
const router = Router();

app.use(logger());
// app.use(bodyparser());
app.use(koaBody({
    multipart: true
}));

app.use(async function(ctx, next) {
    await next();
    if (ctx.body || !ctx.idempotent) return;
    ctx.redirect('/404.html');
});

app.use(serve(__dirname + '/upload'));
app.use(serve(__dirname + '/public'));

app.use(async function(ctx, next) {
    // ignore non-POSTs
    if ('POST' != ctx.method) return await next();

    const file = ctx.request.files.file;
    console.log(ctx.request.files);
    const reader = fs.createReadStream(file.path);
    const ext = file.name.split('.').pop();
    const stream = fs.createWriteStream(path.join(__dirname, '/upload', `${file.name}.${ext}`));
    reader.pipe(stream);
    console.log('uploading %s -> %s', file.name, stream.path);

    ctx.redirect('/');
});

app.use(router.routes());
app.listen(3000, () => {
    console.log('listening port on 3000')
})