const ContestsModel = require('../../models/Contests');
const Requesters = require('./Requester');
const ContestStatus = require('./ContestStatus');

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
const UTC_FORMAT = '%Y-%m-%dT%H:%M:%S.%LZ';

class SiteService {
  constructor() {
    this.UTC_FORMAT = UTC_FORMAT;
    this.SECONDS_IN_MINUTE = SECONDS_IN_MINUTE;
    this.SECONDS_IN_HOUR = SECONDS_IN_HOUR;
    this.SECONDS_IN_DAY = SECONDS_IN_DAY;
  }

  
  async update_contests() {
    // this.CONTESTS_URL = 'https://leetcode.com/graphql?query={%20allContests%20{%20title%20titleSlug%20startTime%20duration%20__typename%20}%20}';
    try {
      const data = await this.make_request(this.CONTESTS_URL);
      const contests = this.extract_contests(data);

      await this.create_contests(contests);
    } catch (exception) {
      console.error(exception.stack);
    }
  }

  extract_contests(data) {
    throw new Error('Not implemented');
  }

  create_contests(contests) {
    throw new Error('Not implemented');
  }

  extract_contest_info(contest) {
    throw new Error('Not implemented');
  }

  async make_request(url) {
    console.log(url,"making  request");
    return await Requesters(url);
  }

  create_contest_record(params) {
    console.log("create contest record",params);
    this.service_model.create(params);
  }

  in_24_hours(start_time, status) {
    if (status === ContestStatus.CODING) {
      return 'No';
    } else {
      return (start_time - Date.now()) / this.SECONDS_IN_HOUR <= 24 ? 'Yes' : 'No';
    }
  }

  get_status(start_time) {
    return start_time < Date.now() ? ContestStatus.CODING : ContestStatus.BEFORE;
  }

  get service_model() {
    return ContestsModel; 
  }
}

module.exports = SiteService; 