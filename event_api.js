var axios = require("axios");
var bodyParser = require('body-parser');
var db = require('./db.js');
var db_utils = require('./db_utils.js');
const API_PATH = "/api";
			 
const INSERT_EVENT_COLUMNS = ['title', 'description','author','location','status','price','start_date','end_date','creation_date','hashtag','image'];
const SELECT_EVENT_COLUMNS = ['event_id', 'title', 'description','author','location','status','price','start_date','end_date','creation_date','hashtag','image'];
const EVENT_STATUSES = ['open', 'expired', 'canceled'];

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());

    app.get(API_PATH + '/getEvent', (req, res) => {
        var eventId = req.query.eventId;
        if (db_utils.nullOrEmpty(eventId)) {
            res.status(400).send("Missing eventId parameter");
        } else if (isNaN(eventId) || (parseInt(eventId) <= 0)) {
            res.status(400).send("Invalid eventId");
        } else {
            db_utils.getEventById(eventId, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result.length) {
                    res.send(JSON.stringify(result[0]));
                } else {
                    res.status(404).send("Event not found");
                }
            }); 
        }
    })
	
	app.get(API_PATH + '/getEvents', (req, res) => {        
        db.query("SELECT ?? FROM ??", [SELECT_EVENT_COLUMNS, 'event'], function (err, results, fields) {
            if (err) {
                res.status(500).send(err);
            } else if (results.length) {
                res.send(JSON.stringify(results));
            } else {
                res.status(404).send("No event in database");
            }
        });
    })

    app.post(API_PATH + '/createEvent', (req, res) => {
        var title = req.body.title;
        var description = req.body.description;
		var start_date = req.body.start_date;
        var end_date = req.body.end_date;
        var author = req.body.author;
        var location = req.body.location;
        var price = req.body.price;
        var hashtag = req.body.hashtag;
        var creation_date = req.body.creation_date;
        var image = req.body.image;
        var status = "open";
		
        if (db_utils.nullOrEmpty(title)) {
            res.status(400).send("Missing title parameter");
        } else if (db_utils.nullOrEmpty(description)) {
            res.status(400).send("Missing description parameter");
        } else if (db_utils.nullOrEmpty(start_date)) {
            res.status(400).send("Missing start_date parameter");
        } else if (db_utils.nullOrEmpty(end_date)) {
            res.status(400).send("Missing end_date parameter");
        } else if (db_utils.nullOrEmpty(author)) {
            res.status(400).send("Missing author parameter");
        } else if (db_utils.nullOrEmpty(location)) {
            res.status(400).send("Missing location parameter");
        } else if (db_utils.nullOrEmpty(price)) {
            res.status(400).send("Missing price parameter");
        } else if (db_utils.nullOrEmpty(hashtag)) {
            res.status(400).send("Missing hashtag parameter");
        } else if (db_utils.nullOrEmpty(creation_date)) {
            res.status(400).send("Missing creation_date parameter");
        } else {
            if (isNaN(author) || (parseInt(author) <= 0)) {
                res.status(400).send("Invalid author id");
            }
            if (isNaN(price) || (parseInt(price) < 0)) {
                res.status(400).send("Invalid price value");
            }
            if (EVENT_STATUSES.indexOf(status) <= -1) {
                res.status(400).send("Invalid event status");                
            }
            if (!db_utils.validateTimestamp(parseInt(start_date))) {
                res.status(400).send("Invalid start_date");
            }
            if (!db_utils.validateTimestamp(parseInt(end_date))) {
                res.status(400).send("Invalid end_date");
            }
            if (!db_utils.validateTimestamp(parseInt(creation_date))) {
                res.status(400).send("Invalid creation_date");
            }
            db_utils.getUserById(author, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result.length) {
                    if (result[0].permission === "admin") {
                        db_utils.getEventByTitle(title, function(err, result) {
                            if (err) {
                                res.status(500).send(err);
                            } else if (result.length) {
                                res.status(400).send("Duplicate event");
                            } else {
                                // notes: start_date, end_date and creation_date must be in mysql datetime format
                                // this is different from the returned result from node.js mysql because the result
                                // is in iso date format
                                var values = [title, description, author, location, status, price, parseInt(start_date), parseInt(end_date), parseInt(creation_date), hashtag, image];
                                db.query("INSERT INTO ?? (??) VALUES (?)",['event', INSERT_EVENT_COLUMNS, values] , function (err, result, fields) {
                                    if (err) throw err;
                                    res.send({"id":result.insertId});
                                });
                            }
                        });
                    } else {
                        res.status(500).send("User doesn't have permission to create event");
                    }              
                } else {       
                    res.status(404).send("User doesn't exist");
                }
            });
        }
    })

    app.post(API_PATH + '/editEvent', (req, res) => {
        var eventId = req.body.eventId;
        var status = req.body.status;
        var title = req.body.title;
        var description = req.body.description;
		var start_date = req.body.start_date;
        var end_date = req.body.end_date;
        var author = req.body.author
        var location = req.body.location;
        var price = req.body.price;
        var hashtag = req.body.hashtag;
        var image = req.body.image;
		if (db_utils.nullOrEmpty(eventId)) {
            res.status(400).send("Missing eventId parameter");
        } else if (db_utils.nullOrEmpty(title)) {
            res.status(400).send("Missing title parameter");
        } else if (db_utils.nullOrEmpty(description)) {
            res.status(400).send("Missing description parameter");
        } else if (db_utils.nullOrEmpty(parseInt(start_date))) {
            res.status(400).send("Missing start_date parameter");
        } else if (db_utils.nullOrEmpty(parseInt(end_date))) {
            res.status(400).send("Missing end_date parameter");
        } else if (db_utils.nullOrEmpty(author)) {
            res.status(400).send("Missing author parameter");
        } else if (db_utils.nullOrEmpty(location)) {
            res.status(400).send("Missing location parameter");
        } else if (db_utils.nullOrEmpty(price)) {
            res.status(400).send("Missing price parameter");
        } else if (db_utils.nullOrEmpty(hashtag)) {
            res.status(400).send("Missing hashtag parameter");
        } else if (db_utils.nullOrEmpty(status)) {
            res.status(400).send("Missing status parameter");
        } else {
            if (isNaN(eventId) || (parseInt(eventId) <= 0)) {
                res.status(400).send("Invalid eventId");
            }
            if (isNaN(author) || (parseInt(author) <= 0)) {
                res.status(400).send("Invalid author id");
            }
            if (isNaN(price) || (parseInt(price) < 0)) {
                res.status(400).send("Invalid price value");
            }
            if (EVENT_STATUSES.indexOf(status) <= -1) {
                res.status(400).send("Invalid event status");                
            }
            if (!db_utils.validateTimestamp(parseInt(start_date))) {
                res.status(400).send("Invalid start_date");
            }
            if (!db_utils.validateTimestamp(parseInt(end_date))) {
                res.status(400).send("Invalid end_date");
            }
            db_utils.getEventById(eventId, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result.length) {
                    db.query("UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE `event_id` = ?",['event', 'title', title, 'description', description, 'status', status,
                                'location', location, 'price', price, 'hashtag', hashtag, 'start_date', parseInt(start_date), 'end_date', parseInt(end_date), 'image', image, eventId] , function (err, result, fields) {
                        if (err) {
                            res.status(500).send(err);
                        } else if (result.affectedRows) {
                            res.status(200).send("Successfully edited event");
                        } else {
                            res.status(404).send("Event not found");
                        }
                    });
                } else {                    
                    res.status(404).send("Event not found");
                }
            });
        }
    })

    app.post(API_PATH + '/cancelEvent', (req, res) => {
        var eventId = req.body.eventId;
        if (db_utils.nullOrEmpty(eventId)) {
            res.status(400).send("Missing eventId parameter");
        } else if (isNaN(eventId) || (parseInt(eventId) <= 0)) {
            res.status(400).send("Invalid eventId");
        } else {
            db_utils.getEventById(eventId, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result) {   
                    db.query("UPDATE ?? SET ?? = ? WHERE event_id = ?", ['event', 'status', 'canceled', eventId], function (err, result, fields) {
                        if (err) {
                            res.status(500).send(err);
                        } else if (result.affectedRows) {
                            res.status(200).send("Successfully canceled event");                        
                        } else {
                            res.status(404).send("Event not found");
                        }
                    });
                } else {
                    res.status(404).send("Event not found");
                }
            });
        }
    })

    app.post(API_PATH + '/expireEvent', (req, res) => {
        var eventId = req.body.eventId;
        if (db_utils.nullOrEmpty(eventId)) {
            res.status(400).send("Missing eventId parameter");
        } else if (isNaN(eventId) || (parseInt(eventId) <= 0)) {
            res.status(400).send("Invalid eventId");
        } else {
            db_utils.getEventById(eventId, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result.length) {
                    db.query("UPDATE ?? SET ?? = ? WHERE `event_id` = ?",['event', 'status', 'expired', eventId] , function (err, result, fields) {
                        if (err) {
                            res.status(500).send(err);
                        } else if (result.affectedRows) {
                            res.status(200).send("successfully expired event");                        
                        } else {
                            res.status(404).send("Event not found");
                        }
                    });
                } else {                    
                    res.status(404).send("Event not found");
                }
            });
        }
    })
};
