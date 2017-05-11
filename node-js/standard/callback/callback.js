function myCallback(callback){
  setTimeout(function(){
    console.log('myCallback');
    // 方法1
    callback();

    //方法2
    // callback('apple');
  },3000);
}

function apple(data){
  console.log('my name is ' + data);
}

// 方法1
myCallback(function(){
  apple('apple');
});

//方法2
// myCallback(apple);
