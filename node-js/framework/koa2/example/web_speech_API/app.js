const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const serve = require('koa-static');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const http = require('http');
const socket = require('socket.io');

const render = require('./lib/render.js');

const app = new koa();
const router = Router();
const server = http.createServer(app.callback());
const io = socket(server);

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname+'/lib'));
app.use(serve(__dirname+'/img'));
app.use(serve(__dirname+'/css'));
app.use(serve(__dirname+'/script'));
app.use(serve(__dirname+'/config'));
app.use(router.routes());

router.get('/',async function(ctx){
  ctx.body = await render('index');
});

io.on('connection',(socket) => {
  console.log('a user connected');
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });
});

server.listen(3000,function(){
  console.log('listening on port 3000');
});
