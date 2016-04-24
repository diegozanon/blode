var ctrls = angular.module('exampleControllers', []);

ctrls.controller('MainController', ['$scope', function($scope) {

	$scope.active = {
		all: true,
		post1: false,
		post2: false
	};

	$scope.filter = function(filter) {
		for (var key in $scope.active) {
			$scope.active[key] = false;
		}

		$scope.active[filter] = true;
	};
}]);

// Empty controllers
ctrls.controller('PostsController', function() {});
