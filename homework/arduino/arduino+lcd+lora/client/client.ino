#include <IRremote.h>                    // 引用 IRRemote 函式庫
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE);  // 設定 LCD I2C 位址
const int irReceiverPin = 8;             // 紅外線接收器 OUTPUT 訊號接在 pin 2
int name0 = 0;
int food0 = 0;
int peo0 = 0;
int dea0 = 0;
int i = 0;
int j = 0;
#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11);
int count = 0;
//const int buttonPin = 2;
String apple; 
char a ;
IRrecv irrecv(irReceiverPin);            // 定義 IRrecv 物件來接收紅外線訊號
decode_results results;                  // 解碼結果將放在 decode_results 結構的 result 變數裏
void setup()
{
  Serial.begin(9600);                     // 開啟 Serial port, 通訊速率為 9600 bps
  irrecv.enableIRIn();                   // 啟動紅外線解碼
    lcd.begin(16, 2); 
    lcd.clear();
  mySerial.begin(9600);
}

void loop() 
{     
  if (irrecv.decode(&results)) {         // 解碼成功，收到一組紅外線訊號
      i = ans();
     if(ans()==11){
      j++;
      if(j>5)j=0;
      if(j==0){
        Serial.println("------");
        Serial.println("Name:");
        lcd.clear();
        lcd.setCursor(0, 0); 
        lcd.print("Name:");
       }else if(j==1){
        Serial.println("------");
          Serial.println("Food:");
          lcd.clear();
          lcd.setCursor(0, 0); 
        lcd.print("Food:");
       }else if(j==2){
        Serial.println("------");
          Serial.println("People:");
          lcd.clear();
          lcd.setCursor(0, 0); 
        lcd.print("People:");
       }else if(j==3){
        Serial.println("------");
          Serial.println("Dead:");
          lcd.clear();
          lcd.setCursor(0, 0); 
        lcd.print("Dead:");
       }else if (j==4){
        lcd.clear();
          Serial.println("------");
       }
     }
     else if(j==0){
         name0 = name0+ i;
          if(i==13)name0 = 0;
         Serial.print("Name:");
         Serial.println(name0);
           lcd.setCursor(0, 0); 
        lcd.print("Name:");
        lcd.print(name0);
     }
    else if(j==1){
         food0 = food0+ i;
         if(i==13)food0 = 0;
         Serial.print("Food:");
         Serial.println(food0);
           lcd.setCursor(0, 0); 
        lcd.print("Food:");
        lcd.print(food0);
     }
    else if(j==2){
         peo0 = peo0+ i;
         if(i==13)peo0 = 0;
         Serial.print("People:");
         Serial.println(peo0);
           lcd.setCursor(0, 0); 
        lcd.print("People:");
        lcd.print(peo0);
     }
   else  if(j==3){
         dea0 = dea0+ i;
         if(i==13)dea0 = 0;
         Serial.print("Dead:");
         Serial.println(dea0);
           lcd.setCursor(0, 0); 
        lcd.print("Dead:");
        lcd.print(dea0);
     }
   else   if(j==4){
         Serial.println("The transfer was successful");  
         Serial.print("Name:");
         Serial.println(name0);
         Serial.print("Food:");
         Serial.println(food0);
         Serial.print("People:");
         Serial.println(peo0);
         Serial.print("Dead:");
         Serial.println(dea0);
         Serial.println("#"+ (String)name0+"#"+(String)food0 +"#"+(String)peo0+"#"+(String)dea0);
           lcd.setCursor(0, 0); 
        lcd.print("Successful");
           lcd.setCursor(0, 1); 
        lcd.print("#"+ (String)name0+"#"+(String)food0 +"#"+(String)peo0+"#"+(String)dea0);
         for(int ad = 0;ad<100;ad++){
          mySerial.println((String)name0+"#"+(String)food0 +"#"+(String)peo0+"#"+(String)dea0);
       //10delay(100);
          }
             }
    irrecv.resume();
    
  }  
}
int ans(){
         if(results.value == 16593103){
             return 13;
             lcd.clear();
         }else if(results.value == 16582903){
             return 1;
         }else if(results.value == 16615543){
             return 10;
         }else if(results.value == 16599223){
             return 100;
         }else if(results.value == 16591063){
             return 1000;
         }else if(results.value == 16623703){
             return 10000;
         }else if(results.value == 16607383){
             return 100000;
         }else if(results.value == 16586983){
             return 1000000;
         }else if(results.value == 16619623){
             return 10000000;
         }else if(results.value == 16603303){
             return 100000000;
         }else if(results.value == 16609423){
             return 11;
         }else{
              return 0;
           }
  }





