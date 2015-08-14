angular.module('myApp', [
  "ngRoute",
  "mobile-angular-ui",
  "ngAnimate"
]).config(function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/login.html'
      });
      // ...
      $routeProvider.when('/link1', {
        templateUrl: 'templates/select1.html',
        controller: 'groupCtrl'
      });
      $routeProvider.when('/restaurant', {
        templateUrl: 'templates/select1.html',
        controller: 'restaurantCtrl'
      });
      $routeProvider.when('/bar', {
        templateUrl: 'templates/select1.html',
        controller: 'barCtrl'
      });
      $routeProvider.when('/cafe', {
        templateUrl: 'templates/select1.html',
        controller: 'cafeCtrl'
      });
      $routeProvider.when('/radius', {
        templateUrl: 'templates/select1.html',
        controller: 'radiusCtrl'
      });
      $routeProvider.when('/category', {
        templateUrl: 'templates/select1.html',
        controller: 'appCtrl'
      });
      $routeProvider.when('/loading', {
        templateUrl: 'templates/loading.html',
        controller: 'loadingCtrl'
      });
      $routeProvider.when('/results', {
        templateUrl: 'templates/selectView.html',
        controller: 'resultsCtrl'
      });
  });

angular.module('myApp')
  .factory('yelpFact', function() {
    return {
      category_filter: undefined,
      radius_filter: undefined,
      cll: undefined
    };
  })
  .factory('uberResultFact', function() {
    return {
      result: [
        {
          name: undefined,
          snippet_text: undefined
        },
        {
          name: undefined,
          snippet_text: undefined
        },
        {
          name: undefined,
          snippet_text: undefined
        }
      ]
    };
  })
  .factory('uberFact', function() {
    return {
      start_latitude: undefined,
      start_longitude: undefined,
      capacity: undefined
    };
  })
  .controller('appCtrl', function($scope, $location, yelpFact, uberFact) {
    $scope.choice1 = 'Restaurants';
    $scope.choice2 = 'Bars';
    $scope.choice3 = 'Cafés';

    $scope.imageRoute1 = 'food.png';
    $scope.imageRoute2 = 'drink.png';
    $scope.imageRoute3 = 'coffee.png';

    $scope.location = function() {
      geoFindMe(function(latlon){
        yelpFact.cll = latlon[0] + ',' + latlon[1];
        uberFact.start_latitude = latlon[0];
        uberFact.start_longitude = latlon[1];
      });
    };

    $scope.choose1 = function() {
      $location.path('/restaurant');
    };

    $scope.choose2 = function() {
      $location.path('/bar');
    };

    $scope.choose3 = function() {
      $location.path('/cafe');
    };

    $scope.location();
  })  
  .controller('restaurantCtrl', function($scope, $location, yelpFact) {
    $scope.choice1 = 'Breakfast / Brunch';
    $scope.choice2 = 'American';
    $scope.choice3 = 'No Preference';

    $scope.imageRoute1 = 'muffin.png';
    $scope.imageRoute2 = 'pizza.png';

    $scope.choose1 = function() {
      yelpFact.category_filter = 'restaurant,breakfast and brunch';
      $location.path('/radius');
    };

    $scope.choose2 = function() {
      yelpFact.category_filter = 'restaurant,american';
      $location.path('/radius');
    };

    $scope.choose3 = function() {
      yelpFact.category_filter = 'restaurant';
      $location.path('/radius');
    };
  })
  .controller('barCtrl', function($scope, $location, yelpFact) {
    $scope.choice1 = 'Dive Bars';
    $scope.choice2 = 'Dance Clubs';
    $scope.choice3 = 'No Preference';

    $scope.imageRoute1 = 'beer.png';
    $scope.imageRoute2 = 'dance.png';


    $scope.choose1 = function() {
      yelpFact.category_filter = 'bars,dive bars';
      $location.path('/radius');
    };

    $scope.choose2 = function() {
      yelpFact.category_filter = 'bars,dance clubs';
      $location.path('/radius');
    };

    $scope.choose3 = function() {
      yelpFact.category_filter = 'bars';
      $location.path('/radius');
    };
  })
  .controller('cafeCtrl', function($scope, $location, yelpFact) {
    $scope.choice1 = 'Coffee & Tea';
    $scope.choice2 = 'Desserts';
    $scope.choice3 = 'No Preference';

    $scope.imageRoute1 = 'coffee.png';
    $scope.imageRoute2 = 'dessert.png';

    $scope.choose1 = function() {
      yelpFact.category_filter = 'cafes,coffee & tea';
      $location.path('/radius');
    };

    $scope.choose2 = function() {
      yelpFact.category_filter = 'cafes,desserts';
      $location.path('/radius');
    };

    $scope.choose3 = function() {
      yelpFact.category_filter = 'cafes';
      $location.path('/radius');
    };
  })
  .controller('radiusCtrl', function($scope, $location, yelpFact, uberResultFact) {
    $scope.choice1 = 'Within 5 miles';
    $scope.choice2 = 'Within 10 miles';
    $scope.choice3 = 'Within 15 miles';

    $scope.imageRoute1 = 'short.png';
    $scope.imageRoute2 = 'medium.png';
    $scope.imageRoute3 = 'long.png';

    $scope.choose1 = function() {
      yelpFact.radius_filter = 8049;
      ajaxRequest('api/getRestaurants', function(data) {
        uberResultFact.result = data.businesses;
      });
      $location.path('/loading');

    };

    $scope.choose2 = function() {
      yelpFact.radius_filter = 16093;
      ajaxRequest('api/getRestaurants', function(data) {
        uberResultFact.result = data.businesses;
      });
      $location.path('/loading');

    };

    $scope.choose3 = function() {
      yelpFact.radius_filter = 24140;
      ajaxRequest('api/getRestaurants', function(data) {
        uberResultFact.result = data.businesses;
      });
      $location.path('/loading');

    };
  })
  .controller('groupCtrl', function($scope, $location, uberFact) {
    $scope.choice1 = '1-2 People';
    $scope.choice2 = '3-4 People';
    $scope.choice3 = '5-7 People';

    $scope.imageRoute1 = 'group-small.png';
    $scope.imageRoute2 = 'group-medium.png';
    $scope.imageRoute3 = 'group-large.png';


    $scope.choose1 = function() {
      uberFact.capacity = 2;
      $location.path('/category');
    };

    $scope.choose2 = function() {
      uberFact.capacity = 4;
      $location.path('/category');
    };

    $scope.choose3 = function() {
      uberFact.capacity = 7;
      $location.path('/category');
    };
  })
  .controller('loadingCtrl', function($scope, $location, $timeout, uberResultFact) {
    var checkData = function() {
      if(uberResultFact.result[0].name) {
        $location.path('/results');
      } else {
        $timeout(checkData, 1000);
      }
    };
    checkData();
  })
  .controller('resultsCtrl', function($scope, $location, uberResultFact) {
    var suggestedBusinesses = uberResultFact.result.map(function(item){
      var business = {};
      business.name = item.name;
      business.phone = item.display_phone;
      business.image = item.image_url;
      business.ratingImage = item.rating_img_url;
      business.review_count = item.review_count;
      business.uberXPrice = item.uber.prices[0].estimate;
      business.uberXLPrice = item.uber.prices[1].estimate;
      business.uberBlackPrice = item.uber.prices[2].estimate;
      return business;
    });
    console.log(suggestedBusinesses);

    var text = 'Make Uber Request To ';
    /*
    $scope.choice1-3, business names
    $scope.imageRoute1-6 biz img, biz rating img
    */


    $scope.choice1 = text + suggestedBusinesses[0].name + ': ' + suggestedBusinesses[0].snippet_text;
    if(uberResultFact.result[1].name) {
      $scope.choice2 = text + suggestedBusinesses[1].name + ': ' + suggestedBusinesses[1].snippet_text;
    } else {
      $scope.choice2 = '';
    }
    if(suggestedBusinesses[2].name) {
      $scope.choice3 = text + suggestedBusinesses[2].name + ': ' + suggestedBusinesses[2].snippet_text;
    } else {
      $scope.choice3 = '';
    }

    $scope.choice1 = uberResultFactresult[0].name.uber[0];
    var called = false;

    $scope.choose1 = function() {
      if(!called) {
        called = true;
        ajaxRequest('api/confirmRestaurant', function(data) {
          return data;
        });
      } else {
        
      }
      // $location.path('/');
    };

    $scope.choose2 = function() {
      if(!called && suggestedBusinesses[1].name) {
        called = true;
        ajaxRequest('api/confirmRestaurant', function(data) {
          return data;
        });
      } else {
        
      }
      // $location.path('/');
    };

    $scope.choose3 = function() {
      if(!called && suggestedBusinesses[2].name) {
        called = true;
        ajaxRequest('api/confirmRestaurant', function(data) {
          return data;
        });
      } else {
        
      }
      // $location.path('/');
    };
  });

