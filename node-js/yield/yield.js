function * fun1(){
  yield 'apple1';
  yield 'apple2';
}

function * main(){
  //yield* 後面可以帶一個 Generator
  yield * fun1();
  yield 'apple3';
}

var fun = main();

console.log(fun.next());
console.log(fun.next());
console.log(fun.next());
