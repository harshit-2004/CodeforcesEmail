const User = require('../models/user');
const timebeforecontest = require('../models/timebeforecontest');
const Contests = require('../models/Contests');
const emailsendingatvariableMailer = require('../mailers/emailsendingatvariabletime');
const queue = require('../config/kue');

module.exports.mailsender = async function (req, res) {
  try {
    var cont = await Contests.find();
    // console.log("hello in variable time");
    let timebeforeconte = await timebeforecontest.find().populate('user');
    for (let contes of cont) {
        if (contes.in_24_hours === 'Yes') {
            for(let fixt of timebeforeconte){
                for (let vtime of fixt.time) {
                    console.log(vtime);
                    let utctime = new Date(contes.start_time);
                    let currentDate = new Date();
                    // console.log("utctime.getUTCFullYear() === currentDate.getUTCFullYear()",utctime.getUTCFullYear(),currentDate.getUTCFullYear());
                    // console.log(" utctime.getUTCMonth() === currentDate.getUTCMonth() ",utctime.getUTCMonth(),currentDate.getUTCMonth());
                    // console.log("utctime.getUTCDate() === currentDate.getUTCDate()",utctime.getUTCDate() , currentDate.getUTCDate());
                    // console.log("utctime.getUTCHours()-currentDate.getUTCHours()==vtime.substr(0,2)&&",utctime.getUTCHours(),currentDate.getUTCHours(),parseInt(vtime.substr(0,2)));
                    // console.log(" utctime.getUTCMinutes()-currentDate.getUTCMinutes()==vtime.substr(3,4)",utctime.getUTCMinutes(),currentDate.getUTCMinutes(),parseInt(vtime.substr(3,4)));
                    if(fixt.user.sites.find((site) => site === contes.site)){
                        if (
                            utctime.getUTCFullYear() === currentDate.getUTCFullYear() &&
                            utctime.getUTCMonth() === currentDate.getUTCMonth() &&
                            utctime.getUTCDate() === currentDate.getUTCDate()&&
                            utctime.getUTCHours()-currentDate.getUTCHours()==parseInt(vtime.substr(0,2))&&
                            utctime.getUTCMinutes()-currentDate.getUTCMinutes()==parseInt(vtime.substr(3,4))
                        ) {
                            var object = {
                            time: vtime,
                            name: fixt.user.name,
                            email: fixt.user.email,
                            site: contes.site,
                            url: contes.url,
                            contesttiming: contes.start_time,
                            };
                            console.log(object);
                            
                            // Assuming you have a function to send the email
                            let job = queue.create('emailsendingatvariableMailer',object).save(function(err){
                                if(err){console.log("error in saving email queue ",err);}
                                // console.log("job id ",job.id);
                            });
                            // console.log('Email sent successfully');
                        }
                    }
                }
        }
      }
    }

  } catch (error) {
    console.error('Error sending email:', error);
  }
}
