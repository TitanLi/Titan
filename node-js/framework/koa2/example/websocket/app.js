const koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const websockify = require('koa-websocket');
var events = require('events');

const app = websockify(new koa());

app.use(serve('./public'));

var eventEmitter = new events.EventEmitter();

var wsRouter = Router();
wsRouter.get('/', async function(ctx) {
    var self = ctx;

    function pushMessage(message) {
        self.websocket.send(message);
    }

    ctx.websocket.send('Welcome');
    ctx.websocket.on('message', function(msg) {
        eventEmitter.emit('update', msg);
        console.log(msg);
    });

    ctx.websocket.on('close', function() {
        console.log('disconnect');
        eventEmitter.removeListener('update', pushMessage);
    });

    eventEmitter.on('update', pushMessage);
});

app.ws
    .use(wsRouter.routes())
    .use(wsRouter.allowedMethods());

app.listen(3000);