var config = require('./config.js');
var request = require('request');

var yelp = require("yelp").createClient({
  consumer_key: config.YELP_CONSUMER_KEY, 
  consumer_secret: config.YELP_CONSUMER_SECRET,
  token: config.YELP_TOKEN,
  token_secret: config.YELP_TOKEN_SECRET
});

// See http://www.yelp.com/developers/documentation/v2/search_api
exports.getRestaurants = function(req, res) {
  //need oauth uber token to get price estimates
  console.log('getting restaurants, will err from invalid params atm');
  //take params from req
  //feed into yelp search
  params = {
    term: '',
    limit: 10,
    category_filter: '',
    radius_filter: 1000,
    ll: '',
  };

  yelp.search(params, function(error, data) {

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      var dataCoordinates = [];
      
      //filter data down to 3
      //make request to uber api for cost estimates
      //res.send(data)
    }
  });

};  

