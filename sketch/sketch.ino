
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  lcd.print("Git snap started");
  if(Serial) {
     Serial.println("[READY]");
  }
}

// the loop function runs over and over again forever
void loop() {
  if(Serial.available()) {
    Serial.println("[INFO] Message recieved");
    lcd.clear();
    String message = Serial.readStringUntil('\n');
    lcd.print(message);
    delay(3000);
  }
}
