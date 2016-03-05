var config = angular.module("configLoudCloud", ['ngRoute']);

function mainController($scope, $http) {
	$scope.weatherTypes = ["Thunderstorm", "Drizzle","Rain","Snow","Fog","Clear","Overcast","Windy","Sunny"];
};