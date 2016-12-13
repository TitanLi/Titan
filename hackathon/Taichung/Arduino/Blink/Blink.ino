int dataNum = random(90,160);
char id[15];
char dataBuf[15];
char all[116];

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  sprintf(id, "%d", 1);
  sprintf(dataBuf, "%d", random(90,160));
  strcat(all,id);
  strcat(all,"FF");
  strcat(all,dataBuf);
  Serial.println(all);
  strcpy(all,"");
  
  digitalWrite(13, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);              // wait for a second
  
  sprintf(id, "%d", 2);
  sprintf(dataBuf, "%d", random(90,160));
  strcat(all,id);
  strcat(all,"FF");
  strcat(all,dataBuf);
  Serial.println(all);
  strcpy(all,"");
  
  digitalWrite(13, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);              // wait for a second
}
