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
//OLAMI教學：https://tw.olami.ai/wiki/?mp=sdk&content=sdk/nodejs/reference.html
const Bot = require('./natural-language/test-input.js');

const tts = new TTSClient(account.accountID, account.password);

const app = new koa();
const router = Router();
const server = http.createServer(app.callback());
const io = socket(server);

var convertID,url,status;
var bot,botMsg;

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
  bot = new Bot(account.olamiURL,account.olamiAppKey,account.olamiAppSecret,"你是誰");
  botMsg = await bot.naturalLanguage();
  console.log(botMsg);
  await new Promise (function(resolve,reject){
    tts.ConvertSimple(botMsg, function (err, result) {
      if (err) throw err
      if (result.resultString == "success"){
        convertID = parseInt(result.resultConvertID);
        status = "";
        resolve(convertID);
      }
    });
  });

  while (status != "completed") {
    await new Promise (function(resolve,reject){
      tts.GetConvertStatus(convertID, function (err, result) {
        if (err) throw err
        if (result.resultString == "success"){
          url = result.resultUrl;
          status = result.status;
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
