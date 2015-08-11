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

  yelp.search({term: "food", location: "Montreal"}, function(error, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

};  

