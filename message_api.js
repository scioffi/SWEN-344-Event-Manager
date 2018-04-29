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
            res.status(400).send("Missing messageId parameter");
        } else if (isNaN(messageId) || (parseInt(messageId) <= 0)) {
            res.status(400).send("Invalid messageId");
        } else {
            db_utils.getMessageByUser(messageId, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result.length) {
                    res.send(JSON.stringify(result[0]));
                } else {
                    res.status(404).send("Message not found");
                }
            }); 
        }
    })

    app.get(API_PATH + '/getMessageByUser', (req, res) => {
        var userId = req.query.userId;
        if (db_utils.nullOrEmpty(userId)) {
            res.status(400).send("Missing userId parameter");
        } else if (isNaN(userId) || (parseInt(userId) <= 0)) {
            res.status(400).send("Invalid userId");
        } else {
            db_utils.getMessageByUser(userId, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result.length) {
                    res.send(JSON.stringify(result));
                } else {
                    res.status(404).send("Message not found");
                }
            }); 
        }
    })
	
	app.get(API_PATH + '/getMessages', (req, res) => {        
        db.query("SELECT ?? FROM ??", [SELECT_MESSAGE_COLUMNS, 'message'], function (err, results, fields) {
            if (err) {
                res.status(500).send(err);
            } else if (results.length) {
                res.send(JSON.stringify(results));
            } else {
                res.status(404).send("No message in database");
            }
        });
    })

    app.post(API_PATH + '/addMessage', (req, res) => {
        var eventId = req.body.eventId;	
        var fromUser = req.body.from_user;
        var toUser = req.body.to_user;
        var message = req.body.message;
        if (db_utils.nullOrEmpty(eventId)) {
            res.status(400).send("Missing eventId parameter");
        } else if (isNaN(eventId) || (parseInt(eventId) <= 0)) {
            res.status(400).send("Invalid eventId");
        } else if (db_utils.nullOrEmpty(fromUser)) {
            res.status(400).send("Missing fromUser parameter");
        } else if (isNaN(fromUser) || (parseInt(fromUser) <= 0)) {
            res.status(400).send("Invalid fromUser");
        } else if (db_utils.nullOrEmpty(toUser)) {
            res.status(400).send("Missing toUser parameter");
        } else if (isNaN(toUser) || (parseInt(toUser) <= 0)) {
            res.status(400).send("Invalid toUser");
        } else if (db_utils.nullOrEmpty(message)) {
            res.status(400).send("Missing message parameter");
        } else {
            db_utils.getUserById(fromUser, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result.length) {
                    db_utils.getUserById(toUser, function(err, result) {
                        if (err) {
                            res.status(500).send(err);
                        } else if (result.length) {
                            db_utils.getEventById(eventId, function(err, result) {
                                if (err) {
                                    res.status(500).send(err);
                                } else if (result.length) {
                                    var shared_time = new Date().getTime();
                                    var values = [fromUser , toUser, shared_time/1000, message, eventId];
                                    db.query("INSERT INTO ?? (??) VALUES (?)", ['message', INSERT_MESSAGE_COLUMNS, values], function (err, result, fields) {
                                        if (err) throw err;
                                        res.send({"id":result.insertId});
                                    });
                                } else {
                                    res.status(404).send("Event doesn't exist");
                                }
                            });                             
                        } else {
                            res.status(404).send("toUser doesn't exist");
                        }
                    });
                } else {       
                    res.status(404).send("fromUser doesn't exist");
                }
            });
        }
    })

    app.post(API_PATH + '/deleteMessage', (req, res) => {
        var messageId = req.body.messageId;
        if (db_utils.nullOrEmpty(messageId)) {
            res.status(400).send("Missing messageId parameter");
        } else if (isNaN(messageId) || (parseInt(messageId) <= 0)) {
            res.status(400).send("Invalid messageId");
        } else {
            getMessageById(messageId, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result) {   
                    db.query("DELETE FROM ?? WHERE message_id = ?", ['message', messageId], function (err, result, fields) {
                        if (err) {
                            res.status(500).send(err);
                        } else if (result.affectedRows) {
                            res.send("Successfully deleted message");                        
                        } else {
                            res.status(404).send("Message not found");
                        }
                    });
                } else {
                    res.status(404).send("User not found");
                }
            });
        }
    })
};
