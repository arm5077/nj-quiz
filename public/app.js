app = angular.module("quizApp", []);


app.controller("quizController", ["$scope", "$http", "$sce", function($scope, $http, $sce){
	
	$scope.renderHTML = function(text){ return $sce.trustAsHtml(text); };
	$scope.score = 0;
	$scope.total = 0;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	 	$scope.mobile = true;
	}
	
	// Get quiz data
	$http.get("https://s3-us-west-2.amazonaws.com/nationaljournal/quizzes/data/" + getParameterByName("id") + ".json")
		.error(function(error){
			console.log("Hit an error! Here it is: " + error);
		})
		.success(function(response){
			$scope.data = response;
		});
	
	$scope.evaluateAnswer = function(answer, question, index){
		if( !question.answered ){
			question.answered = true;
			answer.picked = true;
			if( answer.correct == true ) {
				answer.right = true;
				question.correct = true;
				$scope.score++;
			}
			else {
				answer.right = false;
				question.correct = false;
			}
			question.response = "<strong>" + answer.messageTitle + "</strong> " + answer.message;
			$scope.total ++;
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

app.directive('waypoint', function(){
	return {
		link: function(scope, element, attributes){

			var waypoint = new Waypoint({
				element: element[0],
				handler: function(direction) {
					if( direction == "down") 
		    			scope.$parent.current = parseInt(attributes.index);						
					else 
						scope.$parent.current = parseInt(attributes.index) - 1;						
					scope.$parent.$apply();
		  		},
				offset:"20%"
			});

			setInterval(function(){
				Waypoint.refreshAll();
			},1000);



		}
	}

});

// Taken with thanks from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
