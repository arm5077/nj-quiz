app = angular.module("quizAdminApp", []);

app.controller("quizAdminController", ["$scope", "$http", "$sce", function($scope, $http, $sce){

	$scope.temp = {};
	$scope.host = window.location.host;
	$scope.success = false;
	$scope.error = false;
	
	
	$scope.addAnswer = function(answer, question){
		console.log(question);
		if(!question.answers) question.answers = [];
		question.answers.push(angular.copy(answer));
		
		$scope.emptyObject(answer);
	
	};
	
	$scope.addQuestion = function(question) {
		$scope.data.questions.push(angular.copy(question));
		
		$scope.emptyObject(question);
		
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
						"title": "How well do you know the cats of the National Journal newsroom?",
					    "text": "So many cats to choose from! Such hard decisions. Take your best shot at matching cats to their owners. Meow! (Also, there's a random Billy Joel song at the end.)",
						"bronzeResponse": "So you don't know cats very well. Big deal!",
						"silverResponse": "You know your Billy Joel!",
						"goldResponse": "I'm so so so so proud of you.",
						"url": "http://www.aol.com",
					    "questions": []
					};
				} else {
					console.log("Pull data from existing quiz!");
					$scope.data = data.data;
					console.log(data);
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