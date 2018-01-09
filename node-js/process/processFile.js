//讀取檔案當前目錄
console.info('讀取檔案當前目錄：');
console.info(process.cwd());
console.info();

//改變目錄路徑
console.info('改變目錄路徑：');
process.chdir('/home/titan');
console.info(process.cwd());
console.info();

//現在處理程序id
console.info('現在處理程序id：');
console.info(process.pid);
console.info();

//現在處理程序名稱
console.info('現在處理程序名稱：');
console.info(process.title);
console.info();

//Node.js version
console.info('Node.js version：');
console.info(process.version);
console.info();

//Node.js版本屬性
console.info('Node.js版本屬性：');
console.info(process.versions);
console.info();

//Node.js設定選項
console.info('Node.js設定選項：');
console.info(process.config);
console.info();

//執行現在處理程序可執行檔的絕對路徑
console.info('執行現在處理程序可執行檔的絕對路徑：');
console.info(process.execPath);
console.info();

//現在處理程序的命令列參數陣列
console.info('現在處理程序的命令列參數陣列：');
console.info(process.argv);
console.info();
