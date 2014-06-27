'use strict';
angular.module('pequod', [
]).
config(['$routeProvider','$log', function($routeProvider, $log) {
  $routeProvider.otherwise({redirectTo: '/'}); 
}]);