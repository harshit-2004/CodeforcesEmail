const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/signin',userController.signin);

router.get('/signup',userController.signup);

router.get('/signout',userController.signout);

router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/signin',failureMessage:true}),userController.createSession);

router.post('/create',userController.create);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),userController.createSession);

router.get('/auth/github',passport.authenticate('github',{scope:['profile','email']}));

router.get('/auth/github/callback',passport.authenticate('github',{failureRedirect:'/users/signin'}),userController.createSession);

module.exports = router;