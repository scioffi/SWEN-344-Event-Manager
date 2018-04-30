'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app
var id_to_delete;

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
                console.log(output);

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
                id_to_delete = output["id"];
            });
    });

    // ERROR CASE
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/deleteUser')
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
                console.log(output);
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
                console.log(output);
            });
    });

    // ERROR CASE
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/deleteUser')
            .send({
                username: 'someone',
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
                userId: id_to_delete
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
    it('should create an event given title, startTime, endTime, author, location, price and hastag', function() {
        return chai.request(app)
            .post('/api/createEvent')
            .send({
                title: 'something1',
                description: "yep",
                start_time: '1244',
                end_time: '1244',
                author: 'Doe',
                location: 'UR',
                price: 10,
                tag: 'test'
            })
            .then(function(res) {
                expect(res).to.have.status(200);
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
describe("POST API endpoint /expireEvent", function(){
    it('should expire an event given eventId', function() {
        return chai.request(app)
            .post('/api/expireEvent')
            .send({
                eventId: 1
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
 * Test POST /api/deleteEvent
 */
describe("POST API endpoint /deleteEvent", function(){
    it('should delete an event given eventId and userid', function() {
        return chai.request(app)
            .post('/api/deleteEvent')
            .send({
                eventId: 1
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    // ERROR CASE

    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/deleteEvent')
            .send({
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });

});


/**
 * Test POST /api/deleteOrder
 */
describe("POST API endpoint /deleteOrder", function(){
    it('should delete an order given eventId and userid', function() {
        return chai.request(app)
            .post('/api/deleteOrder')
            .send({
                eventId: 1,
                userId:2
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
                eventId: 1,
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });

});


/**
 * Test POST /api/addAttendee
 */
describe("POST API endpoint /addAttendee", function(){
    it('should add an attendee give userId and name', function() {
        return chai.request(app)
            .post('/api/addAttendee')
            .send({
                userId: 1,
                name: 'John Doe'
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/addAttendee')
            .send({
                userId: 1
            })
            .then(function(res) {
                expect(res).to.have.status(400)
            });
    });

});


/**
 * Test POST /api/deleteAttendee
 *
 */
describe("POST API endpoint /deleteAttendee", function(){
    it('should delete an attendee given userId', function() {
        return chai.request(app)
            .post('/api/deleteAttendee')
            .send({
                userId: 1
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    // ERROR CASE : Missing User ID
    it ('should return 400 if missing data', function(){
        return chai.request(app)
            .post('/api/deleteAttendee')
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
    it('should create an order given userId, eventId, price and currency', function() {
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
                console.log(output);
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