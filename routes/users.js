const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/signin',userController.signin);

router.get('/signup',userController.signup);

router.get('/signout',userController.signout);

router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/signin',failureMessage:true}),userController.createSession);

router.post('/create',userController.create);

module.exports = router;