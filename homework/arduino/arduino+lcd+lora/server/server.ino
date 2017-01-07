#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11);
int count = 0;
//const int buttonPin = 2;
String apple; 
char a ;
void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);
  mySerial.println("Hello, world1?");
}

void loop() {
  if (mySerial.available()) {
    a = mySerial.read();
    if(a == '\r'){
      Serial.println(apple);
      apple = "";
    }else{
      if(a!='\n'){
       apple += a; 
      }
    }
  }
}

