var axios = require("axios");
var bodyParser = require('body-parser');
var db = require('./db.js');
var db_utils = require('./db_utils');

const API_PATH = "/api";
var currencies = ["INR", "GBP", "CAD", "BTC", "EUR"];
const CURRENCY_API_ACCESS_KEY = "e7ec8436b2042f209fb149fb9f159a80";
const INSERT_ORDERS_COLUMNS = ['event_id', 'user_id', 'price'];
const SELECT_ORDERS_COLUMNS = ['order_id', 'event_id', 'user_id', 'price'];

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());

    app.get(API_PATH + '/getOrder', (req, res) => {
        var orderId = req.query.orderId;
        if (db_utils.nullOrEmpty(orderId)) {
            res.status(400).send("Missing orderId parameter");
        } else if (isNaN(orderId) || (parseInt(orderId) <= 0)) {
            res.status(400).send("Invalid orderId");
        } else {
            db_utils.getOrderById(orderId, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result.length) {
                    var userId = result[0].user_id;
                    var eventId = result[0].event_id;
                    db_utils.getUserById(userId, function(err, result) {
                        if (err) {
                            res.status(500).send(err);
                        } else if (result.length) {
                            var first_name = result[0].first_name;
                            var last_name = result[0].last_name;
                            db_utils.getEventById(eventId, function(err, result) {
                                if (err) {
                                    res.status(500).send(err);
                                } else if (result.length) {
                                    res.send({"first_name":first_name,"last_name":last_name,"title":result[0].title});
                                } else {
                                    res.status(404).send("Event not found");
                                }
                            });
                        } else {
                            res.status(404).send("User not found");
                        }
                    });
                } else {
                    res.status(404).send("Order not found");
                }
            });            
        }
    })
	
	app.get(API_PATH + '/getOrders', (req, res) => {      
        var response = [];
        var numRow = 0;
        db.query("SELECT ?? FROM ??", [SELECT_ORDERS_COLUMNS, 'orders'], function (err, results, fields) {
            if (err) throw err;
            if (results.length) {
                results.forEach(row => {
                    db_utils.getUserById(row.user_id, function(err, user) {
                        if (err) {
                            res.status(500).send(err);
                        } else if (user.length) {
                            db_utils.getEventById(row.event_id, function(err, event) {
                                numRow++;
                                if (err) {
                                    res.status(500).send(err);
                                } else if (event.length) {
                                    response.push({"first_name":user[0].first_name,"last_name":user[0].last_name,"title":event[0].title});
                                    if (numRow == results.length) {
                                        res.send(JSON.stringify(response));
                                    }
                                }
                            });  
                        }
                    });
                });
            } else {
                res.status(404).send("No order in database");
            }
        });
    })

    app.post(API_PATH + '/createOrder', (req, res) => {
        var userId = req.body.userId;
		var eventId = req.body.eventId;
        var price = req.body.price;
        if (db_utils.nullOrEmpty(userId)) {
            res.status(400).send("Missing userId parameter");
        } else if (db_utils.nullOrEmpty(eventId)) {
            res.status(400).send("Missing eventId parameter");
        } else if (db_utils.nullOrEmpty(price)) {
            res.status(400).send("Missing price parameter");
        } else {
            if (isNaN(userId) || (parseInt(userId) <= 0)) {
                res.status(400).send("Invalid userId");
            } 
            if (isNaN(eventId) || (parseInt(eventId) <= 0)) {
                res.status(400).send("Invalid eventId");
            }
            if (isNaN(price) || (parseInt(price) < 0)) {
                res.status(400).send("Invalid price");
            } 
            db_utils.getUserById(userId, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result.length) {
                    db_utils.getEventById(eventId, function(err, result) {
                        if (err) {
                            res.status(500).send(err);
                        } else if (result.length) {
                            var values = [eventId, userId, price];
                            db.query("INSERT INTO ?? (??) VALUES (?)", ['orders', INSERT_ORDERS_COLUMNS, values], function (err, result, fields) {
                                if (err) throw err;
                                res.send({"id":result.insertId});
                            });
                        } else {
                            res.status(404).send("Event doesn't exist");
                        }
                    });
                } else {       
                    res.status(404).send("User doesn't exist");
                }
            });
        }
    })

    app.post(API_PATH + '/deleteOrder', (req, res) => {
        var orderId = req.body.orderId;
        if (db_utils.nullOrEmpty(orderId)) {
            res.status(400).send("Missing orderId parameter");
        } if (isNaN(orderId) || (parseInt(orderId) <= 0)) {
            res.status(400).send("Invalid orderId");
        } else {
            db_utils.getOrderById(orderId, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else if (result) {   
                    db.query("DELETE FROM ?? WHERE order_id = ?", ['orders', orderId], function (err, result, fields) {
                        if (err) {
                            res.status(500).send(err);
                        } else if (result.affectedRows) {
                            res.send("successfully deleted order");                        
                        } else {
                            res.status(404).send("Order not found");
                        }
                    });
                } else {
                    res.status(404).send("Order not found");
                }
            });
        }
    })

    app.get(API_PATH + '/getCurrencyConversion', (req, res) => {
        var amount = req.query.amount;
        if (db_utils.nullOrEmpty(amount)) {
            res.status(400).send("Missing amount parameter");
        } else if (isNaN(amount) || (parseInt(amount) < 0)) {
            res.status(400).send("Invalid amount");
        }
        axios.get('http://www.apilayer.net/api/live?access_key=' + CURRENCY_API_ACCESS_KEY + '&currencies=' + currencies.join())
            .then(response => {
                var quotes = response.data.quotes;
                var gbpRate = quotes.USDGBP;
                var eurRate = quotes.USDEUR;
                var btcRate = quotes.USDBTC;
                var cadRate = quotes.USDCAD;
                var inrRate = quotes.USDINR;
                res.status(200).send({"GBP" : amount*gbpRate, "INR" : amount*inrRate, "EUR" : amount*eurRate, "BTC" : amount*btcRate, "CAD" : amount*cadRate});
            })
            .catch(error => {
                res.status(500).send(error);
            })
    })
};