const LeetCodeService = require('../config/Contest_Platforms/leetcode');
const CodeforcesService = require('../config/Contest_Platforms/codeforces');
const SiteService = require('../config/Contest_Platforms/siteService');
const ContestModel = require('../models/Contests');
const CondeforcesGymServices = require('../config/Contest_Platforms/codeforcesgym');
const CodeChefService = require('../config/Contest_Platforms/codechef');
const HackerRankService = require('../config/Contest_Platforms/hackerrank');

// async function allContests(req, res) {
async function allContests() {
    try {
      await ContestModel.deleteMany({})
      .then((result) => {
        console.log(`Deleted ${result.deletedCount} documents`);
      }).catch((error) => {
        console.error('Error deleting documents:', error);
      })
      
        const leetCodeService = new LeetCodeService();
        await leetCodeService.update_contests();

        const codeforcesService = new CodeforcesService();
        await codeforcesService.update_contests();

        const condeforcesGymServices = new CondeforcesGymServices();
        await condeforcesGymServices.update_contests();

        const codeChefService = new CodeChefService();
        await codeChefService.update_contests();

        const hackerRankService = new HackerRankService();
        await hackerRankService.update_contests();
        
        // console.log("hello123",contests);
        // const contests = await ContestModel.find({}).catch((error)=>{
        //   console.error("Error in fetching document");
        // });
        // return res.status(200).json();
        console.log("done fetching contests");
    } catch (error) {
        console.error(error);
        // res.status(500).send('Internal Server Error');
    }
}

allContests();

module.exports = {
    allContests
};
