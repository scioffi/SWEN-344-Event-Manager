
var express = require('express');
var app = express();  //use express js module

// Static files to not be parsed by Node
app.use('/files', express.static(__dirname + '/files'));

//add handlebars view engine
var handlebars = require('express3-handlebars')
	.create({defaultLayout: 'main'});  //default handlebars layout page

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); //sets express view engine to handlebars


app.set('port', process.env.PORT || 8080);  //sets port 8080

app.get('/', function(req,res){ 
	res.render('index');  //respond with homepage
});

app.use(function(req,res){  //express catch middleware if page doesn't exist
	res.status(404);  //respond with status code
	res.render('404'); //respond with 404 page
});

app.listen(app.get('port'), function(){ //start express server
	console.log( 'Express Server Started on http://localhost:8080');
});

var mysql = require('mysql'); // use MySQL for our database

// MySQL default authentication/configuration
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
    database: "EventManagement"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // Still need to add columns Start Date, End Date, Creation Date, and Price. (consider moment.js for dates)
    var sql = "CREATE TABLE Events (id INT AUTO_INCREMENT PRIMARY KEY, HashTag VARCHAR(255), Name VARCHAR(255), Description VARCHAR(255), Creator VARCHAR(255), Location VARCHAR(255))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Event Table Created!");
    });
});