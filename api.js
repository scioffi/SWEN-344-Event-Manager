var axios = require("axios");
var bodyParser = require('body-parser');
var currencies = ["INR", "GBP", "CAD", "BTC", "EUR"];
const CURRENCY_API_ACCESS_KEY = "e7ec8436b2042f209fb149fb9f159a80";
const API_PATH = "/api";

var users = [{"userId" : 1, "username" :"jdoe1234" , "name" : "John Doe", "email" : "jdoe1234@rit.edu", "permission" : "user"},
			 {"userId" : 2, "username" :"jsmith1234" , "name" : "John Smith", "email" : "jsmith1234@rit.edu", "permission" : "user"},
			 {"userId" : 3, "username" :"rmoore1234" , "name" : "Ryan Moore", "email" : "rmoore1234@rit.edu", "permission" : "user"},
			 {"userId" : 4, "username" :"dkrutz1234" , "name" : "Dan Krutz", "email" : "dkrutz1234@rit.edu", "permission" : "admin"}]
			 
var events = [{"eventId" : 1, "title" : "RIT Spring Fest", "description" : "RIT annual event", "creationDate" : "1520295410", "start_time" : "1523523600", "end_time" : "1523541600", "author" : "Chris Vuong", "location" : "RIT campus", "price" : 0, "hashtag" : "RITSpringFest", "status" : "open"},
			  {"eventId" : 2, "title" : "Trip to the Planetarium", "description" : "RIT daily event", "creationDate" : "1520295000", "start_time" : "1523523600", "end_time" : "1523541600", "author" : "Chris Vuong", "location" : "RIT campus", "price" : 25, "hashtag" : "StevesBirthday", "status" : "open"}]
			  
var attendees = [{"name" : "John Doe", "eventId" : 1},
				 {"name" : "Dan Krutz", "eventId" : 2}]
				 
var orders = [{"userId" : 1, "eventId" : 1, "price" : 0, "currency" : "BTC"},
			  {"userId" : 2, "eventId" : 2, "price" : 25, "currency" : "USD"},
              {"userId" : 3, "eventId" : 2, "price" : 25, "currency" : "GBP"}]

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());


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

    app.get(API_PATH + '/getUser', (req, res) => {
        var userId = req.query.userId;
        if (nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing userId parameter");
        } else {
            res.send(users[0]);
        }
    })
	
	app.get(API_PATH + '/getUsers', (req, res) => {    
            res.send(users);
    })
	
	app.post(API_PATH + '/createUser', (req, res) => {
        var username = req.body.username;
		var name = req.body.name;
		var email = req.body.email;
        if (nullOrEmpty(username) || nullOrEmpty(name) || nullOrEmpty(email)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully created user");
        }
    })

    app.post(API_PATH + '/editUser', (req, res) => {
        var username = req.body.username;
		var name = req.body.name;
		var email = req.body.email;
        if (nullOrEmpty(username) || nullOrEmpty(name) || nullOrEmpty(email)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully edited user");
        }
    })

    app.post(API_PATH + '/deleteUser', (req, res) => {
        var userId = req.body.userId;
        if (nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing userId parameter");
        } else {
            res.send("Successfully deleted user");
        }
    })

    app.get(API_PATH + '/getEvent', (req, res) => {
        var eventId = req.query.eventId;
        if (nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            res.send(events[eventId - 1]);
        }
    })
	
	app.get(API_PATH + '/getEvents', (req, res) => {        
            res.send(events);
    })

    app.post(API_PATH + '/createEvent', (req, res) => {
        var title = req.body.title;
        var description = req.body.description;
		var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var author = "Betty White" // TODO: Get from user login.
        var location = req.body.location;
        var price = req.body.price;
        var hashtag = req.body.tag;
        var image = req.body.image;
		
        if (nullOrEmpty(title) || nullOrEmpty(start_time) || nullOrEmpty(end_time) || nullOrEmpty(author) || nullOrEmpty(location) || nullOrEmpty(price) || nullOrEmpty(hashtag) || nullOrEmpty(description)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully created event");
        }
    })

    app.post(API_PATH + '/editEvent', (req, res) => {
        var eventId = req.body.eventId;
        var title = req.body.title;
        var description = req.body.description;
		var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var author = "Betty White"; // TODO: Get from user login
        var location = req.body.location;
        var price = req.body.price;
        var hashtag = req.body.hashtag;
        var description = req.body.description;
        var image = req.body.image;
		
        if (nullOrEmpty(eventId) || nullOrEmpty(title) || nullOrEmpty(start_time) || nullOrEmpty(end_time) || nullOrEmpty(author) || nullOrEmpty(location) || nullOrEmpty(price) || nullOrEmpty(hashtag) || nullOrEmpty(description)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully edited event");
        }
    })

    app.post(API_PATH + '/deleteEvent', (req, res) => {
        var eventId = req.body.eventId;
        if (nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            res.send("Successfully deleted event");
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

    app.get(API_PATH + '/getAttendee', (req, res) => {
        var eventId = req.query.eventId;
        if (nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            res.send(attendees[0])
        }
    })
	
	app.get(API_PATH + '/getAttendees', (req, res) => {        
            res.send(attendees);
    })

    app.post(API_PATH + '/addAttendee', (req, res) => {
        var userId = req.body.userId;
		var name = req.body.name;
		
        if (nullOrEmpty(userId) || nullOrEmpty(name)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully added attendee");
        }
    })

    app.post(API_PATH + '/deleteAttendee', (req, res) => {
        var userId = req.body.userId;
        if (nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing userId parameter");
        } else {
            res.send("Successfully deleted attendee");
        }
    })

    app.get(API_PATH + '/getOrder', (req, res) => {
        var userId = req.query.userId;
        var eventId = req.query.eventId;
        if (nullOrEmpty(eventId) || nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing eventId or userId parameter");
        } else {
            res.send(orders[0])
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
};

var nullOrEmpty = function(value) {
	if (value == null || value === '') {
		return true;
	}
	return false;
}
