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

router.get('/profile',passport.checkAuthentication,userController.profile);

router.post('/profile_udpate',userController.profile_update);

router.get('/setting',passport.checkAuthentication,userController.setting);

router.post('/emailtime:id',passport.checkAuthentication,userController.emailtime);

router.post('/emailfixedtime:id',passport.checkAuthentication,userController.emailfixedtime);

router.post('/contestwebsite:id',passport.checkAuthentication,userController.contestwebsite);

router.post('/deletefixedtime:id',passport.checkAuthentication,userController.fixtimedelete);

module.exports = router;