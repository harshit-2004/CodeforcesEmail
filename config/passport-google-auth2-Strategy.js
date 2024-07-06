const passport = require('passport');

const User = require('../models/user.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const config = require('./config.js');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: config.google_client_id,
    clientSecret: config.google_clientSecret,
    callbackURL:config.google_callbackUrl,
    passReqToCallback: true
  },async function(req,accessToken, refreshToken, profile, cb) {
    // console.log("profile",profile,cb);
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
        user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            password: bcrypt.hash(profile.id, saltRounds, function(err, hash) {
              return hash.toString();
          })
        });
        console.log(user);
        return cb(null, user);
    }
    return cb(null, user);
  }
));

module.exports = passport;