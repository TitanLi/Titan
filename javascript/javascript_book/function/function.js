//定義建構函式
function Point(x,y){      //基於慣例，建構式的開頭大寫
  this.x = x;
  this.y = y;
}

//建構函式與關鍵字new並用來創建實體
var p = new Point();

//定義方法給Point物件
Point.prototype.r = function(){
  return Math.sprt(this.x * this.x + this.y * this.y);
};

//Point物件p繼承了方法r()
p.r();
