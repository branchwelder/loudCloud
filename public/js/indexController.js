var app = angular.module('app', ['ngRoute']);

app.controller('index', function($scope, $http){
	$http.get('/api/getUserData')
	.success(function(data){
		$scope.dataa = data;
		$scope.username = data.username;
		$scope.zipcode = data.zipcode;
		$scope.preferences = data.preferences;
	});
	$http.get('/api/queryAPI')
	.success(function(data){
		console.log("successful api get");
		$scope.weather = data.weather;
		$scope.playlist = data.playlist;
		console.log($scope.playlist)
	})
});
