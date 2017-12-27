//define buffer size
//new Buffer(size)
//buf.write(string,[offset],[length],[encoding]);
//string:將被填入的資料
//offset:可選參數，預設為0
//length:可選參數，預設為buffer.length
//encoding:可選參數,預設為utf8

var buffer16 = new Buffer(16);
console.log("length :" + buffer16.length);
console.log("buffer16 :"+buffer16);

buffer16.write("This is Buffer",0,"utf8");
console.log("write length :"+buffer16.length);
console.log("write buffer16 :"+buffer16.toString("utf8"));
