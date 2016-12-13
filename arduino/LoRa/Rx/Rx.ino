#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11);
int count = 0;
//const int buttonPin = 2;
String apple; 
char a ;
void setup() {
  pinMode(2,OUTPUT);
  pinMode(3,OUTPUT);
  Serial.begin(9600);
  mySerial.begin(9600);
  mySerial.println("Hello, world1?");
}

void loop() {
  if (mySerial.available()) {
    a = mySerial.read();
    if(a == '\r'){
      if(apple == "\n#FF#"){
        digitalWrite(2,LOW);
        digitalWrite(3,LOW);
        Serial.println("LED turn off");
      }else if(apple == "\n#RR#"){
        digitalWrite(2,HIGH);
        digitalWrite(3,LOW);
        Serial.println("LED turn right");
      }else if(apple == "\n#LL#"){
        digitalWrite(2,LOW);
        digitalWrite(3,HIGH);
        Serial.println("LED turn left");
      }
      apple = "";
    }else{
      apple += a;
    }
  }
}

