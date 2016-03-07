var app = angular.module('loudCloud', ['ngRoute']);
var apiURL;
var data; 
//= $.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=91711&APPID=7df611ce3dfb9dd777f9f9816d8810c7&units=imperial", dataFetch)

function dataFetch(data){console.log(data.weather[0].description)}

app.controller('config', function($scope, $http){
	apiURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + $scope.zipCode + "&APPID=7df611ce3dfb9dd777f9f9816d8810c7"
 	data = $.getJSON(apiURL, dataFetch)
});
