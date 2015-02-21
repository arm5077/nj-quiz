app = angular.module("quizApp", []);
app.controller("quizController", ["$scope", "$http", "$sce", function($scope, $http, $sce){
	
	$scope.renderHTML = function(text){ return $sce.trustAsHtml(text); };
	$scope.score = 0;
	$scope.total = 0;
	
	
	// Get quiz data
	$http.get("data.json")
		.error(function(error){
			console.log("Hit an error! Here it is: " + error);
		})
		.success(function(response){
			
			$scope.data = response;
			$scope.total = $scope.data.questions.length;
			
			
		});
	
	$scope.evaluateAnswer = function(answer, question){
		if( !question.answered ){
			question.answered = true;
			answer.picked = true;
			if( answer.correct == true ) {
				answer.right = true;
				question.correct = false;
				$scope.score++;
			}
			else {
				answer.right = false;
				question.correct = false;
			}
			question.response = "<strong>" + answer.messageTitle + "</strong> " + answer.message;
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