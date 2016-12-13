#include "DHT.h"
#include "TLM926P01A.h"

int sound = 0;

int airPin = 7;
unsigned long duration;
unsigned long starttime;
unsigned long sampletime_ms = 2000;
unsigned long lowpulseoccupancy = 0;
float ratio = 0;
float concentration = 0;
unsigned int concentration1 = 0;

#define DHTPIN A2
#define DHTTYPE DHT21
DHT dht(DHTPIN, DHTTYPE);

LoRaSetting lora_set, lora_read;
boolean write_success = false;

int error = 0;
int d = 0;

char souBuf[15];
char airBuf[15];
char humBuf[15];
char tmpBuf[15];
char gasBuf[15];
char rfidBuf[15];
char dataBuf[15];
char all[116];

char* senserVal[] = {"","FF","","FF","","FF",""};

void setup() {
    pinMode(airPin, INPUT);
    starttime = millis();//get the current time;
    Serial.begin(9600);
    dht.begin();
    tlm_init();
}

void loop() {
  lora_set.LoRaSF = 7;
  lora_set.LoRaPowerdBm =20;
  lora_set.LoRaEnableCCA = 0;
  lora_set.LoRaBandWidthKhz = 125;
  lora_set.LoRaDataRate = 4550;
  lora_set.LoRaWakeupPeriodms = 65;
  lora_set.LoRaUARTBaudRate = 9600;
  lora_set.LoRaFreqKHz = 868100;
  
//Loudness Sensor
    sound = analogRead(A3);
    delay(10);

//Dust Sensor
    duration = pulseIn(airPin, LOW);
    lowpulseoccupancy = lowpulseoccupancy+duration;
 
    if ((millis()-starttime) >= sampletime_ms)
     {
      ratio = lowpulseoccupancy/(sampletime_ms*10.0);
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

//Lora db
      d = 10^((abs(lora_read.LoRaPowerdBm) - 100) / (10 * 6));

      sprintf(souBuf, "%d", sound);
      dtostrf(concentration, 4, 2, airBuf);
      dtostrf(hum, 4, 2, humBuf);
      dtostrf(tmp, 4, 2, tmpBuf);
      dtostrf(gasVol, 4, 2, gasBuf);
      dtostrf(0, 4, 2, gasBuf);
      sprintf(dataBuf, "%d", d);

      strcat(all,"data");
      strcat(all,souBuf);
      strcat(all,"FF");
      strcat(all,airBuf);
      strcat(all,"FF");
      strcat(all,humBuf);
      strcat(all,"FF");
      strcat(all,tmpBuf);
      strcat(all,"FF");
      strcat(all,gasBuf);
      strcat(all,"FF");
      strcat(all,dataBuf);
      strcat(all,"\n");
//      Serial.println(all);

      error = tlm_sent_data( all , 19) ;
      testprint( error );

      delay(3000);
      strcpy(all,"");
}

