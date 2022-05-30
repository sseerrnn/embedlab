const { data } = require("browserslist");
const https = require("https");
window.get = async function() {
  var tmp;
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
            // console.log(data);
            tmp = data;
            // return data;
          });
        
        }).on('error', error => {
          console.error(error);
        });
      
      req.end();
      return tmp;
      
}

window.click = function() {
    console.log('click');
}
console.log(window.get());