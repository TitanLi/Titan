var Router = require('koa-router');

var router = module.exports = new Router();

router.get('/', function *() {
    yield this.render('index');
});