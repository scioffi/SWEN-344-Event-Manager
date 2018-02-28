/**
 * Created by kylescagnelli on 2/26/18.
 */
module.exports = function(app) {
    app.get('/getUser', (req, res) => {
        res.send({"userId" : 1, "name" : "John Doe"});
    })

    app.get('/getEvent', (req, res) => {
        res.send({"eventId" : 1, "event" : "RIT Spring Fest"});
    })
};