// Requires jQuery.

console.log("Embedded scripts running ...");

var pymParent = new pym.Parent('pym', document.getElementById('pym').className, {});

resize();
$(window).resize(resize);
setInterval(resize, 1000);

function resize(){
	if( $(window).width() > 1120 ){
		$("#pym").css({
			"width": "115%",
			"margin-left": "-7%"
		});
	}
	else {
		$("#pym").css({
			"width": "",
			"margin-left": ""
		});
	}
}
