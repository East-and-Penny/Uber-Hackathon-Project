angular.module('myApp', [
  "ngRoute",
  "mobile-angular-ui",
]).config(function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/login.html'
      });
      // ...
  });