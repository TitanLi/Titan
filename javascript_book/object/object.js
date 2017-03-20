var primes = [1,2,3,4];

console.log(primes[0]); //結果1
console.log(primes.length); //結果4

primes[4] = 56789;  //新增元素



var points = [      //一個雙元素陣列
  {x : 0 , y : 0},  //每個元素都是個物件
  {x : 1 , y : 1}
];

console.log(points.x);    //結果undefined
console.log(points[0].x); //結果0



var data = {              //一個雙特性的物件
  trial1 : [[1,2],[3,4]], //每個特性的值都是陣列
  trial2 : [[2,3],[4,5]]  //陣列中的元素也是陣列
};
console.log(data.trial1[0][0]);
