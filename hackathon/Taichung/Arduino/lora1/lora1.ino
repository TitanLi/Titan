#include <TLM926P01A.h>

#include <SoftwareSerial.h>

int error = 1;
//char data="1FF";
char idData[1];
char hr[2];
char all[9];

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  pinMode(A0, INPUT);
    tlm_init();
}

// the loop routine runs over and over again forever:
void loop() {

   int raw_hr = analogRead(A0)/8-3;
   if(raw_hr < 10){
    raw_hr = 10;
   }else if(raw_hr > 100){
    raw_hr = 99;
   }
   Serial.println(raw_hr);
   
   delay(250);

   sprintf(idData, "%d", 1);
   sprintf(hr, "%d", raw_hr);
   
   strcat(all,"2");
   strcat(all,"FF");
   strcat(all,hr);
   strcat(all,"FF16");
   Serial.println(all);

   strcpy(all,"");
//   error = tlm_sent_data( data, 9) ;
//   
//   testprint( error );
}
