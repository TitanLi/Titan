//官網
//http://tts.itri.org.tw/index.php
const TTSClient = require('itri-tts');
const account = require('./config.json');

var tts = new TTSClient(account.accountID, account.password);

var text = '您好，我是Bruce，感謝您使用工研院文字轉語音Web服務。'

// tts.ConvertSimple(text, function (err, result) {
//   if (err) throw err
//   console.log(result)  // { resultCode: '0',
//                        //   resultString: 'success',
//                        //   resultConvertID: CONVERT_ID }
// })

tts.GetConvertStatus(4914813, function (err, result) {
  if (err) throw err
  console.log(result)  // { resultCode: '0',
                       //   resultString: 'success',
                       //   statusCode: '2',
                       //   status: 'completed',
                       //   resultUrl: AUDIO_ADDRESS }
})
