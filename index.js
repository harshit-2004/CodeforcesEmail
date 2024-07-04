const express = require('express');

const app= express();

const port = 8000;

const Mongostore = require('connect-mongo');

const { connect, set } = require('mongoose');

const path = require('path');

const db = require('./config/mongoose');

const flash = require('connect-flash');

const customMware = require('./config/middleware');

const cookieParser = require('cookie-parser');

const nodemailer = require('nodemailer');

const session = require('express-session');

const Contests = require('./models/Contests');

const axios = require('axios');

const passport = require('passport');

const JWTPassport = require('./config/passport-jwt');

const passportLocal = require('./config/passport-local-strategy');

const passportGoogle = require('./config/passport-google-auth2-Strategy');

const passportGithub = require('./config/passport-github2-Strategy');

const allcontest = require('./controllers/Pagecontroller.js');

const fixtime = require('./config/fixedtimemailer');

const variabletime = require('./config/timebeforecontest');

const expressLayouts = require('express-ejs-layouts');

const config = require("./config/config.js");

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');

app.set('views','./views');

app.use(session({
    name:'Harshitcookie',
    secret:config.session_cookie_secret_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    // }
    },
    store: Mongostore.create({
        mongoUrl :"mongodb://localhost:27017/mydatabase",
        autoRemove:'disabled'
    })
}))

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

const cron = require('node-cron');

cron.schedule('0 0 * * *', () => {
    allcontest.allContests();
});

if(config.fixTimeM!=0){
    // Check if there are documents and schedule fixtime.mailsender if there are
    cron.schedule('*/59 * * * *', async () => {
        const count = await Contests.countDocuments();
        if (count > 0) {
            fixtime.mailsender();
        }
    });
}

if(config.varTimeM!=0){
    // Check if there are documents and schedule variabletime.mailsender if there are
    cron.schedule('*/59 * * * *', async () => {
        const count = await Contests.countDocuments();
        if (count > 0) {
            variabletime.mailsender();
        }
    });
}

app.use(express.static('./assets'));

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){console.log("error in running port ",port,err);}
    console.log(`congratulation ${port} in running successfully`);
})