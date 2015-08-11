var config = require('./config.js');
var uber = require('./uber-utils.js');

var yelp = require("yelp").createClient({
  consumer_key: config.YELP_CONSUMER_KEY, 
  consumer_secret: config.YELP_CONSUMER_SECRET,
  token: config.YELP_TOKEN,
  token_secret: config.YELP_TOKEN_SECRET
});

// See http://www.yelp.com/developers/documentation/v2/search_api
exports.getRestaurants = function(req, res) {
  //need oauth uber token to get price estimates
  console.log('getting restaurants data and uber prices with stubbed out params');
  //take params from req
  //feed into yelp search
  params = {
    term: 'san francisco food',
    limit: 3,
    category_filter: '',
    radius_filter: 1000,
    ll: '37.7833, -122.4167',
  };
  
  yelp.search(params, function(error, data) {

    if (error) {
      console.log(error);
      res.send(404);
    } else {

      var start = {latitude: 37.7833, longitude: -122.4167};

      var b = data.businesses;
      var coord1 = b[0]['location']['coordinate'];
      var coord2 = b[1]['location']['coordinate'];
      var coord3 = b[2]['location']['coordinate'];

      //callback hell; to be refactored
      uber.estimatePrice(start, coord1, function(err, price1) {
        if (err) {console.log(err)};

        uber.estimatePrice(start, coord2, function(err, price2) {
          if (err) {console.log(err)}

          uber.estimatePrice(start, coord3, function(err, price3) {
            if (err) {console.log(err)}
            res.send({
              YELP: data,
              UBER: [price1, price2, price3]
            })
          });
      });
      });
      
    }
  });

};  

