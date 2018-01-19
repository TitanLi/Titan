var math = require('mathjs');

//過慮排序
function isPositive (x) {
	return x > 0;
}
console.log(math.filter([6, -1, -2, -3, 6], isPositive));
console.log(math.filter(["6","asd"],/[0-9]/));

//長度排序
function sortByLength(a,b){
	return a.length - b.length;
}
console.log(math.sort(["aaaa","aaa","aa","a"],sortByLength));

//依序執行
math.forEach([1,2,3],
	function(value){
		console.log(value);
	}
);

//格式處理
//precision 指的是精準度
//auto 正常數字顯示
//fixed 整數的數字顯示
//exponential 指數的顯示方式
console.log(math.format(1.23456789,{precision : 6}));
console.log(math.format(123456,{notation:'auto'}));
console.log(math.format(123456,{notation:'fixed'}));
console.log(math.format(123456,{notation:'exponential'}));
