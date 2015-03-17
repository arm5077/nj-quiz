// Requires jQuery.

console.log("Embedded scripts running ...");

var pymParent = new pym.Parent('pym', "http://nj-quiz.herokuapp.com/quiz/?id=DChistory", {});

resize();
$(window).resize(resize);


function resize(){
	if( $(window).width() > 1120 ){
		$("#pym").css({
			"width": "180%",
			"margin-left": "-40%"
		});
	}
	else {
		$("#pym").css({
			"width": "",
			"margin-left": ""
		});
	}
}
