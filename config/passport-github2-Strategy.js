const passport = require('passport');

const User = require('../models/user');

const cryptojs = require('crypto-js');

var GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID:"da508c4b2fcc4787b913",
    clientSecret: "53c2ccf3aecf0d97ed1c7d7ca6b96a0590d43bc7",
    callbackURL: "http://localhost:8000/users/auth/github/callback"
  }, async function(accessToken, refreshToken, profile, cb) {
    if(profile.email){
        let user = await User.findOne({ email: profile.email });
        if (!user) {
            user = await User.create({
                name: profile.displayName,
                email: profile.email,
                avatar: profile.photos[0].value,
                password: cryptojs.SHA256(profile.id).toString()
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
                password: cryptojs.SHA256(profile.id).toString()
            });
            return cb(null, user);
        }
        return cb(null, user);
      } 
    }
));

module.exports = passport;