const https = require("https");

function pictureset(data){
  
    if(data["Humidity"]>80){
      document.getElementById('status').src = "pic/raining.jpg";
      document.getElementById('status_comment').innerHTML = "rainy";
    }else if(data["Temperature"]>40){
      document.getElementById('status').src = "pic/hot.jpg";
      document.getElementById('status_comment').innerHTML = "hot";
    }else if(data["Temperature"]>35){
      document.getElementById('status').src = "pic/sunny.jpg";
      document.getElementById('status_comment').innerHTML = "sunny";
    }else{
      document.getElementById('status').src = "pic/cloudy.jpg";
      document.getElementById('status_comment').innerHTML = "cloudy";
    }
    if(data["hasItem"]==1){
      if(data["hasWarn"]==0){
        document.getElementById('alert').src = "pic/alert_off.jpg";
        document.getElementById('alert_comment').innerHTML = "package found";
      }else if(data["hasWarn"]==1){
        document.getElementById('alert').src = "pic/alert_on.jpg";
        document.getElementById('alert_comment').innerHTML = "pls kept the package";
      }
    }
    
  
    else if(data["hasItem"]==0){
      // document.getElementById('status').src = "pic/mystery.jpg";
      // document.getElementById('status_comment').innerHTML = "no package found";
      document.getElementById('alert').src = "pic/mystery.jpg";
      document.getElementById('alert_comment').innerHTML = "no package found";
    }


}

window.get = function() {
    const options = {
        hostname: 'api.netpie.io',
        path: '/v2/device/shadow/data?alias=device3',
        method: 'GET',
        headers: {'Authorization': 'Device bbcf287f-b6e1-442d-8323-1db628d39352:NYMcSAwMK3XWPYT7T6FTNFsv3XBBXwnr'},
      };
    

      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
      var buffer = '', data;
      res.on('data', d => {
        buffer += d;
      });
      
      res.on('end', (err) => {
        // console.log(buffer);
        // console.log('\n');
        
      data = JSON.parse(buffer).data;
      console.log(data);
      pictureset(data);
      
      
    });
    
  }).on('error', error => {
    console.error(error);
  });
  
   req.end();
   
}
async function startPolling () {
  await get();// รอให้ดึงข้อมูลเสร็จก่อน ค่อยรออีก 3 วินาที
  setTimeout(startPolling, 1000);
} 
window.setzero = function() {
  const options = {
      hostname: 'api.netpie.io',
      path: '/v2/device/shadow/data?alias=device3',
      method: 'POST',
      headers: {'Authorization': 'Device bbcf287f-b6e1-442d-8323-1db628d39352:NYMcSAwMK3XWPYT7T6FTNFsv3XBBXwnr'},
    };
  
    const data = JSON.stringify({
      "data": {
         "Distance": 0,
         "Humidity": 0 ,
         "Temperature": 0,
         "hasItem": 0,
         "hasWarn": 0
       }
     });
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`);
      var data = '';
      res.on('data', d => {
        data += d;
    });
    
      res.on('end', (err) => {
      // console.log(buffer);
      // console.log('\n');
      
      console.log('Body: ', JSON.parse(data));
  });
  
}).on('error', error => {
  console.error(error);
});
  req.write(data);
 req.end();
 
}
   
   
   

   
// window.click = function() {
//     console.log('click');
// }
startPolling();
