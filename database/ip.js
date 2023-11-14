// const axios = require('axios');

// const getIP = async (url) => {
//   const response = await axios.get(`http://ip-api.com/json/${url}`);
  
//   // Access the data directly
//   const data = response.data;

//   return data; 
// };

// getIP('https://web.facebook.com/profile.php?id=61551931629173').then(ip => {
//     console.log(ip);
// }).catch(e => {
//     console.error('BRINE', e); 
// });

const dns = require('dns');

dns.lookup(require('os').hostname(), (err, address) => {
  if (err) {
    console.error('Error fetching public IP address:', err);
  } else {
    console.log(`Your public IP address is: ${address}`);
  }
});