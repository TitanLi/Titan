var cheerio = require('cheerio');

//網頁內容
var html = '<ul id=\"fruits\">'+
           '<li class=\"apple\">Apple</li>'+
           '<li class=\"orange\">Orange</li>'+
           '<li class=\"pear\">Pear</li>'+
           '<li id=\"apple\">Apple</li>'+
           '</ul>';

//載入網頁內容
var $ = cheerio.load(html);

//ul物件
console.log($('ul').text());
//ul標籤裡的li標籤物件
console.log($('ul li').text());
//class為apple的物件
console.log($('.apple').text());
//li標籤，且class為apple的物件
console.log($('li.apple').text());
//id為apple的物件
console.log($('#apple').text());

//選取所有的li標籤物件，並一一處理
$('li').each(function(index,el){
  var item = $(el).text();
  console.log(item);
});
