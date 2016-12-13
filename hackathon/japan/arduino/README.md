#Download
[arduino 1.6.8](https://www.arduino.cc/en/Main/OldSoftwareReleases)

[Grove_Temperature_And_Humidity_Sensor Library](https://github.com/Seeed-Studio/Grove_Temperature_And_Humidity_Sensor)

**1.安裝Arduino 1.6.8 IDE**

**2.解加縮** Grove_Temperature_And_Humidity_Sensor-master.zip

**3.重新命名**  Grove_Temperature_And_Humidity_Sensor

**4.移至本機端**    /Home/Arduino/libraries

#感測器
```
- Loudness Sensor
- Dust Sensor
- Temperature Humidity Sensor
- Gas Sensor
```
#資料通訊
```
- LoRa - Serialport Baudrate(9600)
- LoRa db
  d = 10^((abs(RSSI) - A) / (10 * n))
  d    - 計算所得距離
  RSSI - 接收訊號強度(負值)
  A    - 發射端與接受端距離1m時的訊號強度
  n    - 環境衰減因子
```
