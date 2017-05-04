var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = koa();

// database
// var posts = [];
var db;

MongoClient.connect("mongodb://localhost:27017/blog",function(err,pDb){
  if(err){
    return console.dir(err);
  }
  db = pDb;
});

// middleware
app.use(logger());

// route middleware
app.use(route.get('/', list));
app.use(route.get('/post/new', add));
app.use(route.get('/post/:id', show));
app.use(route.post('/post', create));

// route definitions
function *list() {
  var collection = db.collection('post');                           //選擇collection為post
  var posts = yield collection.find().toArray();                    //將資料以陣列表示
  this.body = yield render('list', { posts: posts });               //選擇list.html並將posts傳入
}

function *add() {
  this.body = yield render('new');                                  //選擇new.html
}

function *show(id) {
  // var post = posts[id];
  var collection = db.collection('post');                           //選擇collection為post
  var posts = yield collection.find({_id:ObjectId(id)}).toArray();  //搜尋特定id的資料，並以陣列表示
  var post = posts[0];                                              //選擇第一筆資料
  if (!post) this.throw(404, 'invalid post id');                    //該筆資料不存在
  this.body = yield render('show', { post: post });                 //選擇show.html並將post傳入
}

function *create() {
  var post = yield parse(this);   //{ title: 'apple', body: 'apple' }     //接收html傳來的資料
  // posts.push(post);               //[{ title: 'apple', body: 'apple' }]
  // var id = posts.length - 1;
  var date = new Date();                                            //取得日期
  post.created_at = date.toString();                                //加入日期資料
  // post.id = id;
  var collection = db.collection('post');                           //選擇collection為post
  var results = yield collection.insertMany([post],{w:1});          //新增一筆資料https://docs.mongodb.com/manual/reference/write-concern/
  this.redirect('/');
}

// listen
app.listen(3000);
console.log('listening on port 3000');
