
var request = require('request');
var data = {
  userID:""
}
var brandName = new Array();
var num = new Array() ;
request.get('http://127.0.0.1:3000/popular', {form:data},function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error(err);
  }
  //console.log('body', body);
  body = JSON.parse(body);
  for(key in body){
      brandName[key] = body[key]["brand"];
      num[key] = body[key]["count"];
      console.log('brandName >'+ brandName[key]);
      console.log('num > '+ num[key]);
  }
});

