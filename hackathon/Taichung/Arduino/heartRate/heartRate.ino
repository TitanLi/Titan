void setup() {
  pinMode(A5, INPUT);
  Serial.begin(9600);
  Serial.println("Start Loggong...");
}

void loop() {
  int hr = heartRate();
  Serial.println(hr);
  delay(500);
}

int heartRate() {
  int raw_hr = analogRead(A5);
  return raw_hr;
}
