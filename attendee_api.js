var axios = require("axios");
var bodyParser = require('body-parser');
var db = require('./db.js');
var db_utils = require('./db_utils');
const API_PATH = "/api";

const ATTENDEE_COLUMNS = ['user_id', 'event_id'];

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());

    app.get(API_PATH + '/getAttendee', (req, res) => {
        var attendeeId = req.query.attendeeId;
        if (db_utils.nullOrEmpty(attendeeId)) {
            res.status(400);
            res.send("Missing attendeeId parameter");
        } else {
            db_utils.getAttendeeById(attendeeId, function(err, result) {
                if (err) {
                    res.status(500)
                    res.send(err);
                } else if (result.length) {
                    res.send(JSON.stringify(result[0]));
                } else {
                    res.status(404)
                    res.send("attendee not found");
                }
            }); 
        }
    })
	
	app.get(API_PATH + '/getAttendees', (req, res) => {        
        db.query("SELECT ?? FROM ??", [ATTENDEE_COLUMNS, 'Attendee'], function (err, results, fields) {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (results.length) {
                res.send(JSON.stringify(results));
            } else {
                res.status(404);
                res.send("No attendee in database");
            }
        });
    })

    app.post(API_PATH + '/addAttendee', (req, res) => {
        var userId = req.body.userId;
		var eventId = req.body.eventId;		
        if (db_utils.nullOrEmpty(userId) || db_utils.nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            db_utils.getUserById(userId, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {
                    db_utils.getEventById(eventId, function(err, result) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else if (result.length) {
                            db_utils.getAttendeeByUserIdAndEventId(userId, eventId, function(err, result) {
                                if (err) {
                                    res.status(500);
                                    res.send(err);
                                } else if (result.length) {
                                    res.status(500);
                                    res.send("User already registered for this event");
                                } else {
                                    var values = [userId, eventId];
                                    db.query("INSERT INTO ?? (??) VALUES (?)", ['Attendee', ATTENDEE_COLUMNS, values], function (err, result, fields) {
                                        if (err) throw err;
                                        res.send({"id":result.insertId});
                                    });
                                }
                            });
                        } else {
                            res.status(404);
                            res.send("Event doesn't exist");
                        }
                    });
                } else {       
                    res.status(404);
                    res.send("User doesn't exist");
                }
            });
        }
    })

    app.post(API_PATH + '/deleteAttendee', (req, res) => {
        var attendeeId = req.body.attendeeId;
        if (db_utils.nullOrEmpty(attendeeId)) {
            res.status(400);
            res.send("Missing attendeeId parameter");
        } else {
            getAttendeeById(attendeeId, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result) {   
                    db.query("DELETE FROM ?? WHERE attendee_id = ?", ['Attendee', attendeeId], function (err, result, fields) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else if (result.affectedRows) {
                            res.send("successfully deleted attendee");                        
                        } else {
                            res.status(404);
                            res.send("Attendee not found");
                        }
                    });
                } else {
                    res.status(404);
                    res.send("User not found");
                }
            });
        }
    })
};
