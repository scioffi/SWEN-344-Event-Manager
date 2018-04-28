var axios = require("axios");
var bodyParser = require('body-parser');
var db = require('./db.js');
var db_utils = require('./db_utils');

const API_PATH = "/api";
const INSERT_USER_COLUMNS = ['email', 'first_name', 'last_name', 'permission'];
const SELECT_USER_COLUMNS = ['user_id', 'email', 'first_name', 'last_name', 'permission'];
const USER_PERMISSIONS = ['admin', 'user'];

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());

    app.get(API_PATH + '/getUser', (req, res) => {
        var userId = req.query.userId;
        if (db_utils.nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing userId parameter");
        } else if (isNaN(userId) || (parseInt(userId) <= 0)) {
            res.status(400);
            res.send("Invalid userId");
        } else {
            db_utils.getUserById(userId, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {
                    res.send(JSON.stringify(result[0]));
                } else {
                    res.status(404);
                    res.send("User not found");
                }
            });            
        }
    });

    app.get(API_PATH + '/checkUserExists', (req, res) => {
        var email = req.query.email;
        if (db_utils.nullOrEmpty(email)) {
            res.status(400);
            res.send("Missing email parameter");
        } else if (db_utils.validateEmail(email)) {
            res.status(400);
            res.send("Invalid email");
        } else {
            db_utils.getUserByEmail(email, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {
                    res.send(JSON.stringify(result[0]));
                } else {
                    res.status(404);
                    res.send("User not found");
                }
            });            
        }
    });
	
	app.get(API_PATH + '/getUsers', (req, res) => {    
        db.query("SELECT ?? FROM ??", [SELECT_USER_COLUMNS, 'User'], function (err, results, fields) {
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

    app.post(API_PATH + '/initial_login', (req, res) => {
        var email = req.body.email;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;       
        if (db_utils.nullOrEmpty(first_name)) {
            res.status(400);
            res.send("Missing firstname parameter");
        } else if (db_utils.nullOrEmpty(last_name)) {
            res.status(400);
            res.send("Missing lastname parameter");
        } else if (db_utils.nullOrEmpty(email)) {
            res.status(400);
            res.send("Missing email parameter");
        } else if (!db_utils.validateEmail(email)) {
            res.status(400);
            res.send("Invalid email format");
        } else {
            db.query("SELECT `user_id`, `permission` FROM `User` WHERE email = '" + email + "'", function (err, result, fields) {
                console.log(this.sql);
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {
                    res.send(result[0]);
                } else {
                    let sql = "INSERT INTO `User` (`email`, `first_name`, `last_name`, `permission`) VALUES ('" + email + "', '" + first_name + "', '" + last_name + "', 'user')";
                    db.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        db_utils.getUserById(result.insertId, function(err, result) {
                            if (err) {
                                res.status(500);
                                res.send(err);
                            } else if (result.length) {
                                res.send(JSON.stringify(result[0]));
                            } else {
                                res.status(404)
                                res.send("User not found");
                            }
                        });
                    });
                }
            });           
        }
    });
	
	app.post(API_PATH + '/createUser', (req, res) => {
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var email = req.body.email;
        var permission = req.body.permission;
        if (userId == null) {
            res.status(400);
            res.send("Missing userId parameter");
        } else if (db_utils.nullOrEmpty(first_name)) {
            res.status(400);
            res.send("Missing firstname parameter");
        } else if (db_utils.nullOrEmpty(last_name)) {
            res.status(400);
            res.send("Missing lastname parameter");
        } else if (db_utils.nullOrEmpty(email)) {
            res.status(400);
            res.send("Missing email parameter");
        } else {
            if (isNaN(userId) || (parseInt(userId) <= 0)) {
                res.status(400);
                res.send("Invalid userId");
            }
            if (!db_utils.validateEmail(email)) {
                res.status(400);
                res.send("Invalid email format");
            }
            // By default, create user with user permission level
            if (db_utils.nullOrEmpty(permission)) {
                permission = "user";
            } else if (USER_PERMISSIONS.indexOf(permission) <= -1) {
                res.status(400);
                res.send("Invalid user permission level");                
            }
            db_utils.getUserByEmail(email, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {
                    res.status(400);
                    res.send("Duplicate email");
                } else {
                    // there is a problem with preparing insert query statement like select queries
                    // due to email gets split in half by '.'       `abc1002@rit.edu` -> `abc1002@rit`.`edu`
                    // TODO: figure out a way to keep email intact
                    let sql = "INSERT INTO `User` (`email`, `first_name`, `last_name`, `permission`) VALUES ('" + email + "', '" + first_name + "', '" + last_name + "', '" + permission + "')";
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
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var email = req.body.email;
        var permission = req.body.permission;
        if (userId == null) {
            res.status(400);
            res.send("Missing userId parameter");
        } else if (userId === "") {
            res.status(500);
            res.send("User has already logged out");
        } else if (db_utils.nullOrEmpty(first_name)) {
            res.status(400);
            res.send("Missing firstname parameter");
        } else if (db_utils.nullOrEmpty(last_name)) {
            res.status(400);
            res.send("Missing lastname parameter");
        } else if (db_utils.nullOrEmpty(email)) {
            res.status(400);
            res.send("Missing email parameter");
        } else if (db_utils.nullOrEmpty(permission)) {
            res.status(400);
            res.send("Missing permission parameter");
        } else {
            if (isNaN(userId) || (parseInt(userId) <= 0)) {
                res.status(400);
                res.send("Invalid userId");
            }
            if (!db_utils.validateEmail(email)) {
                res.status(400);
                res.send("Invalid email format");
            }
            if (USER_PERMISSIONS.indexOf(permission) <= -1) {
                res.status(400);
                res.send("Invalid user permission level");     
            }
            db_utils.getUserById(userId, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {               
                    let sql = "UPDATE `User` SET `email` =  '" + email + "', `first_name` = '" + first_name + 
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
        } else if (isNaN(userId) || (parseInt(userId) <= 0)) {
            res.status(400);
            res.send("Invalid userId");
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

    app.post(API_PATH + '/changeUserPermission', (req, res) => {
        var userId = req.body.userId;
        var permission = req.body.permission;
        if (db_utils.nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing userId parameters");
        } else if (isNaN(userId) || (parseInt(userId) <= 0)) {
            res.status(400);
            res.send("Invalid userId");
        } else if (db_utils.nullOrEmpty(permission)) {
            res.status(400);
            res.send("Missing permission parameters");
        } else if (USER_PERMISSIONS.indexOf(permission) <= -1) {
            res.status(400);
            res.send("Invalid user permission level");     
        } else {
            db_utils.getUserById(userId, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result.length) {
                    if (result[0].permission !== permission) {
                        let sql = "UPDATE `User` SET `permission` = '" + permission + "' WHERE `user_id` = '" +userId + "'";
                        db.query(sql, function (err, result, fields) {
                            if (err) throw err;
                            res.send({"id":userId});
                        });
                    } else {
                        res.status(204);
                        res.send("User already has the promoting permission");
                    }                   
                } else {
                    res.status(404);
                    res.send("User not found");
                }
            });
        }
    });
};
