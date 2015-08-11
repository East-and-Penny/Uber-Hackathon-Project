angular.module('HRRUberProject', [
  'ngRoute',
  'mobile-angular-ui',
  'HRRUberProject.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});