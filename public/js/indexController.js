var app = angular.module('loudCloud', ['ngRoute']);
var apiURL;
var data = $.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=91711&APPID=7df611ce3dfb9dd777f9f9816d8810c7&units=imperial", dataFetch)
function dataFetch(data){
	console.log(data.weather[0].description);
}

app.controller('config', function($scope, $http){
	$http.get('/api/getUserData')
	.success(function(data){
		$scope.username = data.username;
		$scope.zipcode = data.zipcode;
		$scope.preferences = data.preferences;
	});
	console.log($scope.username);
});


