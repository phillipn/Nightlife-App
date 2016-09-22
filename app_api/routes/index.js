var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlAuth = require('../controllers/authentication');
var jwt = require('express-jwt'); 
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

router.get('/locations', ctrlLocations.locationListByCity);
router.post('/locations/going', auth, ctrlLocations.goingToLoc);
router.post('/locations/notgoing', auth, ctrlLocations.notGoingToLoc);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;