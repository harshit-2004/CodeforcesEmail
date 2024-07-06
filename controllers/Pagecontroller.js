const LeetCodeService = require('../config/Contest_Platforms/leetcode');
const CodeforcesService = require('../config/Contest_Platforms/codeforces');
const CondeforcesGymServices = require('../config/Contest_Platforms/codeforcesgym');
const CodeChefService = require('../config/Contest_Platforms/codechef');
const HackerRankService = require('../config/Contest_Platforms/hackerrank');
const mongoose = require('mongoose');
const Contests = require('../models/Contests.js');

async function deleteContests(){
    try {
        const count = await Contests.deleteMany({});
        console.log(count);
    }catch(err){
        console.log("deleting all contests ",err);
    }
}

async function allContests() {
    try {

        await deleteContests();

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

        console.log("done fetching contests");
    } catch (error) {
        console.error(error);
    }
}

allContests();

module.exports = {
    allContests,
    deleteContests
};
