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
            res.status(400);
            res.send("Missing orderId parameter");
        } else if (isNaN(orderId) || (parseInt(orderId) <= 0)) {
            res.status(400);
            res.send("Invalid orderId");
        } else {
            db_utils.getOrderById(orderId, function(err, result) {
                if (err) {
                    res.status(500)
                    res.send(err);
                } else if (result.length) {
                    var userId = result[0].user_id;
                    var eventId = result[0].event_id;
                    db_utils.getUserById(userId, function(err, result) {
                        if (err) {
                            res.status(500)
                            res.send(err);
                        } else if (result.length) {
                            var first_name = result[0].first_name;
                            var last_name = result[0].last_name;
                            db_utils.getEventById(eventId, function(err, result) {
                                if (err) {
                                    res.status(500)
                                    res.send(err);
                                } else if (result.length) {
                                    res.send({"first_name":first_name,"last_name":last_name,"title":result[0].title});
                                } else {
                                    res.status(404)
                                    res.send("Event not found");
                                }
                            });
                        } else {
                            res.status(404)
                            res.send("User not found");
                        }
                    });
                } else {
                    res.status(404)
                    res.send("Order not found");
                }
            });            
        }
    })
	
	app.get(API_PATH + '/getOrders', (req, res) => {        
        db.query("SELECT ?? FROM ??", [SELECT_ORDERS_COLUMNS, 'Orders'], function (err, results, fields) {
            if (err) throw err;
            if (results.length) {
                res.send(JSON.stringify(results));
            } else {
                res.status(404)
                res.send("No order in database");
            }
        });
    })

    app.post(API_PATH + '/createOrder', (req, res) => {
        var userId = req.body.userId;
		var eventId = req.body.eventId;
        var price = req.body.price;
        if (db_utils.nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing userId parameter");
        } else if (db_utils.nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else if (db_utils.nullOrEmpty(price)) {
            res.status(400);
            res.send("Missing price parameter");
        } else {
            if (isNaN(userId) || (parseInt(userId) <= 0)) {
                res.status(400);
                res.send("Invalid userId");
            } 
            if (isNaN(eventId) || (parseInt(eventId) <= 0)) {
                res.status(400);
                res.send("Invalid eventId");
            }
            if (isNaN(price) || (parseInt(price) < 0)) {
                res.status(400);
                res.send("Invalid price");
            } 
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
                            var values = [eventId, userId, price];
                            db.query("INSERT INTO ?? (??) VALUES (?)", ['Order', INSERT_ORDERS_COLUMNS, values], function (err, result, fields) {
                                if (err) throw err;
                                res.send({"id":result.insertId});
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

    app.post(API_PATH + '/deleteOrder', (req, res) => {
        var orderId = req.body.orderId;
        if (db_utils.nullOrEmpty(orderId)) {
            res.status(400);
            res.send("Missing orderId parameter");
        } if (isNaN(orderId) || (parseInt(orderId) <= 0)) {
            res.status(400);
            res.send("Invalid orderId");
        } else {
            db_utils.getOrderById(orderId, function(err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else if (result) {   
                    db.query("DELETE FROM ?? WHERE order_id = ?", ['Orders', orderId], function (err, result, fields) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else if (result.affectedRows) {
                            res.send("successfully deleted order");                        
                        } else {
                            res.status(404);
                            res.send("Order not found");
                        }
                    });
                } else {
                    res.status(404);
                    res.send("Order not found");
                }
            });
        }
    })

    app.get(API_PATH + '/getCurrencyConversion', (req, res) => {
        var amount = req.query.amount;
        if (db_utils.nullOrEmpty(amount)) {
            res.status(400);
            res.send("Missing amount parameter");
        } else if (isNaN(amount) || (parseInt(amount) < 0)) {
            res.status(400);
            res.send("Invalid amount");
        }
        axios.get('http://www.apilayer.net/api/live?access_key=' + CURRENCY_API_ACCESS_KEY + '&currencies=' + currencies.join())
            .then(response => {
                var quotes = response.data.quotes;
                var gbpRate = quotes.USDGBP;
                var eurRate = quotes.USDEUR;
                var btcRate = quotes.USDBTC;
                var cadRate = quotes.USDCAD;
                var inrRate = quotes.USDINR;
                res.send({"GBP" : amount*gbpRate, "INR" : amount*inrRate, "EUR" : amount*eurRate, "BTC" : amount*btcRate, "CAD" : amount*cadRate});
            })
            .catch(error => {
                res.status(500);
                res.send(error);
            })
    })
};