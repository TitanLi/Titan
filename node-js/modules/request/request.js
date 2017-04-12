var request = require('request');

request('http://127.0.0.1:3000', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Print the google web page.
     }
});

request.post({
  url : 'http://127.0.0.1:3000',
  form : {
    key:'value'
  }
},function(error,response,body){
  if(!error && response.statusCode == 200){
    console.log(body);
  }
});
