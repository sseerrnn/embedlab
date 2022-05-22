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
          console.log(buffer);
          console.log('\n');
          data = JSON.parse(buffer).data;
          console.log(data);
        });
        
      }).on('error', error => {
          console.error(error);
      });
      
      req.end();
}

window.click = function() {
    console.log('click');
}
