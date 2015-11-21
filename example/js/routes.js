angular.module('exampleApp').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      
      // partials
      .when('/', {
        templateUrl: '/partials/posts.html',
        controller: 'PostsController'
      })	
      .when('/404', {
        templateUrl: '/partials/404.html',
        controller: '404Controller'
      })		  

      // posts 
      .when('/posts/post2', {
        templateUrl: '/partials/2015-11-21-post2.html'
      }) 
      .when('/posts/post1', {
        templateUrl: '/partials/2015-11-15-post1.html'
      })

      // 404
      .otherwise({
        redirectTo: '/404'
      });

      $locationProvider.html5Mode(true);
  }
]);