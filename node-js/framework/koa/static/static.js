var serve = require('koa-static');

app.use(serve(__dirname+'/public'));
