#安裝arduino 1.6.8
https://www.arduino.cc/en/Main/OldSoftwareReleases

#Library Download
##Grove_Temperature_And_Humidity_Sensor
https://github.com/Seeed-Studio/Grove_Temperature_And_Humidity_Sensor

#Lora baudRate
9600

#感測器
-Loudness Sensor
-Dust Sensor
-Temperature Humidity Sensor
-Gas Sensor

#資料通訊
-Lora

#Lora訊號強度公式
d = 10^((abs(RSSI) - A) / (10 * n))
d - 計算的距離
RSSI - 接收訊號强度（負值）
A - 發射端與接受端相隔1m的訊號強度
n - 環境衰減因子
