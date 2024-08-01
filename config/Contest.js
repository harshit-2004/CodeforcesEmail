// Import necessary modules
const axios = require('axios');
const Contests = require('../models/Contests');

async function contestdata(){
  try {
    console.log("Hello");
    const response = await axios.get('http//127.0.0.1:8000/allcontests');

    // console.log(response);
    let contest = response.data;
    let cont = contest.filter(function(contest) {
      return (contest.status === "BEFORE");
    });

    for (var co of cont) {
      if(co.in_24_hours === "Yes"){
          console.log(co);
          new Contests({
              name: co.name,
              url: co.url,
              start_time: co.start_time,
              duration: co.duration,
              site: co.site,
              in_24_hours: co.in_24_hours,
              status: co.status
          });
        }
      }
    console.log('Contest list updated successfully');
  }catch(error) {
    console.error(error);
  }
}

// Define the contestlist function
module.exports.contestlist = async function(req, res) {
  contestdata(); 
};