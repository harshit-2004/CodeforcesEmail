const timebeforecontest = require("../models/timebeforecontest");

module.exports.timebeforecontest = async function(req, res) {
    const varitime = await timebeforecontest.find({}).populate('user', 'name email');
    console.log("hello in vari time ");
    var date = new Date();
    for (let time of varitime) {
        let variarray = time.varitime;
        for (let varit of variarray) {
            let hours = varit.substring(0, 2);
            let minutes = varit.substring(3, 6);
            console.log("hours ", hours, " minutes ", minutes);
            console.log("hours ", date.getHours(), " minutes ", date.getMinutes());
            if (date.getHours() == hours && date.getMinutes() == minutes) {
                console.log("doing job");
                let object = {
                    time: varit,
                    name: time.user.name,
                    email: time.user.email
                }
                let job = queue.create('emailsendingattime', object).save(function(err) {
                    if (err) { console.log("error in saving email queue ", err); }
                    console.log("job id ", job.id);
                });
            }
        }
    }
};