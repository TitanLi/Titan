var express = require('express');
var app = express();
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var cmd=require('node-cmd');

console.log("請輸入：127.0.0.1:8888/?R= & G= & B=");

var R=0,G=0,B=0;
var rgbSet = new Array();
var rgbAns = new Array();
var count = 0;
var a=0;
var jsonCmd=""
var average=0;
var averR=0,averG=1,averB=2;
var allR=0,allG=0,allB=0;

var admin=0;
var control=0;

var Data="255,255,255";


app.use(express.static(__dirname));

app.get('/',function(req,res){
  // cmd.run('google-chrome file:///home/user/Titan/competition/Yunlin/apple/color.html');
  //       res.end();
  // res.sendFile('color.html');
  res.sendFile(path.join(__dirname+'/advanced.html'));
  var arg = url.parse(req.url).query;  //方法一arg => aa=001&bb=002
  var arg = url.parse(req.url, true).query;  //方法二arg => { aa: '001', bb: '002' }

  if(a==0 && arg.R!=null){
     R=parseInt(arg.R, 16);
     rgbSet[count]=R;
     count++;
     G=parseInt(arg.G, 16);
     rgbSet[count]=G;
     count++;
     B=parseInt(arg.B, 16);
     rgbSet[count]=B;
     count++;

     for(var i=0 ; i<count ; i++){
       console.log(rgbSet[i]);
     }

     average++;
     if(average==10){
       averR=0;
       averG=1;
       averB=2;
       allR=0;
       allG=0;
       allB=0;
       count=0;
       for(var i=0 ; i<10 ; i++){
         if(rgbSet[averR]!=undefined&&rgbSet[averG]!=undefined&&rgbSet[averB]!=undefined){
         allR=allR+parseInt(rgbSet[averR]);
         allG=allG+parseInt(rgbSet[averG]);
         allB=allB+parseInt(rgbSet[averB]);
         averR=averR+3;
         averG=averG+3;
         averB=averB+3;
         console.log(allR);
         console.log(allG);
         console.log(allB);
         }
       }
       rgbAns[0]=Math.round(allR/10);
       rgbAns[1]=Math.round(allG/10);
       rgbAns[2]=Math.round(allB/10);
       average=0;

       Data=rgbAns[0]+","+rgbAns[1]+","+rgbAns[2];

       fs.writeFile('./Data.txt',Data,function(err){

       });
     }
     console.log("--------------------------------");
  a=0;
  }
  else if(a==1 && arg.R!=null){
    a=0;
  }

 // res.end(JSON.stringify(rgbSet)+'\n'+JSON.stringify(rgbAns));

});

app.get('/Data',function(req,res){
  res.send(Data);
  res.end();
})

app.listen(8888);
