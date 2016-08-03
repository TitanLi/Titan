var cmd = {
  command : 'ls',
  arg : ['-1']
};

console.log(JSON.stringify(cmd));
var jsonStr = JSON.stringify(cmd);

//將JSON字串內容轉成實體物件
var json = JSON.parse(jsonStr);
console.log(json);
