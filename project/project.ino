// setHasItem and setHasWarning need 10 consecutive seconds to toggle theirs flag
// need to download DHT20 library from library manager
#include <SoftwareSerial.h> 
#include <AuthClient.h>
#include <debug.h>
#include <MicroGear.h>
#include <MQTTClient.h>
#include <PubSubClient.h>
#include <SHA1.h>
const int limit_humid = 30;
const byte RX = D7;
const byte TX = D8;
SoftwareSerial mySerial (RX, TX);
long lastUART = 0, lastDHT = 0;
int hasItem = 0, hasWarning = 0;
long itemMillis = 0, warningMillis = 0;
int itemState = 0, warningState = 0; // 0 = empty state , 1 = begin counting  
void Read_Uart();    // UART STM
String stDist = "0000";
int dist = 0;

#include "DHT20.h" // Manage lib -> DHT20

DHT20 DHT(&Wire);

const char* ssid = "Sern";
const char* password = "Sernsea1";
const char* mqtt_server = "broker.netpie.io";
const int mqtt_port = 1883;
const char* mqtt_Client = "bbcf287f-b6e1-442d-8323-1db628d39352";
const char* mqtt_username = "NYMcSAwMK3XWPYT7T6FTNFsv3XBBXwnr";
const char* mqtt_password = "!Ym4C55(N-x!nFyzmPiUX)4!kFN*fWb~";
int count =0;
char msg[100];

WiFiClient espClient;
PubSubClient client(espClient);

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting NETPIE2020 connectionâ€¦");
    if (client.connect(mqtt_Client, mqtt_username, mqtt_password)) {
      Serial.println("NETPIE2020 connected");
    }
    else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("try again in 5 seconds");
      delay(5000);
    }
  }
}


void setup()
{
  Serial.begin(9600);
  mySerial.begin(115200);
  
  Serial.println("Starting...");
  if (WiFi.begin(ssid, password)) {
    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.print(".");
    }
  }
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  client.setServer(mqtt_server, mqtt_port);

  Serial.println("UART Start");

  lastUART = millis();
  lastDHT = millis();

  DHT.begin(D5, D6); // SDA, SCK
  delay(2000);

  Serial.println("Type,\tStatus,\tHumidity (%),\tTemperature (C)");
  
}
void loop()
{
//   READ DATA
  if (millis()-lastDHT > 1000){
    Serial.print("DHT20, \t");
    int status = DHT.read();
    switch (status)
    {
    case DHT20_OK:
      Serial.print("OK,\t");
      break;
    case DHT20_ERROR_CHECKSUM:
      Serial.print("Checksum error,\t");
      break;
    case DHT20_ERROR_CONNECT:
      Serial.print("Connect error,\t");
      break;
    case DHT20_MISSING_BYTES:
      Serial.print("Missing bytes,\t");
      break;
    default:
      Serial.print("Unknown error,\t");
      break;
    }
    Serial.println();
    // DISPLAY DATA, sensor has only one decimal.
//    Serial.print(DHT.getHumidity(), 1); // Get humidity
//    Serial.print(",\t");
//    Serial.println(DHT.getTemperature(), 1); // Get temperature
    lastDHT = millis();
  }
  Read_Uart();
  if (millis() - lastUART > 1000)
  {
    mySerial.print("1ON2ON3OFF4");
    Serial.println("Sent");
    lastUART = millis();
  }
}

void setItemState(){
   if(hasItem == 0){
     if(dist < 100 && itemState == 0){
        itemState = 1;
        itemMillis = millis()+10000;
      }
      else if(dist >= 100 && itemState == 1){
        itemState = 0;
      }
      else if(millis() >= itemMillis && itemState == 1){
        hasItem = !hasItem;
        itemState = 0;
      } 
   }
   else{
      if(dist > 100 && itemState == 0){
        itemState = 1;
        itemMillis = millis()+10000;
      }
      else if(dist <= 100 && itemState == 1){
        itemState = 0;
      }
      else if(millis() >= itemMillis && itemState == 1){
        hasItem = !hasItem;
        itemState = 0;
      }
   }
}

void setWarningState(){
  
  if(hasItem == 0){
    hasWarning =0;
    return ;
  }
  if(hasWarning == 0){
      if((DHT.getHumidity() >= limit_humid || DHT.getTemperature() >= 40) && warningState == 0){
        warningState = 1;
        warningMillis = millis()+10000;
      }
      else if(!(DHT.getHumidity() >= limit_humid || DHT.getTemperature() >= 40) && warningState == 1){
        warningState = 0;
      }
      else if(millis() >= warningMillis && warningState == 1){
        hasWarning = !hasWarning;
        warningState = 0;
      }
  }else {
      if(!(DHT.getHumidity() >= limit_humid || DHT.getTemperature() >= 40) && warningState == 0){
        warningState = 1;
        warningMillis = millis()+10000;
      }
      else if((DHT.getHumidity() >= limit_humid || DHT.getTemperature() >= 40) && warningState == 1){
        warningState = 0;
      }
      else if(millis() >= warningMillis && warningState == 1){
        hasWarning = !hasWarning;
        warningState = 0;
      }
  }
}

void Read_Uart()
{
  String st = "";
  while (mySerial.available())
  {
    char inChar = (char)mySerial.read();
    st +=  inChar;
    if (inChar == 'C')
    {
      Serial.println("Received : " + st);
      int A = st.indexOf("A");
      int B = st.indexOf("B");
      int C = st.indexOf("C");

      stDist = st.substring(A + 1, B);
      dist = stDist.toInt();  // Get distance

      setItemState();
      setWarningState();
      
      Serial.println(dist);
      if (!client.connected()) {
        reconnect();
      }
      client.loop();
      String data = "{ \"data\" : { \"Distance\" : "+String(dist)+", \"Humidity\" : "+String(DHT.getHumidity())+", \"Temperature\" : "+String(DHT.getTemperature())+
                    ", \"hasItem\" : "+String(hasItem)+", \"hasWarn\" : "+String(hasWarning)+"}}";
      Serial.println(data);
      data.toCharArray(msg, (data.length() + 1));
      client.publish("@msg/data", msg);
      client.publish("@shadow/data/update", msg);
      Serial.println("DATA SENT");
      break;
    }
  }
}
