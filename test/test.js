'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app
var user_id_to_delete;
var message_id_to_delete;
var order_id_to_delete;
var event_id_to_delete;

/**
 * Test GET /api/getUsers
 */
describe.only('GET API endpoint api/getUsers', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    // GET - Get all the users
    it('should return all users', function() {
        return chai.request(app)
            .get('/api/getUsers')
            .then(function(res) {
                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);

                expect(output[0]["user_id"]).to.equal(1);
                expect(output[0]["permission"]).to.equal("admin");

                expect(output[1]["user_id"]).to.equal(2);
                expect(output[1]["permission"]).to.equal("user");

            });
    });
});


/**
 * Test GET /api/getUser?userId=1
 */
describe.only("GET API endpoint /getUser with param id = 1", function(){
    it('should return user with userId=1', function() {
        return chai.request(app)
            .get('/api/getUser?userId=1')
            .then(function(res) {
                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);

                expect(output["user_id"]).to.equal(1);
                expect(output["permission"]).to.equal("admin");

            });
    });

    it ('should return 400 if missing params', function(){
        return chai.request(app)
            .get('/api/getUser?userId=')
            .then(function(res) {
                expect(res).to.have.status(400);
            });
    });
});


/**
 * Test GET /api/getUserByEmail?email=<email>
 */
describe.only("GET API endpoint /getUserByEmail", function(){
    it('should return user with email = hvuong94@gmail.com', function() {
        return chai.request(app)
            .get('/api/getUserByEmail?email=hvuong94@gmail.com')
            .then(function(res) {
                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);

                expect(output["email"]).to.equal('hvuong94@gmail.com');
                expect(output["permission"]).to.equal("user");

            });
    });

    it ('should return 400 if missing params', function(){
        return chai.request(app)
            .get('/api/getUser?userId=')
            .then(function(res) {
                expect(res).to.have.status(400);
            });
    });
});


/**
 * Test GET /api/getEvents
 */
describe.only("GET API endpoint /getEvents", function(){
    it('should return all the events in the system', function() {
        return chai.request(app)
            .get('/api/getEvents')
            .then(function(res) {
                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);

                expect(output[0]["event_id"]).to.equal(1);
                expect(output[0]["title"]).to.equal("RIT Spring Fest");
                expect(output[1]["status"]).to.equal("open");

                expect(output[1]["event_id"]).to.equal(2);
                expect(output[1]["title"]).to.equal("Spring Reading Day 2018");
                expect(output[1]["status"]).to.equal("open");

            });
    });
});


/**
 * Test GET /api/getEvent?eventId=1
 */
describe.only("GET API endpoint /getEvent with param id = 1", function(){
    it('should return event with id=1', function() {
        return chai.request(app)
            .get('/api/getEvent?eventId=1')
            .then(function(res) {

                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);

                expect(output["event_id"]).to.equal(1);
                expect(output["title"]).to.equal("RIT Spring Fest");
                expect(output["status"]).to.equal("open");

            });
    });

    // ERROR CASE: Missing eventId
    it ('should return 400 if missing params', function(){
        return chai.request(app)
            .get('/api/getEvent?eventId=')
            .then(function(res) {
                expect(res).to.have.status(400);
            });
    });
});


/**
 * Test GET /api/getOrder?orderId=1
 */
describe.only("GET API endpoint /getOrder with order id = 1", function(){
    it('should return order as per the params', function() {
        return chai.request(app)
            .get('/api/getOrder?orderId=1')
            .then(function(res) {

                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);

                expect(output["first_name"]).to.equal("Chris");
                expect(output["last_name"]).to.equal("Vuong");
                expect(output["title"]).to.equal("RIT Spring Fest");

            });
    });

    // ERROR CASE: Invalid params
    it ('should return 400 if invalid params', function(){
        return chai.request(app)
            .get('/api/getOrder?eventId=1')
            .then(function(res) {
                expect(res).to.have.status(400);
            });
    });

});


/**
 * Test GET /api/getOrders
 */
