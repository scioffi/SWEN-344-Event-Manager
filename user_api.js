var axios = require("axios");
var bodyParser = require('body-parser');
var db = require('./db.js');
var db_utils = require('./db_utils');

const API_PATH = "/api";
const USER_COLUMNS = ['username', 'email', 'first_name', 'last_name', 'permission'];

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());

    app.get(API_PATH + '/getUser', (req, res) => {
        var userId = req.query.userId;
        if (db_utils.nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing userId parameter");
        } else {
            db_utils.getUserById(userId, function(err, result) {
                if (err) {
                    res.status(500)
                    res.send(err);
                } else if (result.length) {
                    res.send(JSON.stringify(result[0]));
                } else {
                    res.status(404)
                    res.send("user not found");
                }
            });            
        }
    });
	
	app.get(API_PATH + '/getUsers', (req, res) => {    
        db.query("SELECT ?? FROM ??", [USER_COLUMNS, 'User'], function (err, results, fields) {
            if (err) {
                res.status(500);
                res.send(err);
            } else if (results.length) {
                res.send(JSON.stringify(results));
            } else {
                res.status(404);
                res.send("No user in database");
            }
        });
    });
	
	app.post(API_PATH + '/createUser', (req, res) => {
        var username = req.body.username;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var email = req.body.email;
        var permission = req.body.permission;
        if (db_utils.nullOrEmpty(username) || db_utils.nullOrEmpty(first_name) || db_utils.nullOrEmpty(last_name) || db_utils.nullOrEmpty(email)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            if (!permission) {
                permission = "user";
            }
            db_utils.getUserByUsername(username, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {
                    res.status(400);
                    res.send("Duplicate username");
                } else {
                    // there is a problem with preparing insert query statement like select queries
                    // due to email gets split in half by '.'       `abc1002@rit.edu` -> `abc1002@rit`.`edu`
                    // TODO: figure out a way to keep email intact
                    let sql = "INSERT INTO `User` (`username`, `email`, `first_name`, `last_name`, `permission`) VALUES ('" + 
                                    username + "', '" + email + "', '" + first_name + "', '" + last_name + "', '" + permission + "')";
                    db.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        res.send({"id":result.insertId});
                    });
                }
            });
        }
    });

    app.post(API_PATH + '/editUser', (req, res) => {
        var userId = req.body.userId;
        var username = req.body.username;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var email = req.body.email;
        var permission = req.body.permission;
        if (db_utils.nullOrEmpty(userId) || db_utils.nullOrEmpty(username) || db_utils.nullOrEmpty(first_name) || db_utils.nullOrEmpty(last_name) || db_utils.nullOrEmpty(email)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            db_utils.getUserById(userId, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {                    
                    // similar problem to insert query
                    // TODO: figure out a way to keep email intact
                    let sql = "UPDATE `User` SET `username` = '" + username + "', `email` =  '" + email + "', `first_name` = '" + first_name + 
                                    "', `last_name` = '" + last_name + "', `permission` = '" + permission + "' WHERE `user_id` = '" +userId + "'";
                    db.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        res.send({"id":userId});
                    });
                } else {
                    res.status(404);
                    res.send("User not found");
                }
            });
        }
    });

    app.post(API_PATH + '/deleteUser', (req, res) => {
        var userId = req.body.userId;
        if (db_utils.nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing userId parameter");
        } else {
            db_utils.getUserById(userId, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result) {   
                    db.query("DELETE FROM ?? WHERE user_id = ?", ['User', userId], function (err, result, fields) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else if (result.affectedRows) {
                            res.send("successfully deleted user");                        
                        } else {
                            res.status(404);
                            res.send("User not found");
                        }
                    });
                } else {
                    res.status(404);
                    res.send("User not found");
                }
            });
        }
    });
};
