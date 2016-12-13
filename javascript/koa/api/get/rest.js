var Client = require('node-rest-client').Client;

var client = new Client();

// direct way
client.get("http://www.google.com", function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(response);
});

// registering remote methods
client.registerMethod("jsonMethod", "http://www.google.com", "GET");

client.methods.jsonMethod(function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(response);
});
