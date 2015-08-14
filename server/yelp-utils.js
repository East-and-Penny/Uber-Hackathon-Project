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
  
  console.log(req.body);
  //take params from req
  //feed into yelp search
  params = {
    limit: 3,
    category_filter: req.body.category_filter,
    radius_filter: req.body.radius_filter,
    ll: req.body.cll,
  };
  console.log(params);
  
  yelp.search(params, function(error, data) {

    if (error) {
      console.log(error);
      res.send(404);
    } else {
      var arr = req.body.cll.split(',');
      var start = {latitude: Number(arr[0]), longitude: Number(arr[1])};
      console.log(start);
      var b = data.businesses;
      var coord1 = b[0]['location']['coordinate'];
      var coord2 = b[1]['location']['coordinate'];
      var coord3 = b[2]['location']['coordinate'];

      //callback hell; to be refactored
      uber.estimatePrice(start, coord1, function(err, price1) {
        if (err) {console.log(err)}
        data.businesses[0]['uber'] = price1; 

        uber.estimatePrice(start, coord2, function(err, price2) {
          if (err) {console.log(err)}
          data.businesses[1]['uber'] = price2;

          uber.estimatePrice(start, coord3, function(err, price3) {
            if (err) {console.log(err)}
            data.businesses[2]['uber'] = price3;
            res.send(data);
          });
      });
      });
      
    }
  });

};  