describe.only("GET API endpoint /getOrders", function(){
    it('should return all the orders ', function() {
        return chai.request(app)
            .get('/api/getOrders')
            .then(function(res) {

                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);

                expect(output[0]["first_name"]).to.equal("Chris");
                expect(output[0]["last_name"]).to.equal("Vuong");
                expect(output[0]["title"]).to.equal("RIT Spring Fest");

                expect(output[1]["first_name"]).to.equal("John");
                expect(output[1]["last_name"]).to.equal("Smith");
                expect(output[1]["title"]).to.equal("Spring Reading Day 2018");

            });
    });
});


/**
 * Test GET /api/getCurrencyConversion
 */
describe.only("GET API endpoint /getCurrencyConversion", function(){
    it('should show multiple currency conversion values of 10000 USD', function() {
        return chai.request(app)
            .get('/api/getCurrencyConversion?amount=10000')
            .then(function(res) {
                expect(res).to.have.status(200);
                // checking against results is volatile as it changes constantly!
            });
    });
});


/**
 * Test POST /api/createUser
 */
describe.only("POST API endpoint /createUser", function(){
    it('should create a user', function() {
        return chai.request(app)
            .post('/api/createUser')
            .send({
                first_name: 'someone',
                last_name: 'John Doe',
                email: 'johndoe@something.com'
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);
                expect(output["id"]).to.not.equal(null);
                expect(output["id"]).to.not.equal(undefined);
                user_id_to_delete = output["id"];
            });
    });

    // ERROR CASE
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/createUser')
            .send({
                username: 'someone',
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });

});


/**
 * Test POST /api/editUser
 */
describe.only("POST API endpoint /editUser", function(){
    it('should edit Chris to Kyle', function() {
        return chai.request(app)
            .post('/api/editUser')
            .send({
                first_name: 'Kyle',
                last_name: 'Scagnelli',
                email: 'kjs5107@rit.edu',
                permission: 'admin',
                userId: 1
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);
            });
    });

    it('should edit Kyle back to Chris', function() {
        return chai.request(app)
            .post('/api/editUser')
            .send({
                first_name: 'Chris',
                last_name: 'Vuong',
                email: 'hnv1002@rit.edu',
                permission: 'admin',
                userId: 1
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);
            });
    });

    // ERROR CASE
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/editUser')
            .send({
                username: 'someone',
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });
});



/**
 * Test GET /api/checkUserExists
 */
describe.only("GET API endpoint /checkUserExists", function(){
    it('should check if user exists', function() {
        return chai.request(app)
            .get('/api/checkUserExists?email=hvuong94@gmail.com')
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });
});


