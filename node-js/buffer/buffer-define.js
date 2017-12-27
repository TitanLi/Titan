//node.js buffer 預設編碼 utf8
//buf.toString([encoding],start,end)
//編碼方式：ascii、utf8、utf16le、base64、binary、hex

var buffer16 = new Buffer([0x6e,0x6f,0x64,0x65,0x6a,0x73]);

for(var i=0;i<buffer16.length;i++){
  console.log('buffer16 :'+buffer16[i]);
  console.log('buffer16 toString :'+buffer16[i].toString());
}

console.log("buffer16 to utf8 string :"+buffer16.toString('utf8'));
console.log("buffer16 to hex string :"+buffer16.toString('hex'));

var bufferUTF8 = new Buffer('nodejs','utf8');
for(var i=0;i<bufferUTF8.length;i++){
  console.log("bufferUTF8 :" + bufferUTF8[i]);
  console.log("bufferUTF8 toString :"+bufferUTF8[i].toString());
}

console.log("bufferUTF8 to utf8 string :"+bufferUTF8.toString('utf8'));
console.log("bufferUTF8 to hex string :"+bufferUTF8.toString('hex'));
