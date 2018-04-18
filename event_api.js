var axios = require("axios");
var bodyParser = require('body-parser');
var db = require('./db.js');
var db_utils = require('./db_utils.js');
const API_PATH = "/api";
			 
const EVENT_COLUMNS = ['title', 'description','author','location','status','price','start_date','end_date','creation_date','hashtag'];

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());

    app.get(API_PATH + '/getEvent', (req, res) => {
        var eventId = req.query.eventId;
        if (db_utils.nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            db_utils.getEventById(eventId, function(err, result) {
                if (err) {
                    res.status(500)
                    res.send(err);
                } else if (result.length) {
                    res.send(JSON.stringify(result[0]));
                } else {
                    res.status(404)
                    res.send("event not found");
                }
            }); 
        }
    })
	
	app.get(API_PATH + '/getEvents', (req, res) => {        
        db.query("SELECT ?? FROM ??", [EVENT_COLUMNS, 'Event'], function (err, results, fields) {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (results.length) {
                res.send(JSON.stringify(results));
            } else {
                res.status(404);
                res.send("No event in database");
            }
        });
    })

    app.post(API_PATH + '/createEvent', (req, res) => {
        var title = req.body.title;
        var description = req.body.description;
		var start_date = req.body.start_date;
        var end_date = req.body.end_date;
        var author = req.body.author
        var location = req.body.location;
        var price = req.body.price;
        var hashtag = req.body.hashtag;
        var creation_date = req.body.creation_date;
        var status = req.body.status;
		
        if (db_utils.nullOrEmpty(title) || db_utils.nullOrEmpty(status) || db_utils.nullOrEmpty(start_date) || db_utils.nullOrEmpty(end_date) || db_utils.nullOrEmpty(author) || db_utils.nullOrEmpty(location) || db_utils.nullOrEmpty(price) || db_utils.nullOrEmpty(hashtag) || db_utils.nullOrEmpty(description) || db_utils.nullOrEmpty(creation_date)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            db_utils.getUserById(author, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {
                    db_utils.getEventByTitle(title, function(err, result) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else if (result.length) {
                            res.status(400);
                            res.send("Duplicate event");
                        } else {
                            // notes: start_date, end_date and creation_date must be in mysql datetime format
                            // this is different from the returned result from node.js mysql because the result
                            // is in iso date format
                            var values = [title, description, author, location, status, price, start_date, end_date, creation_date, hashtag];
                            db.query("INSERT INTO ?? (??) VALUES (?)",['Event', EVENT_COLUMNS, values] , function (err, result, fields) {
                                if (err) throw err;
                                    res.send({"id":result.insertId});
                                });
                        }
                    });
                    
                } else {       
                    res.status(404);
                    res.send("User doesn't exist");
                }
            });
        }
    })

    app.post(API_PATH + '/editEvent', (req, res) => {
        var eventId = req.body.eventId;
        var title = req.body.title;
        var description = req.body.description;
		var start_date = req.body.start_date;
        var end_date = req.body.end_date;
        var author = req.body.userId
        var location = req.body.location;
        var price = req.body.price;
        var hashtag = req.body.hashtag;
        var creation_date = req.body.creation_date;
		
        if (db_utils.nullOrEmpty(eventId) || db_utils.nullOrEmpty(title) || db_utils.nullOrEmpty(start_date) || db_utils.nullOrEmpty(end_date) || db_utils.nullOrEmpty(author) || db_utils.nullOrEmpty(location) || db_utils.nullOrEmpty(price) || db_utils.nullOrEmpty(hashtag) || db_utils.nullOrEmpty(description) || db_utils.nullOrEmpty(creation_date)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully edited event");
        }
    })

    app.post(API_PATH + '/deleteEvent', (req, res) => {
        var eventId = req.body.eventId;
        if (db_utils.nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            db_utils.getEventById(eventId, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result) {   
                    db.query("DELETE FROM ?? WHERE event_id = ?", ['Event', eventId], function (err, result, fields) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else if (result.affectedRows) {
                            res.send("successfully deleted event");                        
                        } else {
                            res.status(404);
                            res.send("Event not found");
                        }
                    });
                } else {
                    res.status(404);
                    res.send("Event not found");
                }
            });
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
