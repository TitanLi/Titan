//judgment buffer byteLength
//一個位元組佔用8bit(1byte=8bit),而一個字元可能是一個單個位元字組，也可能是雙位元字組
//Buffer.byteLength()方法在寫http回應時經常用到，如果想改寫http回應頭Cotent-Length時，一定要用Buffer.byteLength()，而不要使用String.prototype.length屬性
//Buffer.byteLength(string,[encoding])

var str = '\u00bd+\u00bc=\u00be';

console.log(str+":"+str.length+"characters,"+Buffer.byteLength(str,"utf8")+"bytes");
