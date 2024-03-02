const newLocal = './SiteService';
const SiteService = require(newLocal);
const ContestStatus = require('./ContestStatus');

class HackerRankService extends SiteService {
    static CONTESTS_URL1 = 'https://www.hackerrank.com/rest/contests/upcoming?limit=100';
    static CONTESTS_URL2 = 'https://www.hackerrank.com/rest/contests/college?limit=100';
  
    async update_contests() {
      const response1 = await this.make_request(HackerRankService.CONTESTS_URL1);
      const response2 = await this.make_request(HackerRankService.CONTESTS_URL2);
  
      const contests = this.extract_contests(response1, response2);

      await this.create_contests(contests);
    }
  
    extract_contests(data1, data2) {
      const contests = [];
  
      data1.models.forEach((contest) => {
        contest.type_ = 'Regular';
        contests.push(contest);
      });
  
      data2.models.forEach((contest) => {
        contest.type_ = 'College';
        contests.push(contest);
      });
  
      contests.sort((a, b) => a.epoch_starttime - b.epoch_starttime);
  
      return contests;
    }
  
    create_contests(contests) {
      contests.forEach((contest) => {
        const contest_info = this.extract_contest_info(contest);
        if (!contest_info) return;
        this.create_contest_record(contest_info);
      });
    }
  
    extract_contest_info(contest) {
      const contest_info = {};
  
      contest_info.name = contest.name;
      contest_info.url = `https://hackerrank.com/contests/${contest.slug}`;
  
      const start_time = new Date(contest.epoch_starttime * 1000);
      const end_time = new Date(contest.epoch_endtime * 1000);
      contest_info.site = "HackerRank";
  
      if (Date.now() > end_time) return null;
  
      contest_info.duration = (end_time - start_time) / 1000;
      contest_info.type_ = contest.type_;
      contest_info.status = this.get_status(start_time);
      contest_info.in_24_hours = this.in_24_hours(start_time, contest_info.status);
  
      contest_info.start_time = start_time.toISOString();
      contest_info.end_time = end_time.toISOString();
  
      return contest_info;
    }
  }

module.exports = HackerRankService;