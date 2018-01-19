# web speech API

環境：node --version v8.2.1

工具：[Chrome 25 版以上](https://www.google.com.tw/chrome/browser/desktop/index.html)、[工研院文字轉語音web服務](http://tts.itri.org.tw/index.php)、[歐拉蜜OLAMI](https://tw.olami.ai/wiki/?mp=sdk&content=sdk/nodejs/reference.html)

架構圖：
![web-speech-api.png](https://github.com/TitanLi/Titan/tree/master/node-js/framework/koa2/example/web_speech_API/public/img/web-speech-api.png)

先前作業：

1. 工研院文字轉語音web服務帳號註冊
2. 歐拉蜜OLAMI帳號註冊、自然語言語意互動管理系統開啟服務、建立新應用、查看Key取得所需資訊
3. git clone檔案
4. 複製/config/config.json.bak =&gt; /config/config.json
5. 更改/config/config.json（account、password、App Key、App Secret）
6. 更改/config/config.js（socket\_ip為server ip）
7. 切換目錄至./web\__speech_\_API/
8. 執行npm install安裝套件

開始執行：

```
$ npm app.js
```

web：[http://127.0.0.1:3000/](http://127.0.0.1:3000/)
