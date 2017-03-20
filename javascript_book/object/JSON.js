var book = {
  topic : "Javascript",
  fat : true
};

console.log(book.topic);  //結果javascript
console.log(book["fat"]); //結果true

book.author = "Flanagan"; //創建一個新特性
book.contents = {};       //{}是個沒有特性得空物件
