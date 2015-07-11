angular.module('zanonApp').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/posts.html',
        controller: 'PostsController'
      }).	
      when('/404', {
        templateUrl: 'partials/404.html'
      }).		  
      otherwise({
        redirectTo: '/404'
      });
  }
]);