app = angular.module("quizAdminApp", []);

app.controller("quizAdminController", ["$scope", "$http", "$sce", function($scope, $http, $sce){

	$scope.temp = {};
	
	$scope.addAnswer = function(answer, question){
		if(!question.answers) question.answers = [];
		question.answers.push(angular.copy(answer));
		
		answer = {};
	
	};
	
	$scope.addQuestion = function(question) {
		$scope.data.questions.push(angular.copy(question));
		
	}
	
	
	$scope.handleSlug = function(){
		if( $scope.slug ){
			$http.get('../slug/' + $scope.slug).success(function(data, status, headers, config){
				
				if( data.status == "Quiz created!") {
					console.log("No quiz data -- initializing defaults");
					$scope.data = {
						"title": "How well do you know the cats of the National Journal newsroom?",
					    "text": "So many cats to choose from! Such hard decisions. Take your best shot at matching cats to their owners. Meow! (Also, there's a random Billy Joel song at the end.)",
						"bronzeResponse": "So you don't know cats very well. Big deal!",
						"silverResponse": "You know your Billy Joel!",
						"goldResponse": "I'm so so so so proud of you.",
						"url": "http://www.aol.com",
					    "questions": []
					};
				} else {
					console.log("Pull data from existing quiz");
					$scope.data = data;
				}
				
			})
			.error(function(data, status, headers, config){
				console.log(data);
				
			})
		}
		
	}


}]);