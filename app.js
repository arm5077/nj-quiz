app = angular.module("quizApp", []);
app.controller("quizController", ["$scope", "$http", "$sce", function($scope, $http, $sce){
	
	$scope.renderHTML = function(text){ return $sce.trustAsHtml(text); };
	
	// Get quiz data
	$http.get("data.json")
		.error(function(error){
			console.log("Hit an error! Here it is: " + error);
		})
		.success(function(response){
			
			$scope.data = response;
			
		});
	
	
	
}]);