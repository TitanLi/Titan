var express = require('express');
var cookieSession = require('cookie-session');

var app = express();

//防止Proxy造成Cookie失敗
app.set('trust proxy',1);

//設定一組加密金鑰
app.use(cookieSession({keys:['apple']}));

//GET方法的連線要求
app.get('/',function(req,res){
  var n = req.session.count || 0;

  req.session.count = ++n;

  res.send('Count:' + req.session.count);
});

app.listen(3000);
