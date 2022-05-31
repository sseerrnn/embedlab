// const { get } = require("http");
const https = require("https");

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
      humidity.innerHTML = JSON.stringify(data["Humidity"]);
      distance.innerHTML = JSON.stringify(data["Distance"]);
      temperature.innerHTML = JSON.stringify(data["Temperature"]);
      hasitem.innerHTML = JSON.stringify(data["hasItem"]);
      haswarn.innerHTML = JSON.stringify(data["hasWarn"]);
      
      
      
    });
    
  }).on('error', error => {
    console.error(error);
  });
  
   req.end();
   
}
async function startPolling () {
  await get();// รอให้ดึงข้อมูลเสร็จก่อน ค่อยรออีก 3 วินาที
  setTimeout(startPolling, 3000);
} 
  
   
   
   

   
// window.click = function() {
//     console.log('click');
// }
startPolling();
