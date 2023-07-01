const passport = require('passport');

const User = require('../models/user.js');

const cryptojs = require('crypto-js');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '685870990916-8sc822gg6342hk340v88c0q9inn8tnsb.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },async function(accessToken, refreshToken, profile, cb) {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
        user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            password: cryptojs.SHA256(profile.id).toString()
        });
        return cb(null, user);
    }
    return cb(null, user);
  }
));

module.exports = passport;