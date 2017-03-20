var http = require('http');

var server = http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('apple');
});

server.listen(3000);
