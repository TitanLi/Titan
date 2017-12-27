//judgment buffer obj

var buffer = new Buffer('nodejs','utf8');

if(Buffer.isBuffer(buffer)){
  console.log("The 'buffer' is a Buffer obj");
}else{
  console.log("The 'buffer' is not a Buffer obj");
}

var str = "asd";

if(Buffer.isBuffer(str)){
  console.log("The 'str' is a Buffer obj");
}else{
  console.log("The 'str' is not a Buffer obj");
}
