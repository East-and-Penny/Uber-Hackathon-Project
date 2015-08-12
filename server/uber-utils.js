var config = require('./config.js');

var Uber = require('node-uber');
 
var uber = new Uber({
  client_id: config.UBER_CLIENT_ID,
  client_secret: config.UBER_CLIENT_SECRET,
  server_token: config.UBER_SERVER_TOKEN,
  redirect_uri: '',
  name: 'Undecided'
});

exports.estimatePrice = function(start, end, callback) {
  var params = {
    start_latitude: start.latitude, 
    start_longitude: start.longitude, 
    end_latitude: end.latitude, 
    end_longitude: end.longitude 
  };
  uber.estimates.price(params, callback);
};