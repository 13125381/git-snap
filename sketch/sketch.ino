
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
int soundSensor = A0;
int snap = 0;
int sensorValue = 0;
int threshold = 720;
bool isComitting = false;

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  lcd.print("Git snap started");
  if(Serial) {
     Serial.println("[READY]");
  }
}

void detectSnap() {
  sensorValue = analogRead(soundSensor);
  if(sensorValue > threshold && !isComitting) {
    Serial.println("[COMMITPUSH]");
    isComitting = true;
    delay(1000);
  }
}

void loop() {
   detectSnap();
  
  if(Serial.available()) {
    lcd.clear();
    String message = Serial.readStringUntil('\n');
    if (message == "[SUCCESS]") {
      lcd.print("Done");
      isComitting = false;
      delay(3000);
      lcd.clear();
      lcd.print("Waiting for snap");
    }else if (message == "[INPROGRESS]") {
      lcd.clear();
      lcd.print("Comitting...");
      delay(3000);
    } 
    else {
      lcd.print(message);
      delay(3000);
    }
  }
}
