const newLocal = './SiteService';
const SiteService = require(newLocal);

class LeetCodeService extends SiteService {
  constructor() {
      super(); // Call the superclass constructor
      this.CONTESTS_URL = 'https://leetcode.com/graphql?query={%20allContests%20{%20title%20titleSlug%20startTime%20duration%20__typename%20}%20}';
  }
    extract_contests(data) {
      return data.data.allContests;
    }
  
    create_contests(contests) {
      contests.forEach((contest) => {
        const contestInfo = this.extract_contest_info(contest);
        if (!contestInfo) return;
        this.create_contest_record(contestInfo);
      });
    }
  
    extract_contest_info(contest) {
      const contestInfo = {};
  
      contestInfo.name = contest.title;
      contestInfo.url = `https://leetcode.com/contest/${contest.titleSlug}`;
      contestInfo.duration = parseInt(contest.duration);
      contestInfo.site = "LeetCode";
  
      const startTime = new Date(parseInt(contest.startTime) * 1000);
      const endTime = new Date(startTime.getTime() + (contestInfo.duration * 1000));
  
      if (new Date() > endTime) return null;
  
      contestInfo.status = this.get_status(startTime);
      contestInfo.in_24_hours = this.in_24_hours(startTime, contestInfo.status);
  
      contestInfo.start_time = startTime.toISOString();
      contestInfo.end_time = endTime.toISOString();
  
      return contestInfo;
    }
  }
  
module.exports = LeetCodeService;