function ajaxRequest(url, cb) {
  $.post(url, function(data) {
    cb(data);
  });
}

function geoFindMe(cb) {
  if (!navigator.geolocation){
    throw 'no gps detected';
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    cb([latitude, longitude]);
  }

  function error() {
    throw 'error occured when obtaining location data';
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

/*

/*
{
  "businesses": [
    {
      "uber": price,
      "categories": [
        [
          "Local Flavor",
          "localflavor"
        ],
        [
          "Mass Media",
          "massmedia"
        ]
      ],
      "display_phone": "+1-415-908-3801",
      "id": "yelp-san-francisco",
      "is_claimed": true,
      "is_closed": false,
      "image_url": "http://s3-media2.ak.yelpcdn.com/bphoto/7DIHu8a0AHhw-BffrDIxPA/ms.jpg",
      "location": {
        "address": [
          "140 New Montgomery St"
        ],
        "city": "San Francisco",
        "country_code": "US",
        "cross_streets": "3rd St & Opera Aly",
        "display_address": [
          "140 New Montgomery St",
          "(b/t Natoma St & Minna St)",
          "SOMA",
          "San Francisco, CA 94105"
        ],
        "neighborhoods": [
          "SOMA"
        ],
        "postal_code": "94105",
        "state_code": "CA"
      },
      "mobile_url": "http://m.yelp.com/biz/4kMBvIEWPxWkWKFN__8SxQ",
      "name": "Yelp",
      "phone": "4159083801",
      "rating_img_url": "http://media1.ak.yelpcdn.com/static/201012161694360749/img/ico/stars/stars_3.png",
      "rating_img_url_large": "http://media3.ak.yelpcdn.com/static/201012161053250406/img/ico/stars/stars_large_3.png",
      "rating_img_url_small": "http://media1.ak.yelpcdn.com/static/201012162337205794/img/ico/stars/stars_small_3.png",
      "review_count": 3347,
      "snippet_image_url": "http://s3-media2.ak.yelpcdn.com/photo/LjzacUeK_71tm2zPALcj1Q/ms.jpg",
      "snippet_text": "Sometimes we ask questions without reading an email thoroughly as many of us did for the last event.  In honor of Yelp, the many questions they kindly...",
      "url": "http://www.yelp.com/biz/yelp-san-francisco",
      "menu_provider": "yelp",
      "menu_date_updated": 1317414369
    }
  ],
  "region": {
    "center": {
      "latitude": 37.786138600000001,
      "longitude": -122.40262130000001
    },
    "span": {
      "latitude_delta": 0.0,
      "longitude_delta": 0.0
    }
  },
  "total": 10651
}


// function ajaxRequest(url, method, cb) {

// }

function geoFindMe() {
  if (!navigator.geolocation){
    return 'err';
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    return latitude + ',' + longitude;
  }

  function error() {
    return 'err';
  }
  navigator.geolocation.getCurrentPosition(success, error);
}


queryData: 
{
term: [array of strings, TBD],
category: [array of strings ] (e.g. bars, french)
sort: [int = 2],
limit: [int = 3],
location: {lat, long},
radius_filter: [int = user specified]
}



{term: string, limit: number, offset: number, sort: number, category_filter: string, radius_filter: number, deals_filter: bool}

Name  Data Type Required / Optional Description

term  string  optional  
  r term (e.g. "food", "restaurants"). If term isn’t included we r everything.
limit number  optional  Number of business results to return

offset  number  optional  
  Offset the list of returned business results by this amount

sort  number  optional  
  Sort mode: 0=Best matched (default), 1=Distance, 2=Highest Rated. If the mode is 1 or 2 a r may retrieve an additional 20 businesses past the initial limit of the first 20 results. This is done by specifying an offset and limit of 20. Sort by distance is only supported for a location or geographic r. The rating sort is not strictly sorted by the rating value, but by an adjusted rating value that takes into account the number of ratings, similar to a bayesian average. This is so a business with 1 rating of 5 stars doesn’t immediately jump to the top.

category_filter string  optional  
  Category to filter r results with. See the list of supported categories. The category filter can be a list of comma delimited categories. For example, 'bars,french' will filter by Bars and French. The category identifier should be used (for example 'discgolf', not 'Disc Golf').

radius_filter number  optional  
  r radius in meters. If the value is too large, a AREA_TOO_LARGE error may be returned. The max value is 40000 meters (25 miles).

deals_filter  bool  optional  
  Whether to exclusively r for businesses with deals



Sample Request:
http://api.yelp.com/v2/r?term=food&location=San+Francisco
  */
  