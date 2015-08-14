var express = require('express');
var router = express.Router();
var yelp = require('../yelp-utils.js');
var request = require('request');

var uber = 'https://sandbox-api.uber.com/'

/* GET home page. */

router.post('/getRestaurants', yelp.getRestaurants);

router.post('/confirmRestaurant', function(req, res){

  console.log(req.body);
  console.log(req.session.passport.user);
  request.post(uber + 'v1/requests', {auth: {bearer: req.session.passport.user}}, {form: {
    product_id: req.body.product_id,
    start_latitude: req.body.start_latitude,
    start_longitude: req.body.start_longitude,
    end_latitude: req.body.end_latitude,
    end_longitude: req.body.end_longitude,
    surge_confirmation_id: req.body.surge_confirmation_id
  }}, function(err, res, body){
    if(err) throw err;
    if(res.statusCode === 200){
      console.log('request confirmed, request id: ' + body.request_id);
    } else {
      console.log('request denied');
    }
  });
});

router.post('/cancelRide', function(req, res){
  console.log(req.body);
  request.delete(uber + 'v1/requests/' + req.body.request_id, function(err, res, body){
    if(err) throw err;
    if(res.statusCode === 200){
      console.log('request cancelled successfully');
    } else {
      console.log('request not cancelled?');
    }
  });
});

module.exports = router;
