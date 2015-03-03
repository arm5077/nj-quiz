express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var decoder = new (require('string_decoder').StringDecoder)('utf-8');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

// Start up server
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("We're live at port " + port + ".");
});

// Set up static page (quiz screen)
app.use("/quiz", express.static(__dirname + '/public'));

// Set up static page (admin screen)
app.use("/admin", express.static(__dirname + '/admin'));

// Set up static page (data)
app.use("/data", express.static(__dirname + '/data'));

// Set up static page (embed library)
app.use("/embed", express.static(__dirname + '/public/embed.js'));

// Accept GET request for quiz slugs and return data
app.get("/slug/:slug", function(request, response){
	// Try to read file. If it's not there, create it.
	var s3 = new AWS.S3({params: {Bucket: 'nationaljournal', Key: 'quizzes'}});	
	s3.getObject({
		Key: "quizzes/data/" + request.params.slug + ".json",
	}, function(err, data){
		if(err){
			response.status(200).json({"status": "No quiz found!" });
		}
		else {
			response.status(200).json({"status": "Quiz already exists!", "data": JSON.parse(data.Body.toString()) });	
		}
	});
	
});

// Accept POST requests to add or edit quizzes
app.post("/slug/:slug", function(request, response){
	
	var s3 = new AWS.S3({params: {Bucket: 'nationaljournal', Key: 'quizzes'}});
	s3.upload({
		Key: "quizzes/data/" + request.params.slug + ".json",
		Body: request.body.json,
		ACL: "public-read",
	}, function(err, data){
		if( err )
			response.status(500).json({"status": "Error: " + err });
		else
			response.status(201).json({"status": "Quiz updated" });
	});

});