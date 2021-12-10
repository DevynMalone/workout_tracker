require('dotenv').config();
const axios = require('axios');
console.log(process.env.API_KEY)
axios.get(`https://wger.de/api/v2/workout/`, { headers: { 'Authorization': `Token ${process.env.API_KEY}` } })
.then(function(response) {
   console.log('... here is the response that is coming back ...');
   console.log(response.data);
})
.catch(function(error) {
   console.log('... there is an error getting the data ...');
   console.log(error);
})