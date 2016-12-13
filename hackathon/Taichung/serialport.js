var SerialPort = require('serialport');

var port = new SerialPort('/dev/ttyUSB0',{
        baudRate : 9600,
        parser: SerialPort.parsers.byteLength(10)
});
function find(s,targe)
{
	if(typeof(s) != typeof("1"))
	{
		return "input error";
	}
	else
	{
		var c = 0;
		while(s.indexOf(targe) >-1)
		{
			console.log("find " + c);
			s = s.slice(s.indexOf, s.length());
			c +=1;
		}
		return c;
	}
}
port.on('open',function(){
  console.log('ok');
  port.on('data',function(data){
    // var num = parseInt(data.slice(9).toString("HEX"),16);

    var mes = data.toString().split("FF");
    var num = parseInt(data.slice(9).toString("HEX"),16);
    console.log(num);
  });
});
