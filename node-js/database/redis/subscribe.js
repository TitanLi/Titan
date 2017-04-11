var redis = require('redis');
var sub = redis.createClient();
var pub = redis.createClient();

sub.subscribe("apple");

sub.on("message",function(channel,message){
  console.log("收到來自"+channel+"頻道的訊息："+message);
});

//在sub成功訂閱後執行
sub.on("subscribe",function(channel,message){
  pub.publish("apple","hello");
});
