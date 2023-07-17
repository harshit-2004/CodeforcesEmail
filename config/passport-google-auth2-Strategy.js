const passport = require('passport');

const User = require('../models/user.js');

const cryptojs = require('crypto-js');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '452872850597-qv4q22o2g49818edkab47cisdfh7504p.apps.googleusercontent.com',
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
        console.log(user);
        return cb(null, user);
    }
    return cb(null, user);
  }
));

module.exports = passport;