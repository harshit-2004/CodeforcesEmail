const express = require('express');

const router = express.Router();

const home_controller = require('../controllers/home_controller');

const pagesController = require('../controllers/Pagecontroller');

router.get('/', home_controller.home);

router.get('/allcontests',pagesController.allContests);

router.use('/users',require('./users'));

module.exports = router;