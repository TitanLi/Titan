var a = [];

a.push(1,2,3);            //push()方法新增一個元素至陣列
console.log(a);

a.reverse();              //反轉(reverse)元素順序
console.log(a);

a.dist = function(){
  var p1 = this[0];
  var p2 = this[1];
  return p1*p2;
}
console.log(a.dist());
