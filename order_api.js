var axios = require("axios");
var bodyParser = require('body-parser');
var db = require('./db.js');

const API_PATH = "/api";
var currencies = ["INR", "GBP", "CAD", "BTC", "EUR"];
const CURRENCY_API_ACCESS_KEY = "e7ec8436b2042f209fb149fb9f159a80";

var orders = [{"userId" : 1, "eventId" : 1, "price" : 0, "currency" : "BTC"},
			  {"userId" : 2, "eventId" : 2, "price" : 25, "currency" : "USD"},
              {"userId" : 3, "eventId" : 2, "price" : 25, "currency" : "GBP"}]

var ORDER_COLUMNS = ['event_id', 'user_id', 'price', 'currency'];

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());

    app.get(API_PATH + '/getOrder', (req, res) => {
        var userId = req.query.userId;
        var eventId = req.query.eventId;
        if (nullOrEmpty(eventId) || nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing eventId or userId parameter");
        } else {
            db.query("SELECT ?? FROM ?? WHERE order_id = ? AND user_id = ?", [EVENT_COLUMNS, 'Order', eventId, userId], function (err, result, fields) {
                if (err) throw err;
                if (result.length) {
                    res.send(JSON.stringify(result[0]));
                } else {
                    res.status(404);
                    res.send("order not found");
                }
            });
        }
    })
	
	app.get(API_PATH + '/getOrders', (req, res) => {        
            res.send(orders);
    })

    app.post(API_PATH + '/createOrder', (req, res) => {
        var userId = req.body.userId;
		var eventId = req.body.eventId;
        var price = req.body.price;
        var currency = req.body.currency;
		
        if (nullOrEmpty(userId) || nullOrEmpty(eventId) || nullOrEmpty(price) || nullOrEmpty(currency)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully created order");
        }
    })

    app.post(API_PATH + '/deleteOrder', (req, res) => {
        var userId = req.body.userId;
        var eventId = req.body.eventId;
        if (nullOrEmpty(eventId) || nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing eventId or userId parameter");
        } else {
            res.send("Successfully deleted order")
        }
    })

    app.get(API_PATH + '/getCurrencyConversion', (req, res) => {
        var amount = req.query.amount;
        axios.get('http://www.apilayer.net/api/live?access_key=' + CURRENCY_API_ACCESS_KEY + '&currencies=' + currencies.join())
            .then(response => {
                var quotes = response.data.quotes;
                var gbpRate = quotes.USDGBP;
                var eurRate = quotes.USDEUR;
                var btcRate = quotes.USDBTC;
                var cadRate = quotes.USDCAD;
                var inrRate = quotes.USDINR;
                if (nullOrEmpty(amount)) {
                    amount = 1;
                }
                res.send({"GBP" : amount*gbpRate, "INR" : amount*inrRate, "EUR" : amount*eurRate, "BTC" : amount*btcRate, "CAD" : amount*cadRate});
            })
            .catch(error => {
                res.send(error);
            })
    })
};

function nullOrEmpty(value) {
	if (value == null || value === '') {
		return true;
	}
	return false;
}
