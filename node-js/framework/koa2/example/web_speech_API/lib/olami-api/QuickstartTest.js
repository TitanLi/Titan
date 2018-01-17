var args = process.argv;

if (args.length < 6) {
	console.log("\n\n[Error] Missing args! Usage:\n");
	console.log(" - args[0]: api_url");
	console.log(" - args[1]: your_app_key");
	console.log(" - args[2]: your_app_secret");
	console.log(" - args[3]: your_text_input");
	console.log("\n\n");
	process.exit(1);
} else {
	var url = args[2];
	var appKey = args[3];
	var appSecret = args[4];
	var inputText = args[5];

	var nluApi = new NLUApiSample();
	nluApi.setLocalization(url);
	nluApi.setAuthorization(appKey, appSecret);
	// Test API by 'api=seg'
	nluApi.getRecognitionResult("seg", inputText);
	// Test API by 'api=nli'
	nluApi.getRecognitionResult("nli", inputText);
}
