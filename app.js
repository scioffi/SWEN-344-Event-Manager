var express = require('express');
var app = express();  //use express js module
var moment = require('moment');
var cors = require('cors');

// Static files to not be parsed by Node
app.use('/files', express.static(__dirname + '/files'));
app.use(cors());

//add handlebars view engine
var handlebars = require('express3-handlebars')
	.create({defaultLayout: 'main'});  //default handlebars layout page

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); //sets express view engine to handlebars


app.set('port', process.env.PORT || 8080);  //sets port 8080

var apis = require('./backend-routing.js')(app);

app.use(function(req,res){  //express catch middleware if page doesn't exist
	res.status(404);  //respond with status code
	res.render('404'); //respond with 404 page
});

app.listen(app.get('port'), function(){ //start express server
	console.log( 'Express Server Started on http://localhost:8080');
});

var mysql = require('mysql'); // use MySQL for our database

// connect to the mysql server on the vm
var con = mysql.createConnection({
    host: "webeng.stephencioffi.com",
    user: "events",
    password: "dANiScOOL",
    database: "EventManagement"
});

// begin making queries
con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
    con.query("INSERT INTO User (username, first_name, last_name, email) VALUES ('dankrutz344', 'Dan', 'Krutz', 'daniscool@inyourdreams.com')", function (err, result) {
        if (err) throw err;
        console.log("Dan Krutz record inserted into User Table!");
    });
    con.query("SELECT * FROM User", function (err, result, fields) {
        if (err) throw err;
        console.log("With Krutz Added:");
        console.log(result);
    });
    con.query("DELETE FROM User WHERE username = 'dankrutz344'", function (err, result) {
        if (err) throw err;
        console.log("Dan Krutz record deleted from User Table!");
    });
    con.query("SELECT * FROM User", function (err, result, fields) {
        if (err) throw err;
        console.log("With Krutz Deleted:");
        console.log(result);
    });
});