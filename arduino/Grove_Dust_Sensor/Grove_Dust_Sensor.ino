int pin = 7;
unsigned long duration;
unsigned long starttime;
unsigned long sampletime_ms = 2000;//sampe 30s&nbsp;;
unsigned long lowpulseoccupancy = 0;
float ratio = 0;
float concentration = 0;
 
void setup() {
  Serial.begin(9600);
  pinMode(7,INPUT);
  starttime = millis();//get the current time;
}
 
void loop() {
  duration = pulseIn(pin, LOW);
  lowpulseoccupancy = lowpulseoccupancy+duration;
 
  if ((millis()-starttime) >= sampletime_ms)//if the sampel time = = 30s
  {
    ratio = lowpulseoccupancy/(sampletime_ms*10.0);  // Integer percentage 0=&gt;100
    concentration = 1.1*pow(ratio,3)-3.8*pow(ratio,2)+520*ratio+0.62; // using spec sheet curve
//    Serial.print("concentration = ");
    Serial.println(concentration);
//    Serial.println(" pcs/0.01cf");
//    Serial.println("\n");
    lowpulseoccupancy = 0;
    starttime = millis();
  }
}
