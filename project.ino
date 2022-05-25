#include <AuthClient.h>
#include <debug.h>
#include <MicroGear.h>
#include <MQTTClient.h>
#include <PubSubClient.h>
#include <SHA1.h>






const char* ssid = "iPhone";
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
    Serial.print("Attempting NETPIE2020 connection…");
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

void setup() {
  Serial.begin(115200);
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
  
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  

  String data = "{ \"data\" : { \"humidity\" : \"10\"}}";
    
  Serial.println(data);
  data.toCharArray(msg, (data.length() + 1));
  client.publish("@msg/data", msg);
  client.publish("@shadow/data/update", msg);
  Serial.println("Hello NETPIE2020");
  delay(2000);
}
