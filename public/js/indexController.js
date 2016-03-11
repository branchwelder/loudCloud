var app = angular.module('app', ['ngRoute']);

app.controller('index', function($scope, $http){
	$http.get('/api/queryAPI')
	.success(function(data){
		$scope.weather = data.weather;
		$scope.playlist = data.playlist;
	})
});
