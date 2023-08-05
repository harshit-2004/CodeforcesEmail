const nodemailer = require('nodemailer');

const ejs = require('ejs');

const path = require('path');

const config = require('./config');

let transporter = nodemailer.createTransport(config.smtp);

let renderTemplate = (data,relativePath)=>{
    let mailHTML ;  
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,Template){
            if(err){console.log(err,"error in rendering to mailer");return ;}
            mailHTML = Template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}