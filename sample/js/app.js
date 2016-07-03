var exampleApp = angular.module('exampleApp', [
  'ngRoute',
  'ui.bootstrap',
  'exampleControllers'
]);

exampleApp.run(function($rootScope) {
    $rootScope.$on('$locationChangeSuccess', function (event, next, current) {
        $rootScope.title = current.$$route.title ? current.$$route.title + ' - ' : '';
    });
});
