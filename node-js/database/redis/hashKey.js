var redis = require("redis"),
    client = redis.createClient();

client.on("error",function(err){
  console.log("Error"+err);
});

// HSET (hashKey, field, val, callback(err, reply))
client.hset("apple1","hashtest 1","hello1",redis.print);
client.hset(["apple1","hashtest 6","hello2"],redis.print);
client.hset("apple1","hashtest 1","hello1",(err,reply) => {
  console.log(reply);   //新增reply為1，覆蓋reply為0
});

//HMSET (hashKey, obj, (callback))
client.hmset("apple1",{
    "apple1" : 1,
    "apple2" : 2,
    "apple3" : 3,
    "apple4" : 4
});
client.hmset("apple1","apple1",1,"apple2",2,"apple3",3,"apple4",4);

//取得object所有key
client.hkeys("apple1",function(err,replies){
  console.log(replies.length+"replies");
  replies.forEach(function(reply,i){
    console.log("\t"+i+":"+reply);
  });
});

//HGETALL (hashKey, callback)
client.hgetall("apple1", function (err, obj) {
    console.dir(obj);
});

//Deletes all the keys of the currently selected DB
// client.hdel("apple1","hashtest 1",redis.print);
// client.hdel("apple1","hashtest 6",redis.print);
// client.hdel("apple1","apple1",redis.print);
// client.hdel("apple1","apple2",redis.print);
// client.hdel("apple1","apple3",redis.print);
// client.hdel("apple1","apple4",redis.print);
client.flushdb( function (err, didSucceed) {
        console.log(didSucceed); // OK
    });

client.quit();
