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
	
	$scope.evaluateAnswer = function(answer, question){
		if( answer.correct == true ) {
			answer.right = true;
			question.correct = false;
		}
		else {
			answer.right = false;
			question.correct = false;
		}
		
	
		
	}
	
}]);

app.directive('image', function() {
    return { 
      link: function(scope, element, attributes){
        element.css("height", (element[0].offsetWidth / 1.618) + "px");
		
		setInterval(function(){
			element.css("height", (element[0].offsetWidth / 1.618) + "px");
		}, 1000);

      }
    }
});