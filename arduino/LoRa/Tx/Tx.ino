#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11);
int count = 0;
//const int buttonPin = 2;
String apple; 
char a ;
void setup() {
  pinMode(2,INPUT);
  pinMode(3,INPUT);
  Serial.begin(9600);
  mySerial.begin(9600);
  mySerial.println("Hello, world1?");
}

void loop() {
  if(digitalRead(2) == 1){
    mySerial.println("#RR#");
  }else if(digitalRead(3) == 1){
    mySerial.println("#LL#");
  }else{
    mySerial.println("#FF#");
  }
}

