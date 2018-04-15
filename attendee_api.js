var axios = require("axios");
var bodyParser = require('body-parser');
var db = require('./db.js');

const API_PATH = "/api";

var attendees = [{"name" : "John Doe", "eventId" : 1},
				 {"name" : "Dan Krutz", "eventId" : 2}]

var ATTENDEE_COLUMNS = ['user_id', 'event_id'];

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());

    app.get(API_PATH + '/getAttendee', (req, res) => {
        var eventId = req.query.eventId;
        if (nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            res.send(attendees[0])
        }
    })
	
	app.get(API_PATH + '/getAttendees', (req, res) => {        
            res.send(attendees);
    })

    app.post(API_PATH + '/addAttendee', (req, res) => {
        var userId = req.body.userId;
		var name = req.body.name;
		
        if (nullOrEmpty(userId) || nullOrEmpty(name)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully added attendee");
        }
    })

    app.post(API_PATH + '/deleteAttendee', (req, res) => {
        var userId = req.body.userId;
        if (nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing userId parameter");
        } else {
            res.send("Successfully deleted attendee");
        }
    })
};

function nullOrEmpty(value) {
	if (value == null || value === '') {
		return true;
	}
	return false;
}
