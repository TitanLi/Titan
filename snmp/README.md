# SNMP（Simple Network Management Protocol）
## 主要功能
TCP/IP通訊協定對設備作管理
## 安裝
1. snmpd:snmp server
2. snmp:snmp client
3. snmp-mids-downloader:用來下載更新localhost mid庫
```
$ sudo apt-get install snmpd snmp snmp-mids-downloader
```

## 指令
* 查看狀態
```
$ sudo service smpd status
```
* 測試服務是否正常
```
$ snmpwalk -v 2c -c public localhost 1.3.6.1.2.1.1.1
iso.3.6.1.2.1.1.1.0 = STRING: "Linux leaf 4.2.0-34-generic #39-Ubuntu SMP Thu Mar 10 22:13:01 UTC 2016 x86_64"
```
* 配置節點（修改/etc/snmp/snmpd.conf）
```
view   systemonly  included   .1.3.6.1.2.1.1
view   systemonly  included   .1.3.6.1.2.1.25.1
下新增
view   systemonly  included   .1
完成後將可獲得更多訊息
```
* 重起snmp
```
$ sudo service snmpd restart
```
* 查看主機交換空間總量
```
$ snmpwalk -v 2c -c public localhost .1.3.6.1.4.1.2021.4.3.0
```
* 顯示單位（修改/etc/snmp/snmp.conf）
```
註解 mibs :
```
* 允許遠方主機訪問（修改/etc/snmp/snmpd.conf）
```
註解 agentAddress  udp:127.0.0.1:161
解開註解 #agentAddress udp:161,udp6:[::1]:161
```
* 查看snmp主機訊息
```
$ sudo netstat -antup | grep 161
```