/**
* Test POST /api/changeUserPermission
*/
describe.only("POST API endpoint /changeUserPermission", function(){
    it('should change the permission level of a given user', function() {
        return chai.request(app)
            .post('/api/changeUserPermission')
            .send({
                userId: 2,
                permission: "user"
            })
            .then(function(res) {
                expect(res).to.have.status(204);
            });
    });

    // ERROR CASE
    it ('should return 400 if missing payload', function(){
        return chai.request(app)
            .post('/api/changeUserPermission')
            .send({
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });
});


/**
 * Test POST /api/deleteUser
 */
describe.only("POST API endpoint /deleteUser", function(){
    it('should delete a user given a userid', function() {
        return chai.request(app)
            .post('/api/deleteUser')
            .send({
                userId: user_id_to_delete
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    // ERROR CASE
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/deleteUser')
            .send({
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });
});


/**
 * Test POST /api/createEvent
 */
describe("POST API endpoint /createEvent", function(){
    it('should create an event', function() {
        return chai.request(app)
            .post('/api/createEvent')
            .send({
                hashtag: 'TestingEvent',
                description: "Just testing!",
                author: "1",
                location: 'RIT campus',
                price: 0,
                start_date: 1525514400,
                end_date: 1525525200,
                creation_date: 1524000000,
                title: 'Testing Event',
                status: 'open',
                image: '11'
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);
                event_id_to_delete = output["id"];
            });
    });

    // ERROR CASE
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/createEvent')
            .send({
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });
});


/**
 * Test POST /api/editEvent
 */
describe("POST API endpoint /editEvent", function(){

    // ERROR CASE
    it('should edit an event given title, startTime, endTime, author, location, price and hastag', function() {
        return chai.request(app)
            .post('/api/editEvent')
            .send({
                title: 'something',
                description: "yep",
                start_time: '1244',
                end_time: '1244',
                author: 'Doe',
                location: 'RIT',
                price: 10,
                hashtag: 'test',
                eventId: 1
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    // ERROR CASE
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/editEvent')
            .send({
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });
});


/**
 * Test POST /api/expireEvent
 */
describe.only("POST API endpoint /expireEvent", function(){
    it('should expire an event given eventId', function() {
        return chai.request(app)
            .post('/api/expireEvent')
            .send({
                eventId: 5
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    // ERROR CASE
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/expireEvent')
            .send({
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    })
});


/**
 * Test POST /api/cancelEvent
 */
describe("POST API endpoint /cancelEvent", function(){
    it('should delete an event given eventId ', function() {
        return chai.request(app)
            .post('/api/cancelEvent')
            .send({
                eventId: event_id_to_delete
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    // ERROR CASE

    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/cancelEvent')
            .send({
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });

});



/**
 * Test POST /api/createOrder
 */
describe.only("POST API endpoint /createOrder", function(){
    it('should create an order given userId, eventId, and price', function() {
        return chai.request(app)
            .post('/api/createOrder')
            .send({
                userId: 1,
                eventId: 1,
                price: 10,
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);
                order_id_to_delete = output["id"]

            });
    });

    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/createOrder')
            .send({
                userId: 1
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });
});


/**
 * Test POST /api/deleteOrder
 */

describe.only("POST API endpoint /deleteOrder", function(){
    it('should delete an order given orderId', function() {
        return chai.request(app)
            .post('/api/deleteOrder')
            .send({
                orderId: order_id_to_delete,
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    // ERROR CASE

    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/deleteOrder')
            .send({
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });
});

/**
 * Test GET /api/getMessages
 */
describe.only('GET API endpoint api/getMessages', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    // GET - Get all the users
    it('should return all messages', function() {
        return chai.request(app)
            .get('/api/getMessages')
            .then(function(res) {

                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);

                expect(output[0]["message_id"]).to.equal(1);
                expect(output[0]["message"]).to.equal("Enjoy your Spring Fest");

                expect(output[1]["message_id"]).to.equal(2);
                expect(output[1]["message"]).to.equal("Start your reading now");

            });
    });
});


/**
 * Test GET /api/getMessage?messageId=1
 */
describe.only("GET API endpoint /getMessage with param messageId = 1", function(){
    it('should return message with messageId=1', function() {
        return chai.request(app)
            .get('/api/getMessage?messageId=1')
            .then(function(res) {

                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);

                expect(output["message_id"]).to.equal(1);
                expect(output["message"]).to.equal("Enjoy your Spring Fest");

            });
    });

    it ('should return 400 if invalid params', function(){
        return chai.request(app)
            .get('/api/getUser?messageId=')
            .then(function(res) {
                expect(res).to.have.status(400);
            });
    });
});


/**
 * Test GET /api/getMessageByUser?userId=<id>
 */
describe.only("GET API endpoint /getMessageByUser", function(){
    it('should return messages sent by a specific user', function() {
        return chai.request(app)
            .get('/api/getMessageByUser?userId=2')
            .then(function(res) {

                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);

                expect(output[0]["message_id"]).to.equal(1);
                expect(output[0]["message"]).to.equal("Enjoy your Spring Fest");

            });
    });

    it ('should return 400 if missing params', function(){
        return chai.request(app)
            .get('/api/getUser?userId=')
            .then(function(res) {
                expect(res).to.have.status(400);
            });
    });
});

/**
 * Test POST /api/addMessage
 */
describe.only("POST API endpoint /addMessage", function(){
    it('should add a message', function() {
        return chai.request(app)
            .post('/api/addMessage')
            .send({
                eventId: 1,
                from_user: 1,
                to_user: 2,
                message: 'Testing Messaging'
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                var output = JSON.parse(res.text);
                expect(output["id"]).to.not.equal(null);
                expect(output["id"]).to.not.equal(undefined);
                message_id_to_delete = output["id"];
            });
    });

    // ERROR CASE
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/addMessage')
            .send({
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });
});

/**
* Test POST /api/deleteMessage
*/
describe.only("POST API endpoint /deleteMessage", function(){
    it('should delete a specific message', function() {
        return chai.request(app)
            .post('/api/deleteMessage')
            .send({
                messageId: message_id_to_delete
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    // ERROR CASE
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/deleteMessage')
            .send({
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });
});
