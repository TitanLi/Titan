var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = koa();

// database
var posts = [];

// middleware
app.use(logger());

// route middleware
app.use(route.get('/', list));
app.use(route.get('/post/new', add));
app.use(route.get('/post/:id', show));
app.use(route.post('/post', create));

// route definitions
function *list() {
  this.body = yield render('list', { posts: posts });
}

function *add() {
  this.body = yield render('new');
}

function *show(id) {
  var post = posts[id];
  if (!post) this.throw(404, 'invalid post id');
  this.body = yield render('show', { post: post });
}

function *create() {
  var post = yield parse(this);   //{ title: 'apple', body: 'apple' }
  posts.push(post);               //[{ title: 'apple', body: 'apple' }]
  var id = posts.length - 1;
  var date = new Date();
  post.created_at = date.toString();
  post.id = id;
  this.redirect('/');
}

// listen
app.listen(3000);
console.log('listening on port 3000');
