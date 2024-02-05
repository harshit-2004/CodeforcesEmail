const passport = require('passport');

const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const config = require('./config');

var GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID:config.github_client_id,
    clientSecret:config.github_clientSecret ,
    callbackURL: config.github_callbackUrl
  }, async function(accessToken, refreshToken, profile, cb) {
    if(profile.email){
        let user = await User.findOne({ email: profile.email });
        if (!user) {
            user = await User.create({
                name: profile.displayName,
                email: profile.email,
                avatar: profile.photos[0].value,
                password: bcrypt.hash(profile.id, saltRounds, function(err, hash) {
                    return hash.toString();
                })
            });
            return cb(null, user);
        }
        return cb(null, user);
    }else{
        let user = await User.findOne({ email: profile.username });
        if (!user) {
            user = await User.create({
                name: profile.displayName,
                email: profile.username,
                avatar: profile.photos[0].value,
                password: bcrypt.hash(profile.id, saltRounds, function(err, hash) {
                    return hash.toString();
                })
            });
            return cb(null, user);
        }
        return cb(null, user);
      } 
    }
));

module.exports = passport;