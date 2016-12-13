const byte item1_1 = 2;
const byte item1_2 = 3;
const byte item1_3 = 4;
const byte item1_4 = 5;
const byte item2_1 = 6;
const byte item2_2 = 7;
const byte item2_3 = 8;
const byte item2_4 = 9;
const byte item3_1 = 10;
const byte item3_2 = 11;
const byte item3_3 = 12;
const byte item3_4 = 13;

char a;
String data;
String apple = "";
void setup() {
  // put your setup code here, to run once:
  pinMode(2,OUTPUT);
  pinMode(3,OUTPUT);
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(6,OUTPUT);
  pinMode(7,OUTPUT);
  pinMode(8,OUTPUT);
  pinMode(9,OUTPUT);
  pinMode(10,OUTPUT);
  pinMode(11,OUTPUT);
  pinMode(12,OUTPUT);
  pinMode(13,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    a = Serial.read();
    if(a == '\r'){
      if(apple == "1#0"){
             digitalWrite(2,LOW);
             digitalWrite(3,LOW);
             digitalWrite(4,LOW);
             digitalWrite(5,LOW);
      }
      else if(apple == "1#1"){
             digitalWrite(2,HIGH);
             digitalWrite(3,LOW);
             digitalWrite(4,LOW);
             digitalWrite(5,LOW);
      }
      else if(apple == "1#2"){
             digitalWrite(2,LOW);
             digitalWrite(3,HIGH);
             digitalWrite(4,LOW);
             digitalWrite(5,LOW);
      }
      else if(apple == "1#3"){
             digitalWrite(2,HIGH);
             digitalWrite(3,HIGH);
             digitalWrite(4,LOW);
             digitalWrite(5,LOW);
      }
      else if(apple == "1#4"){
             digitalWrite(2,LOW);
             digitalWrite(3,LOW);
             digitalWrite(4,HIGH);
             digitalWrite(5,LOW);
      }
      else if(apple == "1#5"){
             digitalWrite(2,HIGH);
             digitalWrite(3,LOW);
             digitalWrite(4,HIGH);
             digitalWrite(5,LOW);
      }
      else if(apple == "1#6"){
             digitalWrite(2,LOW);
             digitalWrite(3,HIGH);
             digitalWrite(4,HIGH);
             digitalWrite(5,LOW);
      }
      else if(apple == "1#7"){
             digitalWrite(2,HIGH);
             digitalWrite(3,HIGH);
             digitalWrite(4,HIGH);
             digitalWrite(5,LOW);
      }
      else if(apple == "1#8"){
             digitalWrite(2,LOW);
             digitalWrite(3,LOW);
             digitalWrite(4,LOW);
             digitalWrite(5,HIGH);
       }
       else if(apple == "1#9"){
             digitalWrite(2,HIGH);
             digitalWrite(3,LOW);
             digitalWrite(4,LOW);
             digitalWrite(5,HIGH);
       }
       else if(apple == "1#F"){
             digitalWrite(2,LOW);
             digitalWrite(3,LOW);
             digitalWrite(4,HIGH);
             digitalWrite(5,HIGH);
       }

      if(apple == "2#0"){
             digitalWrite(6,LOW);
             digitalWrite(7,LOW);
             digitalWrite(8,LOW);
             digitalWrite(9,LOW);
      }
      else if(apple == "2#1"){
             digitalWrite(6,HIGH);
             digitalWrite(7,LOW);
             digitalWrite(8,LOW);
             digitalWrite(9,LOW);
      }
      else if(apple == "2#2"){
             digitalWrite(6,LOW);
             digitalWrite(7,HIGH);
             digitalWrite(8,LOW);
             digitalWrite(9,LOW);
      }
      else if(apple == "2#3"){
             digitalWrite(6,HIGH);
             digitalWrite(7,HIGH);
             digitalWrite(8,LOW);
             digitalWrite(9,LOW);
      }
      else if(apple == "2#4"){
             digitalWrite(6,LOW);
             digitalWrite(7,LOW);
             digitalWrite(8,HIGH);
             digitalWrite(9,LOW);
      }
      else if(apple == "2#5"){
             digitalWrite(6,HIGH);
             digitalWrite(7,LOW);
             digitalWrite(8,HIGH);
             digitalWrite(9,LOW);
      }
      else if(apple == "2#6"){
             digitalWrite(6,LOW);
             digitalWrite(7,HIGH);
             digitalWrite(8,HIGH);
             digitalWrite(9,LOW);
      }
      else if(apple == "2#7"){
             digitalWrite(6,HIGH);
             digitalWrite(7,HIGH);
             digitalWrite(8,HIGH);
             digitalWrite(9,LOW);
      }
      else if(apple == "2#8"){
             digitalWrite(6,LOW);
             digitalWrite(7,LOW);
             digitalWrite(8,LOW);
             digitalWrite(9,HIGH);
       }
       else if(apple == "2#9"){
             digitalWrite(6,HIGH);
             digitalWrite(7,LOW);
             digitalWrite(8,LOW);
             digitalWrite(9,HIGH);
       }
       else if(apple == "2#F"){
             digitalWrite(6,LOW);
             digitalWrite(7,LOW);
             digitalWrite(8,HIGH);
             digitalWrite(9,HIGH);
       }

       if(apple == "3#0"){
             digitalWrite(10,LOW);
             digitalWrite(11,LOW);
             digitalWrite(12,LOW);
             digitalWrite(13,LOW);
      }
      else if(apple == "3#1"){
             digitalWrite(10,HIGH);
             digitalWrite(11,LOW);
             digitalWrite(12,LOW);
             digitalWrite(13,LOW);
      }
      else if(apple == "3#2"){
             digitalWrite(10,LOW);
             digitalWrite(11,HIGH);
             digitalWrite(12,LOW);
             digitalWrite(13,LOW);
      }
      else if(apple == "3#3"){
             digitalWrite(10,HIGH);
             digitalWrite(11,HIGH);
             digitalWrite(12,LOW);
             digitalWrite(13,LOW);
      }
      else if(apple == "3#4"){
             digitalWrite(10,LOW);
             digitalWrite(11,LOW);
             digitalWrite(12,HIGH);
             digitalWrite(13,LOW);
      }
      else if(apple == "3#5"){
             digitalWrite(10,HIGH);
             digitalWrite(11,LOW);
             digitalWrite(12,HIGH);
             digitalWrite(13,LOW);
      }
      else if(apple == "3#6"){
             digitalWrite(10,LOW);
             digitalWrite(11,HIGH);
             digitalWrite(12,HIGH);
             digitalWrite(13,LOW);
      }
      else if(apple == "3#7"){
             digitalWrite(10,HIGH);
             digitalWrite(11,HIGH);
             digitalWrite(12,HIGH);
             digitalWrite(13,LOW);
      }
      else if(apple == "3#8"){
             digitalWrite(10,LOW);
             digitalWrite(11,LOW);
             digitalWrite(12,LOW);
             digitalWrite(13,HIGH);
       }
       else if(apple == "3#9"){
             digitalWrite(10,HIGH);
             digitalWrite(11,LOW);
             digitalWrite(12,LOW);
             digitalWrite(13,HIGH);
       }
       else if(apple == "3#F"){
             digitalWrite(10,LOW);
             digitalWrite(11,LOW);
             digitalWrite(12,HIGH);
             digitalWrite(13,HIGH);
       }
      Serial.println(apple);
      apple = "";
    }else{
      apple += a;
    }
  }
}
