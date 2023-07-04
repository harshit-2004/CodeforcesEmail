const queue = require('../config/kue');

const emailsendingattime = require('../mailers/post_mailer');

queue.process('emailsendingattime',function(job,done){
    emailsendingattime.emailsendingattime(job.data);
    done();
})