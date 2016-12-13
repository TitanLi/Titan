#Default MQTT Topic
```
/status/api
```

#LoRa Serial to Arduino Data Sheet
```
Serialport BaudRate(9600)
"data"+"FF"+souBuf(聲音)+"FF"+airBuf(空氣品質)+"FF"+humBuf(溼度)+"FF"+tmpBuf(溫度)+"FF"+gasBuf(瓦斯濃度)+"FF"+dataBuf(距離db)+"\n"
```
#Raspberry to MQTT Broker Data Sheet
```
data = {
        "peopleID":"01",
        "data":{
                "sou":xxx,
                "air":xxx,
                "hum":xxx,
                "tmp":xxx,
                "gas":xxx,
                "sdb":xxx,
                "date":'yyyy-mm-dd h:mm:ss'
              }
       }
```
