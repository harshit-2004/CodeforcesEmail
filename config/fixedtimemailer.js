const User = require('../models/user');

const Fixedtime = require('../models/fixedtimeemail');

const Contests = require('../models/Contests');

const Emailsendingattime = require('../workers/emailsendingattime');

const EmailsendingMailer = require('../mailers/emailsendingattime');

const queue = require('../config/kue');

module.exports.mailsender = async function(req,res){
    var cont = await Contests.find();
    const fixedtime = await Fixedtime.find({}).populate('user');
    for(let contes of cont){
        // console.log("hello in fixed time");
        var date = new Date();
        if(contes.in_24_hours==="Yes"){
            for(let fixt of fixedtime){
                // console.log(fixt);
                for(let time of fixt.fixtime){
                    let hours = time.substring(0,2);
                    let minutes = time.substring(3,5);
                        // console.log("hours ",hours," minutes ",minutes);
                        // console.log("hours ",date.getHours()," minutes ",date.getMinutes());
                        if(fixt.user.sites.find((site) => site === contes.site)){
                            if(date.getHours()==hours&&date.getMinutes()==minutes){
                                // console.log("doing job");
                                let object = {
                                    time : time,
                                    name : fixt.user.name,
                                    email:fixt.user.email,
                                    site:contes.site,
                                    url:contes.url,
                                    contesttiming:contes.start_time
                                }
                                console.log(object);
                                let job = queue.create('emailsendingattime',object).save(function(err){
                                    if(err){console.log("error in saving email queue ",err);}
                                    // console.log("job id ",job.id);
                                });
                        }
                    }
                }
            }
        }
    }
    
};