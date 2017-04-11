var redis = require('redis');

var client = redis.createClient('6379','127.0.0.1');

//SET (key, value, (callback))
client.set("key","value",redis.print);
client.set("message","hello world",redis.print);
client.set("name","titan",redis.print);
client.set("apple","hello",function(err,reply){});

//GET (key, callback)
client.get("message",redis.print);
client.get("key",redis.print);
client.get("name",redis.print);
client.get("apple",function(err,value){
  if(err){
    console.log(err);
    return;
  }
  console.log(value);
});

//Deletes all the keys of the currently selected DB
// client.del('message');
// client.del('key');
// client.del('name');
// client.del('apple');
client.flushdb( function (err, didSucceed) {
        console.log(didSucceed); // OK
    });

client.quit();
