var app = angular.module('app', ['ngRoute']);

app.controller('config', function($scope, $http){
	$scope.weatherTypes = [
	{type: "Thunderstorm"},
	{type: "Drizzle"},
	{type: "Rain"},
	{type: "Snow"},
	{type: "Fog"},
	{type: "Clear"}, 
	{type: "Overcast"},
	{type: "Windy"},
	{type: "Sunny"}];
})