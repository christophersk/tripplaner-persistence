var Promise = require('bluebird');
var router = require('express').Router();

router.use('/hotels', require('./hotel.js'));
router.use('/restaurants', require('./restaurant.js'));
router.use('/activities', require('./activity.js'));
router.use('/days', require('./day.js'));

router.get('/', function(req, res, next) {

  res.render('index');

});

module.exports = router;
