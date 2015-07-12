var ctrls = angular.module('zanonControllers', []);

ctrls.controller('MainController', function($scope, $location, $rootScope) {

	$scope.active = {
		all: true,
		angular: false,
		node: false,
		mongodb: false,
		aws: false
	};

	$scope.filter = function(filter) {
		for (var key in $scope.active) {
			$scope.active[key] = false;
		}

		$scope.active[filter] = true;
	};
});

// Empty controllers
ctrls.controller('PostsController', ['$scope', function($scope) {}]);