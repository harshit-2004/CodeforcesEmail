const newLocal = './SiteService';
const SiteService = require(newLocal);
const ContestStatus = require('./ContestStatus');

class CodeforcesGymService extends SiteService {
    constructor() {
      super(); // Call the superclass constructor
      this.CONTESTS_URL = 'https://codeforces.com/api/contest.list?gym=true';
  }
  
    extract_contests(data) {
      // console.log(data.result);
      return data.result;
    }
  
    create_contests(contests) {
      contests.reverse().forEach((contest) => {
        if (!Object.values(ContestStatus).includes(contest.phase)) return;
        const contest_info = this.extract_contest_info(contest);
        this.create_contest_record(contest_info);
      });
    }
  
    extract_contest_info(contest) {
      const contest_info = {};
  
      contest_info.name = contest.name;
      contest_info.url = `https://codeforces.com/gymRegistration/${contest.id}`;
      contest_info.duration = parseInt(contest.durationSeconds);
      contest_info.difficulty = parseInt(contest.difficulty);
      contest_info.status = contest.phase;
      contest_info.site = "CodeForcesGym";
  
      if (!contest.startTimeSeconds) {
        contest_info.start_time = '-';
        contest_info.end_time = '-';
        contest_info.in_24_hours = 'No';
      } else {
        const start_time = new Date(parseInt(contest.startTimeSeconds) * 1000);
        const end_time = new Date(start_time.getTime() + contest_info.duration * 1000);
        contest_info.start_time = start_time.toISOString();
        contest_info.end_time = end_time.toISOString();
        contest_info.in_24_hours = this.in_24_hours(start_time, contest_info.status);
      }
  
      return contest_info;
    }
  }
  
  module.exports = CodeforcesGymService;