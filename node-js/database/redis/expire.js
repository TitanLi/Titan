var redis = require('redis'),
    client = redis.createClient();

client.on('error',function(err){
  console.log('Error:'+err);
});

client.on('connect',runSample);

function runSample(){
  client.set('key','value',redis.print);
  client.expire('key',6);

  var myTimer = setInterval(function(){
    client.get('key',function(err,reply){
      if(reply){
        console.log(reply.toString());
        client.ttl('key',writeTTL);
      }else{
        clearTimeout(myTimer);
        console.log('I expire');
        client.quit();
      }
    });
  },1000);
}

function writeTTL(err,data){
  console.log(data);
}
