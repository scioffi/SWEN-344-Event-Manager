/**
 * Created by kylescagnelli on 2/26/18.
 */
 
const API_PATH = "/api";

var users = [{"userId" : 1, "username" :"jdoe1234" , "name" : "John Doe", "email" : "jdoe1234@rit.edu", "permission" : "user"},
			 {"userId" : 2, "username" :"jsmith1234" , "name" : "John Smith", "email" : "jsmith1234@rit.edu", "permission" : "user"},
			 {"userId" : 3, "username" :"rmoore1234" , "name" : "Ryan Moore", "email" : "rmoore1234@rit.edu", "permission" : "user"},
			 {"userId" : 4, "username" :"dkrutz1234" , "name" : "Dan Krutz", "email" : "dkrutz1234@rit.edu", "permission" : "admin"}]
			 
var events = [{"eventId" : 1, "title" : "RIT Spring Fest", "description" : "RIT annual event", "creationDate" : "2-27-2017", "startTime" : "8am", "endTime" : "5pm", "author" : "Chris Vuong", "location" : "RIT campus", "price" : 0, "hashtag" : "#RITSpringFest", "status" : "open"},
			  {"eventId" : 2, "title" : "RIT Drinking Party", "description" : "RIT daily event", "creationDate" : "3-1-2018", "startTime" : "8am", "endTime" : "5pm", "author" : "Chris Vuong", "location" : "RIT campus", "price" : 25, "hashtag" : "#RITDrinkingParty", "status" : "open"}]
			  
var attendees = [{"name" : "John Doe", "eventId" : 1},
				 {"name" : "Dan Krutz", "eventId" : 2}]
				 
var orders = [{"userId" : 1, "eventId" : 1, "price" : 0, "currency" : "BTC"},
			  {"userId" : 2, "eventId" : 2, "price" : 25, "currency" : "USD"},
              {"userId" : 3, "eventId" : 2, "price" : 25, "currency" : "GBP"}]
 
module.exports = function(app) {
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
	
	app.get(API_PATH + '/createUser', (req, res) => {
        var username = req.query.username;
		var name = req.query.name;
		var email = req.query.email;
		
        if (nullOrEmpty(username) || nullOrEmpty(name) || nullOrEmpty(email)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully created user");
        }
    })

    app.get(API_PATH + '/deleteUser', (req, res) => {
        var userId = req.query.userId;
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
            res.send(events[0]);
        }
    })
	
	app.get(API_PATH + '/getEvents', (req, res) => {        
            res.send(events);
    })

    app.get(API_PATH + '/createEvent', (req, res) => {
        var title = req.query.title;
		var startTime = req.query.startTime;
        var endTime = req.query.endTime;
        var author = req.query.author;
        var location = req.query.location;
        var price = req.query.price;
        var hashtag = req.query.hashtag;
		
        if (nullOrEmpty(title) || nullOrEmpty(startTime) || nullOrEmpty(endTime) || nullOrEmpty(author) || nullOrEmpty(location) || nullOrEmpty(price) || nullOrEmpty(hashtag)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully created event");
        }
    })

    app.get(API_PATH + '/deleteEvent', (req, res) => {
        var eventId = req.query.eventId;
        if (nullOrEmpty(eventId)) {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            res.send("Successfully deleted event");
        }
    })

    app.get(API_PATH + '/expireEvent', (req, res) => {
        var eventId = req.query.eventId;
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

    app.get(API_PATH + '/addAttendee', (req, res) => {
        var userId = req.query.userId;
		var name = req.query.name;
		
        if (nullOrEmpty(userId) || nullOrEmpty(name)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully added attendee");
        }
    })

    app.get(API_PATH + '/deleteAttendee', (req, res) => {
        var eventId = req.query.eventId;
        if (nullOrEmpty(userId)) {
            res.status(400);
            res.send("Missing eventId parameter");
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

    app.get(API_PATH + '/createOrder', (req, res) => {
        var userId = req.query.userId;
		var eventId = req.query.eventId;
        var price = req.query.price;
        var currency = req.query.currency;
		
        if (nullOrEmpty(userId) || nullOrEmpty(eventId) || nullOrEmpty(price) || nullOrEmpty(currency)) {
            res.status(400);
            res.send("Invalid url parameters");
        } else {
            res.send("Successfully created order");
        }
    })

    app.get(API_PATH + '/deleteOrder', (req, res) => {
        var userId = req.query.userId;
        var eventId = req.query.eventId;
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