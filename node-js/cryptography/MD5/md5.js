var crypto = require('crypto');

var md5 = crypto.createHash('md5');

//輸入產生摘要所需的原始資料
md5.update('appledgdskldgjsmksma');

//預設使用二進制(binary)編碼方式
var md5binary = md5.digest();

console.log("This result is :" + md5binary);

md5 = crypto.createHash('md5');

//選擇十六進制（hex)編碼方式
var md5hex = md5.digest('hex');

console.log("This result is :" + md5hex);
