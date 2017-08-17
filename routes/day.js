const express = require('express');
const router = express.Router();
const { Day, Hotel, Restaurant, Activity } = require('../models');

router.get('/', function (req, res, next) {
  Day.findAll({
    include: [Hotel, Restaurant, Activity]
  })
    .then(days => {
      res.json(days);
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

router.delete('/', function (req, res, next) {
  console.log('id is', req.body.id);
  Day.findById(+req.body.id)
  .then(day => {
    day.destroy();
  })
  .then(day => {
    res.sendStatus(200);
  })
  .catch(next);
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

router.delete('/:id', function (req, res, next) {
  Day.findById(req.params.id)
  .then(day => {
    if (req.body.type === 'hotel') {
      return [day, Hotel.findById(req.body.attractionId)]
    } else if (req.body.type === 'restaurant') {
      return [day, Restaurant.findById(req.body.attractionId)];
    } else if (req.body.type === 'activity') {
      return [day, Activity.findById(req.body.attractionId)]
    }
  })
  .spread((day, attraction) => {
    if (req.body.type === 'hotel') {
      return day.removeHotels([attraction]);
    } else if (req.body.type === 'restaurant') {
      return day.removeRestaurants([attraction]);
    } else if (req.body.type === 'activity') {
      return day.removeActivities([attraction]);
    }
  })
  .then(day => {
    return res.json(day);
  })
  .catch(next);
})
module.exports = router;
