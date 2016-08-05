var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('127.0.0.1',27017,{ auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('mydb',mongodbServer);

db.open(function(){
  db.collection('contact',function(err,collection){
    collection.insert({
      name : 'titan',
      apple : 'apple'
    },function(err,data){
      if(data){
        console.log('ok');
      }else{
        console.log('failed');
      }
    });
    collection.find({name : 'titan'},function(err,data){
      if(data){
        console.log('name:'+data.name+',email:'+data.apple);
      }else{
        console.log('cannot found');
      }
    });
  });
});
