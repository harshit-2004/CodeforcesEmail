const User = require('../models/user');

const Fixedtime = require('../models/fixedtimeemail');

const Contests = require('../models/Contests');

const Emailsendingattime = require('../workers/emailsendingattime');

const EmailsendingMailer = require('../mailers/emailsendingattime');

const queue = require('../config/kue');

module.exports.mailsender = async function(req,res){
    const fixedtime = await Fixedtime.find({}).populate('user','name email');
    console.log("hello in fixed time");
    var date = new Date();
    for(let time of fixedtime){
        let fixarray = time.fixtime;
        for(let fixt of fixarray){
            let hours = fixt.substring(0,2);
            let minutes = fixt.substring(3,6);
            console.log("hours ",hours," minutes ",minutes);
            console.log("hours ",date.getHours()," minutes ",date.getMinutes());
            if(date.getHours()==hours&&date.getMinutes()==minutes){
                console.log("doing job");
                let object = {
                    time : fixt,
                    name : time.user.name,
                    email:time.user.email
                }
                let job = queue.create('emailsendingattime',object).save(function(err){
                    if(err){console.log("error in saving email queue ",err);}
                    console.log("job id ",job.id);
                });
            }
        }
    }
};