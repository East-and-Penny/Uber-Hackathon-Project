var express = require('express');
var router = express.Router();
var yelp = require('../yelp-utils.js');
var request = require('request');

var uber = 'https://sandbox-api.uber.com/'

/* GET home page. */

router.post('/getRestaurants', yelp.getRestaurants);

router.post('/confirmRestaurant', function(req, res){
  //route for confirming choice and dispatching uber
  console.log(req.body);
  request.post(uber + 'v1/requests', {form: {
// <<<<<<< HEAD
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
// =======
//     product_id: req.body.pid,
//     start_latitude: req.body.startLat,
//     start_longitude: req.body.starLong,
//     end_latitude: req.body.endLat,
//     end_longitude: req.body.endLong,
//     surge_confirmation_id: req.body.surgeConfirm
//   }}, function(err, res, body){
//     if(err) throw err;
//     if(res.statusCode === 200){
//       console.log('request confirmed');
//     } else {
//       console.log('request denied');
//     }
//   });
// >>>>>>> Yelp and Uber requests almost live
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
