var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/getRestaurants', function(req, res){
  //route for obtaining 3 random restaurants
});

router.post('/confirmRestaurant', function(req, res){
  //route for confirming choice and dispatching uber
});

router.post('/cancelRide', function(req, res){
  //route for cancelling uber request
});

module.exports = router;
