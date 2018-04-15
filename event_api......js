var axios = require("axios");
var bodyParser = require('body-parser');
var db = require('./db.js');

const API_PATH = "/api";
			 
var events = [{"eventId" : 1, "title" : "RIT Spring Fest", "description" : "RIT annual event", "creationDate" : "1520295410", "start_time" : "1523523600", "end_time" : "1523541600", "author" : "Chris Vuong", "location" : "RIT campus", "price" : 0, "hashtag" : "RITSpringFest", "status" : "open"},
			  {"eventId" : 2, "title" : "Trip to the Planetarium", "description" : "RIT daily event", "creationDate" : "1520295000", "start_time" : "1523523600", "end_time" : "1523541600", "author" : "Chris Vuong", "location" : "RIT campus", "price" : 25, "hashtag" : "StevesBirthday", "status" : "open"}]

var EVENT_COLUMNS = ['title', 'description', 'status', 'start_date', 'end_date', 'creation_date', 'hashtag', 'price', 'author', 'location'];

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());

    app.get(API_PATH + '/getEvent', (req, res) => {
        var eventId = req.query.eventId;
        if (nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            db.query("SELECT ?? FROM ?? WHERE event_id = ?", [EVENT_COLUMNS, 'Event', eventId], function (err, result, fields) {
                if (err) throw err;
                if (result.length) {
                    res.send(JSON.stringify(result[0]));
                } else {
                    res.status(404);
                    res.send("event not found");
                }
            });
        }
    })
	
	app.get(API_PATH + '/getEvents', (req, res) => {        
        db.query("SELECT ?? FROM ??", [EVENT_COLUMNS, 'Event'], function (err, results, fields) {
            if (err) throw err;
            if (results.length) {
                res.send(JSON.stringify(results));
            } else {
                res.status(404)
                res.send("No event in database");
            }
        });
    })

    app.post(API_PATH + '/createEvent', (req, res) => {
        var title = req.body.title;
        var description = req.body.description;
		var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var author = "Betty White" // TODO: Get from user login.
        var location = req.body.location;
        var price = req.body.price;
        var hashtag = req.body.tag;
        var image = req.body.image;
		
        if (nullOrEmpty(title) || nullOrEmpty(start_time) || nullOrEmpty(end_time) || nullOrEmpty(author) || nullOrEmpty(location) || nullOrEmpty(price) || nullOrEmpty(hashtag) || nullOrEmpty(description)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully created event");
        }
    })

    app.post(API_PATH + '/editEvent', (req, res) => {
        var eventId = req.body.eventId;
        var title = req.body.title;
        var description = req.body.description;
		var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var author = "Betty White"; // TODO: Get from user login
        var location = req.body.location;
        var price = req.body.price;
        var hashtag = req.body.hashtag;
        var description = req.body.description;
        var image = req.body.image;
		
        if (nullOrEmpty(eventId) || nullOrEmpty(title) || nullOrEmpty(start_time) || nullOrEmpty(end_time) || nullOrEmpty(author) || nullOrEmpty(location) || nullOrEmpty(price) || nullOrEmpty(hashtag) || nullOrEmpty(description)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully edited event");
        }
    })

    app.post(API_PATH + '/deleteEvent', (req, res) => {
        var eventId = req.body.eventId;
        if (nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            res.send("Successfully deleted event");
        }
    })

    app.post(API_PATH + '/expireEvent', (req, res) => {
        var eventId = req.body.eventId;
        if (nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            res.send("Successfully expired event");
        }
    })
};

function nullOrEmpty(value) {
	if (value == null || value === '') {
		return true;
	}
	return false;
}
