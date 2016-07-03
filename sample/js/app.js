var exampleApp = angular.module('exampleApp', [
  'ngRoute',
  'ui.bootstrap',
  'exampleControllers'
]);

exampleApp.run(['$rootScope', function($rootScope) {
    $rootScope.$on("$routeChangeSuccess", function(event, current, previous) {
        $rootScope.title = current.$$route.title ? current.$$route.title + ' - ' : '';
    });
}]);
