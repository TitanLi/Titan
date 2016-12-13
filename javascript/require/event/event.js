var events = require('events');
var eventEmitter = new events.EventEmitter();

//監聽someEvent事件
eventEmitter.on('someEvent',function(arg1,arg2){
  console.log('listener1:',arg1,arg2);
});

eventEmitter.on('someEvent',function(arg1,arg2){
  console.log('listener2:',arg1,arg2);
});

//觸發someEvent事件
eventEmitter.emit('someEvent','apple',100);
