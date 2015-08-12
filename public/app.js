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
        controller: 'appCtrl as ctrl'
      });
      $routeProvider.when('/restaurant', {
        templateUrl: 'templates/select1.html',
        controller: 'restaurantCtrl as ctrl'
      });
  });

angular.module('myApp')
  .factory('appFact', function() {
    return {choices: ''};
  })
  .controller('appCtrl', function($scope, $location, appFact) {
    $scope.choice1 = 'Restaurants';
    $scope.choice2 = 'Bars';
    $scope.choice3 = 'Cafes';

    $scope.choose1 = function() {
      appFact.choices = $scope.choice1;
      $location.path('/restaurant');
    };

    $scope.choose2 = function() {
      appFact.choices = $scope.choice2;
      $location.path('/bar');
    };

    $scope.choose3 = function() {
      appFact.choices = $scope.choice3;
      $location.path('/cafe');
    };
    // $location.path();
  })  
  .controller('restaurantCtrl', function($scope, $location, appFact) {
    $scope.choice1 = 'Breakfast and Brunch';
    $scope.choice2 = 'American';
    $scope.choice3 = 'No Preference';

    $scope.choose1 = function() {
      appFact.choices += ',breakfast and brunch';
      console.log(appFact.choices);
      $location.path('/restaurant');
    };

    $scope.choose2 = function() {
      appFact.choices += 'american';
      $location.path('/bar');
    };

    $scope.choose3 = function() {
      $location.path('/cafe');
    };
    // $location.path();
  });



  /*

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
  Search term (e.g. "food", "restaurants"). If term isn’t included we search everything.
limit number  optional  Number of business results to return

offset  number  optional  
  Offset the list of returned business results by this amount

sort  number  optional  
  Sort mode: 0=Best matched (default), 1=Distance, 2=Highest Rated. If the mode is 1 or 2 a search may retrieve an additional 20 businesses past the initial limit of the first 20 results. This is done by specifying an offset and limit of 20. Sort by distance is only supported for a location or geographic search. The rating sort is not strictly sorted by the rating value, but by an adjusted rating value that takes into account the number of ratings, similar to a bayesian average. This is so a business with 1 rating of 5 stars doesn’t immediately jump to the top.

category_filter string  optional  
  Category to filter search results with. See the list of supported categories. The category filter can be a list of comma delimited categories. For example, 'bars,french' will filter by Bars and French. The category identifier should be used (for example 'discgolf', not 'Disc Golf').

radius_filter number  optional  
  Search radius in meters. If the value is too large, a AREA_TOO_LARGE error may be returned. The max value is 40000 meters (25 miles).

deals_filter  bool  optional  
  Whether to exclusively search for businesses with deals



Sample Request:
http://api.yelp.com/v2/search?term=food&location=San+Francisco
  */
  