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

const account = require('./config/config.json');
//OLAMI教學：https://tw.olami.ai/wiki/?mp=sdk&content=sdk/nodejs/reference.html
const Bot = require('./natural-language/test-input.js');

const tts = new TTSClient(account.accountID, account.password);

const app = new koa();
const router = Router();
const server = http.createServer(app.callback());
const io = socket(server);

var convertID,url,status;
var bot;
var apiStatus = false;

var options = {
  TTStext: '您好，我是Bruce，感謝您使用工研院文字轉語音Web服務。',
  TTSSpeaker: 'Angela',  // Bruce, Theresa, Angela, default = Bruce
  volume: 100,          // 0 ~ 100, default = 100
  speed: 0,             // -10 ~ 10, default = 0
  outType: 'wav',       // wav, flv
  PitchLevel: 0,        // -10 ~ 10, default = 0
  PitchSign: 0,         // 0, 1, 2, default = 0
  PitchScale: 5         // 0 ~ 20, default = 5
}

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname+'/lib'));
app.use(serve(__dirname+'/public/img'));
app.use(serve(__dirname+'/public/css'));
app.use(serve(__dirname+'/public/script'));
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
  olami("你是誰");
  ctx.body = await ctx.render('index');
}

//Socket.io connect
io.on('connection',(socket) => {
  console.log('a user connected');
  var socket = socket;
  socket.on('message', function(msg){
    console.log('message: ' + msg);
    olami(msg);
  });
});

/*
 * OLAMI API natural language
 * @param msg the message from socket.io webkitSpeechRecognition final_transcript
              or RESTful API get '/' who are you
*/
var olami = async function (msg){
  //OLAMI natural language response
  bot = new Bot(account.olamiURL,account.olamiAppKey,account.olamiAppSecret,msg);
  //Change options TTStext value
  options.TTStext = await bot.naturalLanguage();

  //Create audio file .wav
  await new Promise (function(resolve,reject){
    tts.ConvertAdvancedText(options, function (err, result) {
      if (err) throw err
      if (result.resultString == "success"){
        //Get convert ID
        convertID = parseInt(result.resultConvertID);
        status = "";
        resolve();
      }
    });
  });

  //Waiting itri tts create audio
  while (status != "completed") {
    //Get audio .wav url
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

  //Socket emit audio src
  io.emit('news',{url:url});
}

server.listen(3000,function(){
  console.log('listening on port 3000');
});
