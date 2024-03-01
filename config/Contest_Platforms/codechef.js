const newLocal = './SiteService';
const SiteService = require(newLocal);
const ContestStatus = require('./ContestStatus');

const SECONDS_IN_MINUTE = 60;

class CodeChefService extends SiteService {
  constructor() {
    super(); // Call the superclass constructor
    this.CONTESTS_URL = 'https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all';
}

  extract_contests(data) {
    return data.present_contests.concat(data.future_contests);
  }

  create_contests(contests) {
    contests.reverse().forEach((contest) => {
      const contest_info = this.extract_contest_info(contest);
      this.create_contest_record(contest_info);
    });
  }

  extract_contest_info(contest) {
    const contest_info = {};

    contest_info.name = contest.contest_name;
    contest_info.url = `https://www.codechef.com/${contest.contest_code}`;
    contest_info.duration = parseInt(contest.contest_duration) * SECONDS_IN_MINUTE;

    contest_info.start_time = new Date(contest.contest_start_date_iso).getTime();
    contest_info.site = "CodeChef";

    if (contest.contest_end_date_iso) {
      contest_info.end_time = new Date(contest.contest_end_date_iso).getTime();
    } else {
      contest_info.end_time = contest_info.start_time + (10 * 365 * 24 * 60 * 60 * 1000); // 10 years in milliseconds
      contest_info.duration = contest_info.end_time - contest_info.start_time;
    }

    contest_info.status = this.get_status(new Date(contest_info.start_time));
    contest_info.in_24_hours = this.in_24_hours(new Date(contest_info.start_time), contest_info.status);

    return contest_info;
  }
}


module.exports = CodeChefService;