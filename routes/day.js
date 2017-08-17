const express = require('express');
const router = express.Router();
const { Day, Hotel, Restaurant, Activity } = require('../models');

router.get('/', function (req, res, next) {
  Day.findAll({
    include: [Hotel, Restaurant, Activity]
  })
    .then(days => {
      res.json(days);
      console.log("days[0]", days[0])
    })
    .catch(next);
})

router.post('/', function (req, res, next) {
  Day.create(req.body)
    .then(day => {
      res.json(day);
    })
    .catch(next)
})

router.put('/:id', function (req, res, next) {
  Day.findById(req.params.id)
  .then(day => {

    if (req.body.type === 'hotel') {
      return [day, Hotel.findById(req.body.attractionId)]
    } else if (req.body.type === 'restaurant') {
      return [day, Restaurant.findById(req.body.attractionId)];
    } else if (req.body.type === 'activity') {
      return [day, Activity.findById(req.body.attractionId)]
    }
    //return day.update(req.body)
  })
  .spread((day, attraction) => {

    if (req.body.type === 'hotel') {
      return day.setHotels([attraction]);
    } else if (req.body.type === 'restaurant') {
      return day.addRestaurants([attraction]);
    } else if (req.body.type === 'activity') {
      return day.addActivities([attraction]);
    }

  })
  .then(day => {
    return res.json(day);
  })
  .catch(next);
})
module.exports = router;
