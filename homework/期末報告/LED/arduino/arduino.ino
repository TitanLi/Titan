#include <IRremote.h>
int RECV_PIN = 9;
IRrecv irrecv(RECV_PIN);
decode_results results;

const byte analogInPin = A0;
const byte but1 = 7;
const byte but2 = 6;
const byte red = 9;
const byte led1 = 10;
const byte led2 = 11;
const byte led3 = 12;
const byte led4 = 13;
char a ;
String LED;
int sensorValue = 0;
int outputValue = 0;
int val1,val2;
String val3;
boolean but1Con=true,but2Con=true,but3Con=true;
void setup() {
  pinMode(10,OUTPUT); 
  pinMode(11,OUTPUT);
  pinMode(12,OUTPUT);
  pinMode(13,OUTPUT);
  
  pinMode(6,INPUT); 
  pinMode(7,INPUT);
  pinMode(9,INPUT);
  Serial.begin(9600);
  Serial.println("LED1#0#");
  Serial.println("LED2#0#");
  Serial.println("LED3#0#");
  Serial.println("LED4#0#");
  irrecv.enableIRIn();
}

void loop() {
  if(Serial.available()){
    a = Serial.read();
    if(a == '\r'){
      Serial.println(LED);
    }else{
      LED += a;
    }
    
    if(LED=="1#0"){
      digitalWrite(10, LOW);
      LED = "";
    }
    if(LED=="1#1"){
      digitalWrite(10, HIGH);
      LED = "";
    }
    if(LED=="2#0"){
      digitalWrite(11, LOW);
      LED = "";
    }
    if(LED=="2#1"){
      digitalWrite(11, HIGH);
      LED = "";
    }
    if(LED=="3#0"){
      digitalWrite(12, LOW);
      LED = "";
    }
    if(LED=="3#1"){
      digitalWrite(12, HIGH);
      LED = "";
    }
    if(LED=="4#0"){
      digitalWrite(13, LOW);
      LED = "";
    }
    if(LED=="4#1"){
      digitalWrite(13, HIGH);
      LED = "";
    }
  }
  else{
    if(val1 != digitalRead(but1)){
      if(but1Con){
        digitalWrite(led1 , HIGH);
        but1Con = !but1Con;
        Serial.println("LED1#1#");
      }else{
        digitalWrite(led1 , LOW);
        but1Con = !but1Con;
        Serial.println("LED1#0#");
      }
      delay(300);
      val1 = digitalRead(but1);
    }
   if(val2 != digitalRead(but2)){
      if(but2Con){
        digitalWrite(led2 , HIGH);
        but2Con = !but2Con;
        Serial.println("LED2#1#");
      }else{
        digitalWrite(led2 , LOW);
        but2Con = !but2Con;
        Serial.println("LED2#0#");
      }
      delay(300);
      val2 = digitalRead(but2);
    }
    if(outputValue != map(analogRead(analogInPin), 0, 1023, 0, 255)){
      sensorValue = analogRead(analogInPin);
      outputValue = map(sensorValue, 0, 1023, 0, 255);
      if(outputValue < 100){
        digitalWrite(led3 , HIGH);
        Serial.println("LED3#1#"+String(sensorValue)+"#");
      }else{
        digitalWrite(led3 , LOW);
        Serial.println("LED3#0#"+String(sensorValue)+"#");
      }
      delay(300);
      Serial.println(outputValue);
    }
    if (irrecv.decode(&results)) {
      val3 = String(results.value);
      if(val3 == "16580863"){
        if(but3Con){
          digitalWrite(led4 , HIGH);
          Serial.println("LED4#1");
          but3Con = !but3Con;
        }else{
          digitalWrite(led4 , LOW);
          Serial.println("LED4#0");
          but3Con = !but3Con;
        } 
      }
      irrecv.resume(); // Receive the next value
    }
    delay(100);
  }
 }
