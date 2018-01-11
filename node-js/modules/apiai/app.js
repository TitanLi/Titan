var apiai = require('apiai');

var app = apiai("013b936f594a4be786840a7006bcec80");

var request = app.textRequest('頂級佛跳牆海景海鮮麵', {
    sessionId: 'newagent-1c68e'
});

request.on('response', function(response) {
  //.metadata.fulfillment.speech
    console.log(response.result.fulfillment.speech);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
