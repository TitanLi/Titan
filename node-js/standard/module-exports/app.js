var Data = require('./lib/introduction.js');
var array = require('./lib/array.js');
var method = require('./lib/method.js');
var object = require('./lib/object.js');

//產生物件
var data = new Data('Titan',20);
data.about();
console.log(data.ans());

//使用Array
console.log(array[5]);

//使用method
method.name();

//使用multi-method
object.name();
object.age();
object.believe();
