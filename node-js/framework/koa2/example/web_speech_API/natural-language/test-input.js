var NLUApiSample = require('./../lib/olami-api/NluApiSample.js');

module.exports = function(url,appKey,appSecret,inputText){
  this.url = url;
  this.appKey = appKey;
  this.appSecret = appSecret;
  this.inputText = inputText;

  this.naturalLanguage = async () => {
    var nluApi = new NLUApiSample();
    await nluApi.setLocalization(this.url);
    await nluApi.setAuthorization(this.appKey,this.appSecret);
    return await nluApi.getRecognitionResult("nli",this.inputText);
  }
}
