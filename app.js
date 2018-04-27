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

var user_api = require('./user_api.js')(app);
var attendee_api = require('./attendee_api.js')(app);
var attendee_api = require('./order_api.js')(app);
var attendee_api = require('./event_api.js')(app);
var message_api = require('./message_api.js')(app);

app.listen(app.get('port'), function(){ //start express server
	console.log( 'Express Server Started on http://localhost:8080');
});

module.exports = app;
