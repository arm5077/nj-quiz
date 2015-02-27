express = require("express");
var app = express();
var fs = require("fs");

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("We're live at port " + port + ".");
});

// Set up static page (quiz screen)
app.use("/quiz", express.static(__dirname + '/public'));

// Set up static page (quiz screen)
app.use("/admin", express.static(__dirname + '/admin'));



app.get("/slug/:slug", function(request, response){
	// Try to read file. If it's not there, create it.
	fs.readFile(__dirname + "/data/" + request.params.slug + ".json", {flag: "a+"}, function(err, data){
		if(err) throw err;
		
		if(data.length != 0)
			response.status(200).json({"status": "Quiz already exists!", "data": data });	
		else 
			response.status(200).json({"status": "Quiz created!" });
	});
});