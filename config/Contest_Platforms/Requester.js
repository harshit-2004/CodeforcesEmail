const axios = require('axios');
const USER_AGENT = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0';
async function Requesters(url){
    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': USER_AGENT }
      });
      // console.log(response.data);
    return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('HTTP request failed');
    }
};

module.exports = Requesters;
