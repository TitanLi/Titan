var request = require('request');

//受歡迎指數
request('http://10.28.120.17:3000/popular', function (error, response, body) {
  console.log('body', body);
});

//裝置狀態
var data = {
  userID:"59a79fb29408c9309d7e22cd"
}
request.post('http://10.28.120.17:3000/sensor/status', {form:data},function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error(err);
  }
  console.log('body', body);
});
