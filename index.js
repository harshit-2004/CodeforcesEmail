const express = require('express');

const app= express();

const port = 8000;

const Mongostore = require('connect-mongo');

const { connect } = require('mongoose');

const path = require('path');

const db = require('./config/mongoose');

const session = require('express-session');

const passport = require('passport');

const JWTPassport = require('./config/passport-jwt');

const passportLocal = require('./config/passport-local-strategy');

const passportGoogle = require('./config/passport-google-auth2-strategy');

const passportGithub = require('./config/passport-github2-Strategy');

const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded({extended:true}));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');

app.set('views','./views');

app.use(session({
    name:'Harshitcookie',
    secret:'sessioncookie',
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

app.use(express.static('./assets'));

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){console.log("error in running port ",port,err);}
    console.log(`congratulation ${port} in running successfully`);
})