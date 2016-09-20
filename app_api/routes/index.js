var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');

router.get('/locations', ctrlLocations.locationListByCity);
router.post('/locations/:location', ctrlLocations.goingToLoc);

module.exports = router;