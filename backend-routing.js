/**
 * Created by kylescagnelli on 2/26/18.
 */
module.exports = function(app) {
    app.get('/getUser', (req, res) => {
        var userId = req.query.userId;
        if (userId == null || userId === '') {
            res.status(400);
            res.send("Missing userId parameter");
        } else {
            res.send({"userId" : 1, "username" :"jdoe1234" , "name" : "John Doe", "email" : "jdoe1234@rit.edu", "permission" : "user"});
        }
    })

    app.get('/getEvent', (req, res) => {
        var eventId = req.query.eventId;
        if (eventId == null || eventId === '') {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            res.send({"eventId" : 1, "title" : "RIT Spring Fest", "description" : "RIT annual event", "creationDate" : "2-27-2017", "startTime" : "8am", "endTime" : "5pm", "author" : "Chris Vuong", "location" : "RIT campus", "price" : 0, "hashtag" : "#RITSpringFest", "status" : "open"});
        }
    })

    app.get('/getAttendee', (req, res) => {
        var eventId = req.query.eventId;
        if (eventId == null || eventId === '') {
            res.status(400);
            res.send("Missing eventId parameter");
        } else {
            res.send({"name" : "RIT Spring Fest", "eventId" : 1})
        }
    })

    app.get('/getOrder', (req, res) => {
        var userId = req.query.userId;
        var eventId = req.query.eventId;
        if (eventId == null || eventId === '' || userId == null || userId === '') {
            res.status(400);
            res.send("Missing eventId or userId parameter");
        } else {
            res.send({"userId" : 1, "eventId" : 1, "price" : 0, "currency" : "BTC"})
        }
    })
};