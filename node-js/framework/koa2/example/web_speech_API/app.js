const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const serve = require('koa-static');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const http = require('http');
const socket = require('socket.io');
const TTSClient = require('itri-tts');
const render = require('koa-swig');
const co = require('co');

const account = require('./test/config.json');

const app = new koa();
const router = Router();
const server = http.createServer(app.callback());
const io = socket(server);
const tts = new TTSClient(account.accountID, account.password);

var text = '您好，我是Bruce';
var convertID,url,status;

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname+'/lib'));
app.use(serve(__dirname+'/img'));
app.use(serve(__dirname+'/css'));
app.use(serve(__dirname+'/script'));
app.use(serve(__dirname+'/config'));
app.use(router.routes());

app.context.render = co.wrap(render({
  root: __dirname + '/views',
  autoescape: true,
  cache: 'memory',
  ext: 'html',
}));

router.get('/',index);

async function index(ctx){
  await new Promise (function(resolve,reject){
    tts.ConvertSimple(text, function (err, result) {
      if (err) throw err
      if (result.resultString == "success"){
        convertID = parseInt(result.resultConvertID);
        resolve();
      }
    });
  });

  while (status != "completed") {
    await new Promise (function(resolve,reject){
      console.log(convertID);
      tts.GetConvertStatus(convertID, function (err, result) {
        if (err) throw err
        if (result.resultString == "success"){
          url = result.resultUrl;
          status = result.status;
          console.log(result);
          resolve();
        }
      });
    });
  }

  ctx.body = await ctx.render('index',{url:url});
}

io.on('connection',(socket) => {
  console.log('a user connected');
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });
});

server.listen(3000,function(){
  console.log('listening on port 3000');
});
