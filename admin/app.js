app = angular.module("quizAdminApp", []);

app.controller("quizAdminController", ["$scope", "$http", "$sce", function($scope, $http, $sce){

	$scope.temp = {};
	$scope.host = window.location.host;
	$scope.success = false;
	$scope.error = false;
	$scope.newQuestion = false;
	$scope.newAnswer = false;
	
	
	$scope.addAnswer = function(answer, question){
		
		if(!question.answers) question.answers = [];
		question.answers.push(angular.copy(answer));

		$scope.emptyObject(answer);
			
		
	
	};
	
	$scope.addQuestion = function(question) {
		isThereTruth = false;
		question.answers.forEach(function(answer){
			if( answer.correct ) isThereTruth = true;
		});
		
		if( isThereTruth ){
			$scope.data.questions.push(angular.copy(question));
			$scope.emptyObject(question);
			$scope.newQuestion = false;
		}
		else {
			alert("You haven't selected a correct answer!")
		}
		
	}
	
	$scope.deleteQuestion = function(question){
		index = $scope.data.questions.map( function(q){ return q }).indexOf(question);
		$scope.data.questions.splice( index, 1 );
		
		console.log(index);
	}
	
	$scope.emptyObject = function(object){
		for(var p in object)
		    if(object.hasOwnProperty(p))
		        object[p] = '';
	}
	
	$scope.handleSlug = function(){
		if( $scope.slug ){
			$http.get('../slug/' + $scope.slug).success(function(data, status, headers, config){
				if( data.status == "No quiz found!") {
					console.log("No quiz data -- initializing defaults");
					$scope.data = {
						"title": "",
					    "text": "",
						"bronzeResponse": "You'll do better next time!",
						"silverResponse": "Not too shabby!",
						"goldResponse": "I'm so so so so proud of you.",
						"url": "http://www.national.journal.com/...",
					    "questions": []
					};
				} else {
					
					// For right now, set all quizzes to NOT fullscreen.
					data.data.fullscreen = false;
					
					console.log("Pull data from existing quiz!");
					$scope.data = data.data;
					
					
				}
				
			})
			.error(function(data, status, headers, config){
				console.log(data);
				
			})
		}
		
	};

	$scope.submitQuiz = function(){
		console.log("submitting!");
		
		$http.post('/slug/' + $scope.slug, {json: JSON.stringify($scope.data)})
			.success(function(data, status, headers, config){
				if( status == 201 ){
					$scope.success = true;
					$scope.showEmbed = true;
					setTimeout(function(){
						$scope.$apply(function(){
							$scope.success = false;
						});
					}, 5000); 
				}
				else {
					$scope.error = true;
					$scope.errorMessage = "Error: " + data.status;
					setTimeout(function(){
						$scope.$apply(function(){
							$scope.error = false;
						});
					}, 5000);
				}
				
			})
			.error(function(data, status, headers, config){
				console.log("SO MUCH ERROR: " + data);
			})
	}


}]);

app.filter('anyDirtyFields', function () {
	return function(form) {
		for(var prop in form) {
      		if(form.hasOwnProperty(prop)) {
        		if(form[prop].$dirty) {
          			return true; 
        		}
      		}
    	}
    return false;
  };
});