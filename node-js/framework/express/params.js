var express = require('express');
var app = express();

app.get('/:name/:message',function(req,res){
  res.send(req.params.name + ': ' + req.params.message);
});

app.listen(3000);
