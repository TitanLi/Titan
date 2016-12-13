
void setup ()
{
  Serial.begin (9600);
  pinMode(A0, INPUT);
}
void loop ()
{
    int raw_hr = analogRead(A0)/8-3;
    Serial.println(raw_hr);
    delay(1000);
}
