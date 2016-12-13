#include "DHT.h"
#include <SPI.h>
#include <PN532_SPI.h>
#include "PN532.h"

int pirPin = 5;
int pirVal = 0;

int airPin = 7;
unsigned long duration;
unsigned long starttime;
unsigned long sampletime_ms = 2000;//sampe 30s&nbsp;;
unsigned long lowpulseoccupancy = 0;
float ratio = 0;
float concentration = 0;
unsigned int concentration1 = 0;

#define DHTPIN A2     // what pin we're connected to
#define DHTTYPE DHT21   // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE);

PN532_SPI pn532spi(SPI, 10);
PN532 nfc(pn532spi);
String mes;

char pirBuf[15];
char airBuf[15];
char humBuf[15];
char tmpBuf[15];
char gasBuf[15];
char rfidBuf[15];
char all[100];

char * senserVal[] = {"","FF","","FF","","FF","","FF",""};

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(airPin, INPUT);
  starttime = millis();//get the current time;
  Serial.begin(9600);
  dht.begin();

//rfid
  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (! versiondata) {
    while (1); // halt
  }
  nfc.setPassiveActivationRetries(0xFF);
  nfc.SAMConfig();
}

void loop() {
  //PIR Motion Senser
  pirVal = digitalRead(pirPin);

  //Dust Sensor
  duration = pulseIn(airPin, LOW);
  lowpulseoccupancy = lowpulseoccupancy+duration;
 
  if ((millis()-starttime) >= sampletime_ms)//if the sampel time = = 30s
  {
    ratio = lowpulseoccupancy/(sampletime_ms*10.0);  // Integer percentage 0=&gt;100
    concentration = 1.1*pow(ratio,3)-3.8*pow(ratio,2)+520*ratio+0.62;
    lowpulseoccupancy = 0;
    starttime = millis();
  }

//Temperature Humidity Sensor
  float hum = dht.readHumidity();
  float tmp = dht.readTemperature();

//Gas Sensor
  float gasVol;
  int gasValue = analogRead(A1);
    gasVol=(float)gasValue/1024;
    delay(100);

//rfid
  boolean success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
  
  if (success) {
    for (uint8_t i=0; i < uidLength; i++) 
    {
      mes = mes + String(uid[i],HEX);
    }
    mes.toCharArray(rfidBuf,15);
    mes = "";
  }
  else
  {
    mes = "null";
    mes.toCharArray(rfidBuf,15);
    mes = "";
  }
  
    sprintf(pirBuf, "%d", pirVal);
    dtostrf(concentration, 4, 2, airBuf);
    dtostrf(hum, 4, 2, humBuf);
    dtostrf(tmp, 4, 2, tmpBuf);
    dtostrf(gasVol, 4, 2, gasBuf);
    strcat(all,pirBuf);
    strcat(all,"FF");
    strcat(all,airBuf);
    strcat(all,"FF");
    strcat(all,humBuf);
    strcat(all,"FF");
    strcat(all,tmpBuf);
    strcat(all,"FF");
    strcat(all,gasBuf);
    strcat(all,"FF");
    strcat(all,rfidBuf);
    Serial.println(all);
//    Serial.println(pirVal);
//    Serial.println(concentration);
//    Serial.println(hum);
//    Serial.println(tmp);
//    Serial.println(gasVol);
//    Serial1.println(all);
    delay(1000);
strcpy(all,"");
}
