const nodemailer = require('../config/nodemailer');

exports.emailsendingattime = (object)=>{
    let htmlString = nodemailer.renderTemplate({
        object:object
    },'/fixedemail.ejs')
    console.log("inside email sending at time ",object);
    nodemailer.transporter.sendMail({
        from:"harshit.sharma89501@gmail.com",
        to:object.email,
        subject:"coding contest reminder at time ",
        html:htmlString
    },function(err,info){
        if(err){console.log("error in sendign mail",err);return;}
        console.log("message sent ",info);
        return ;
    })
}