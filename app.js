var express = require('express');
var app = express();  //use express js module
var cors = require('cors');
var bodyParser = require('body-parser')

// Static files to not be parsed by Node
app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('port', process.env.PORT || 8080);  //sets port 8080

var apis = require('./api.js')(app);

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
