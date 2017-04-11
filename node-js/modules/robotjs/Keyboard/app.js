// Type "Hello World" then press enter.
var robot = require("robotjs");
var koa = require('koa');
var Router = require('koa-router');

var app = koa();
var router = new Router();

router.get('/',function * (){

});

// Type "Hello World".
robot.typeString("Hello World");

// Press enter.
robot.keyTap("enter");

app.use(router.middleware());
app.listen(3000);
