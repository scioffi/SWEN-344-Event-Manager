var axios = require("axios");
var bodyParser = require('body-parser');
var db = require('./db.js');
var db_utils = require('./db_utils');
const API_PATH = "/api";

const INSERT_MESSAGE_COLUMNS = ['from_user', 'to_user', 'shared_time', 'message', 'event_id'];
const SELECT_MESSAGE_COLUMNS = ['message_id','from_user', 'to_user', 'shared_time', 'message', 'event_id'];

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());

    app.get(API_PATH + '/getMessage', (req, res) => {
        var messageId = req.query.messageId;
        if (db_utils.nullOrEmpty(messageId)) {
            res.status(400);
            res.send("Missing messageId parameter");
        } else if (isNaN(messageId) || (parseInt(messageId) <= 0)) {
            res.status(400);
            res.send("Invalid messageId");
        } else {
            db_utils.getMessageById(messageId, function(err, result) {
                if (err) {
                    res.status(500)
                    res.send(err);
                } else if (result.length) {
                    res.send(JSON.stringify(result[0]));
                } else {
                    res.status(404)
                    res.send("Message not found");
                }
            }); 
        }
    })
	
	app.get(API_PATH + '/getMessages', (req, res) => {        
        db.query("SELECT ?? FROM ??", [SELECT_MESSAGE_COLUMNS, 'Message'], function (err, results, fields) {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (results.length) {
                res.send(JSON.stringify(results));
            } else {
                res.status(404);
                res.send("No message in database");
            }
        });
    })

    app.post(API_PATH + '/addMessage', (req, res) => {
        var eventId = req.body.eventId;	
        var fromUser = req.body.from_user;
        var toUser = req.body.to_user;
        var sharedTime = req.body.shared_time;
        var message = req.body.message;
        if (db_utils.nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else if (isNaN(eventId) || (parseInt(eventId) <= 0)) {
            res.status(400);
            res.send("Invalid eventId");
        } else if (db_utils.nullOrEmpty(fromUser)) {
            res.status(400);
            res.send("Missing fromUser parameter");
        } else if (isNaN(fromUser) || (parseInt(fromUser) <= 0)) {
            res.status(400);
            res.send("Invalid fromUser");
        } else if (db_utils.nullOrEmpty(toUser)) {
            res.status(400);
            res.send("Missing toUser parameter");
        } else if (isNaN(toUser) || (parseInt(toUser) <= 0)) {
            res.status(400);
            res.send("Invalid toUser");
        } else if (db_utils.nullOrEmpty(sharedTime)) {
            res.status(400);
            res.send("Missing sharedTime parameter");
        } else if (!db_utils.validateTimestamp(sharedTime)) {
            res.status(400);
            res.send("Invalid shared_time");
        }else if (db_utils.nullOrEmpty(message)) {
            res.status(400);
            res.send("Missing message parameter");
        } else {
            db_utils.getUserById(fromUser, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {
                    db_utils.getUserById(toUser, function(err, result) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else if (result.length) {
                            db_utils.getEventById(eventId, function(err, result) {
                                if (err) {
                                    res.status(500)
                                    res.send(err);
                                } else if (result.length) {
                                    var values = [fromUser , toUser, sharedTime, message, eventId];
                                    db.query("INSERT INTO ?? (??) VALUES (?)", ['Message', INSERT_MESSAGE_COLUMNS, values], function (err, result, fields) {
                                        if (err) throw err;
                                        res.send({"id":result.insertId});
                                    });
                                } else {
                                    res.status(404)
                                    res.send("Event doesn't exist");
                                }
                            });                             
                        } else {
                            res.status(404);
                            res.send("toUser doesn't exist");
                        }
                    });
                } else {       
                    res.status(404);
                    res.send("fromUser doesn't exist");
                }
            });
        }
    })

    app.post(API_PATH + '/deleteMessage', (req, res) => {
        var messageId = req.body.messageId;
        if (db_utils.nullOrEmpty(messageId)) {
            res.status(400);
            res.send("Missing messageId parameter");
        } else if (isNaN(messageId) || (parseInt(messageId) <= 0)) {
            res.status(400);
            res.send("Invalid messageId");
        } else {
            getMessageById(messageId, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result) {   
                    db.query("DELETE FROM ?? WHERE message_id = ?", ['Message', messageId], function (err, result, fields) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else if (result.affectedRows) {
                            res.send("Successfully deleted message");                        
                        } else {
                            res.status(404);
                            res.send("Message not found");
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
