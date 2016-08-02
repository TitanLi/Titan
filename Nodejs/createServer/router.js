var express = require('express');
var url = require('url');
var bodyParse = require('body-parser');
var app = express();

//post
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

app.get('/',function(req,res){
  res.end('1')
});

app.get('/apple',function(req,res){
  res.send('apple');
});

app.get('/name',function(req,res){
  var arg = url.parse(req.url).query;         //方法一arg => aa=001&bb=002
  var arg = url.parse(req.url, true).query;   //方法二arg => { aa: '001', bb: '002' }

  console.log(req.query.name);
  res.end(arg.name);
});

app.post('/post',function(req,res){
  console.log(req.body.apple);
  res.end();
});

app.listen(3000);
