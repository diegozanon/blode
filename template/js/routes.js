angular.module('zanonApp').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      
      // partials
      when('/', {
        templateUrl: 'partials/posts.html',
        controller: 'PostsController'
      }).	
      when('/404', {
        templateUrl: 'partials/404.html',
        controller: '404Controller'
      }).		  

      // posts
      when('/angular-single-page-application-and-seo', {
        templateUrl: 'posts/2015-07-05-angular-single-page-application-and-seo.html'
      }).
      when('/a-simple-example-of-angular-directives', {
        templateUrl: 'posts/2015-06-02-a-simple-example-of-angular-directives.html'
      }).
      when('/retrieving-data-from-mongodb-using-node', {
        templateUrl: 'posts/2015-04-07-retrieving-data-from-mongodb-using-node.html'
      }).
      when('/an-intro-to-nwjs-forme-node-webkit', {
        templateUrl: 'posts/2015-03-14-an-intro-to-nwjs-forme-node-webkit.html'
      }).
      when('/serving-gzipped-files-in-amazon-cloudfront', {
        templateUrl: 'posts/2015-02-18-serving-gzipped-files-in-amazon-cloudfront.html'
      }).

      // 404
      otherwise({
        redirectTo: '/404'
      });
  }
]);