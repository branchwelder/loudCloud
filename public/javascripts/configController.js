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
	{type: "Overcast"},
	{type: "Windy"},
	{type: "Sunny"}];

	var onSuccess = function(data) {
		console.log('worked');
	};

	$scope.submit = function() {
		var location = $("#config").find("[name='location']").val();
		var preferences = [];

		$scope.weatherTypes.forEach(function(arrayItem) {
			var weather = arrayItem.type;
			preferences.push({ weather : String($('input[name='+weather+']:checked', '#config').val()) })
		});

		$http.post("api/create", {
			location: location,
			preferences: preferences
		}).then(onSuccess);
	};
})
