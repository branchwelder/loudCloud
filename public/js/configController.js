var app = angular.module('app', ['ngRoute']);

app.controller('config', function($scope, $http){
	console.log('config controller here, hello')
	$scope.weatherTypes = [
	{type: "Thunderstorm"},
	{type: "Drizzle"},
	{type: "Rain"},
	{type: "Snow"},
	{type: "Fog"},
	{type: "Clear"},
	{type: "Cloudy"},
	{type: "Windy"},
	{type: "Sunny"}];

	var onSuccess = function(data) {
		window.location.href = "/";
	};

	$scope.submit = function() {
		var zipcode = $("#config").find("[name='zipcode']").val();
		var preferences = [];

		$scope.weatherTypes.forEach(function(arrayItem) {
			var weather = arrayItem.type;
			preferences.push([weather,String($('input[name='+weather+']:checked', '#config').val())]);
		});

		$http.post("/api/update", {
			zipcode: zipcode,
			preferences: preferences
		}).then(onSuccess);
	};
})
