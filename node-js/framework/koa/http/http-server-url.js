var http = require('http');
// var url = require('url');

var server = http.createServer(function(req, res) {
  // console.log(req.url);
  // var urlObj = url.parse(req.url);
  // console.log(urlObj);
});

server.listen(3000, function() {
  console.log('Ready');
});
