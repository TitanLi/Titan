var infoBox;
var textBox;
var startStopButton;
var final_transcript = '';
var recognizing = false; // 是否辨識中
//引入JSON或javascript
//https://gist.github.com/thiagodebastos/08ea551b97892d585f17
// var config = JSON.parse(data);
// var socket = io.connect(config.socket_ip);
var socket = io.connect(data.socket_ip);
socket.on('news', function (data) {
    var audio = document.getElementById('myAudio');
    audio.src = data.url;
    audio.play();
});

function startButton(event) {
  infoBox = document.getElementById("infoBox");
  textBox = document.getElementById("textBox");
  startStopButton = document.getElementById("startStopButton");
  langCombo = document.getElementById("langCombo");
  if (recognizing) { // 如果正在辨識，則停止。
    recognition.stop();
  } else { // 否則就開始辨識
    textBox.value = '';
    final_transcript = '';
    recognition.lang = langCombo.value; // 設定辨識語言
    recognition.start(); // 開始辨識
  }
}

if (!('webkitSpeechRecognition' in window)) {  // 如果找不到 window.webkitSpeechRecognition 這個屬性
  // 就是不支援語音辨識，要求使用者更新瀏覽器。
  infoBox.innerText = "本瀏覽器不支援語音辨識，請更換瀏覽器！(Chrome 25 版以上才支援語音辨識)";
} else {
  var recognition = new webkitSpeechRecognition(); // 建立語音辨識物件 webkitSpeechRecognition
  recognition.continuous = true; // 設定連續辨識模式
  recognition.interimResults = true; // 設定輸出中先結果。

  recognition.onstart = function() { // 開始辨識
    recognizing = true;
    startStopButton.style.backgroundColor = "rgba(255,0,0,0.9)"; //辨識完成更改透明度
    infoBox.innerText = "辨識中...";
  };

  recognition.onend = function() { // 辨識完成
    recognizing = false;
    startStopButton.style.backgroundColor = "rgba(255,0,0,0.1)"; //辨識完成更改透明度
    infoBox.innerText = "";
  };

  recognition.onresult = function(event) { // 辨識有任何結果時
    var interim_transcript = ''; // 中間結果
    final_transcript = ''; //清除結果
    for (var i = event.resultIndex; i < event.results.length; ++i) { // 對於每一個辨識結果
      if (event.results[i].isFinal) { // 如果是最終結果
        final_transcript = event.results[i][0].transcript; // 將其加入最終結果中
        socket.emit('message', final_transcript , function (data) {
          console.log(data);
        });
      } else { // 否則
        interim_transcript += event.results[i][0].transcript; // 將其加入中間結果中
      }
    }
    if ((final_transcript.trim().length > 0)){ // 如果有最終辨識文字
        textBox.value = final_transcript; // 顯示最終辨識文字
      }
    if (interim_transcript.trim().length > 0) // 如果有中間辨識文字
        textBox.value = interim_transcript; // 顯示中間辨識文字
  };
}
