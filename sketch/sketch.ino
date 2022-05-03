
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  lcd.print("Git snap started");
  if(Serial) {
     Serial.println("0");
  }
}

// the loop function runs over and over again forever
void loop() {
  if(Serial.available()) {
    Serial.println("Message recieved");
    lcd.clear();
    String message = Serial.readStringUntil('\n');
    lcd.print(message);
    delay(3000);
  }
  
  /*if (message.length() > 0) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Status:");
    lcd.setCursor(0, 1);
    lcd.print(message);
    Serial.write("0 Received message");
  }*/
  
  
 
 /* Serial.write("Light on\n");
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(3000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  Serial.write("Light off\n");
  delay(1000);                       // wait for a second
*/
}
