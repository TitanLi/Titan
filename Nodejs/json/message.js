//檢查是收到換行字元「\n」,代表命令接收完成
if(data.toString().indexOf('\n')!=-1){
  //沒接收到換行字元,代表命令還沒全部傳送完成
  return;
}
