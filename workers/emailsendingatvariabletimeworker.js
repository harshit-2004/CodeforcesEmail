const queue = require('../config/kue');

const emailsendingattime = require('../mailers/emailsendingatvariabletime');

queue.process('emailsendingattime',function(job,done){
    emailsendingattime.emailsendingattime(job.data);
    done();
})