var app = angular.module('app', ['ngRoute']);
var apiURL;
// var data = $.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=91711&APPID=7df611ce3dfb9dd777f9f9816d8810c7&units=imperial", dataFetch)
// function dataFetch(data){
// 	console.log(data.weather[0].description);
// }

app.controller('index', function($scope, $http){
	console.log("hi there");
	$http.get('/api/getUserData')
	.success(function(data){
		$scope.dataa = data;
		$scope.username = data.username;
		$scope.zipcode = data.zipcode;
		$scope.preferences = data.preferences;
	});
	$http.get('/api/queryAPI').success(function(data){
		console.log("successful api get")
	})
});
