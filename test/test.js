'use strict';
 
const chai = require('chai');  
const sinon = require("sinon");
const should = chai.should();
const expect = chai.expect;
 
chai.use(require('chai-http'));
 
const app = require('../app.js'); // Our app

process.env.NODE_ENV = 'test';
const request = require('request');
const base = 'http://localhost:8080';
const events = require('./fixtures/events.json');
const users = require('./fixtures/users.json');

/**
 * TEST GET /api/getEvents
 */
describe.only('events table', () => {

    describe('when stubbed', () => {

        beforeEach(() => {
            this.get = sinon.stub(request, 'get');
        });

        afterEach(() => {
            request.get.restore();
        });

        describe('GET /api/getEvents', () => {
            it('should return all events', (done) => {
                this.get.yields(
                    null, events.all.success.res, JSON.stringify(events.all.success.body)
                );
                request.get(`${base}/api/getEvents`, (err, res, body) => {
                    // there should be a 200 status code
                    res.statusCode.should.eql(200);
                    // the response should be JSON
                    res.headers['content-type'].should.contain('application/json');
                    // parse response body
                    body = JSON.parse(body);
                    // the JSON response body should have a
                    // key-value pair of {"status": "success"}
                    body.status.should.eql('success');
                    // the JSON response body should have a
                    // key-value pair of {"data": [1 event objects]}
                    body.data.length.should.eql(1);
                    // the first object in the data array should
                    // have the right keys
                    body.data[0].should.include.keys(
                        'event_id', 'title', 'description', 'author', 'location', 'status', 'price', 'start_date', 'end_date', 'creation_date', 'hashtag'
                    );
                    // the first object should have the right value for name
                    body.data[0].title.should.eql('Trip to the Planetarium');
                    done();
                });
            });
        });
    });

});

/**
 * TEST GET /api/getUsers
 */
describe.only('users table', () => {

    describe('when stubbed', () => {

        beforeEach(() => {
            this.get = sinon.stub(request, 'get');
        });

        afterEach(() => {
            request.get.restore();
        });

        describe('GET /api/getUsers', () => {
            it('should return all users', (done) => {
                this.get.yields(
                    null, users.all.success.res, JSON.stringify(users.all.success.body)
                );
                request.get(`${base}/api/getUsers`, (err, res, body) => {
                    // there should be a 200 status code
                    res.statusCode.should.eql(200);
                    // the response should be JSON
                    res.headers['content-type'].should.contain('application/json');
                    // parse response body
                    body = JSON.parse(body);
                    // the JSON response body should have a
                    // key-value pair of {"status": "success"}
                    body.status.should.eql('success');
                    // the JSON response body should have a
                    // key-value pair of {"data": [1 event objects]}
                    body.data.length.should.eql(4);
                    // the first object in the data array should
                    // have the right keys
                     body.data[0].should.include.keys(
                        'FirstName', 'LastName', 'email', 'permission', 'userId'
                    );
                    // the first object should have the right value for name
                    body.data[0].FirstName.should.eql('John');
                    done();
                });
            });
        });

    });

});

/**
 * Testing Basic Sinon
 */
function greaterThanTwenty(num) {
    if (num > 20) return true;
    return false;
}
describe('Sample Sinon Stub', () => {
    it('should pass', (done) => {
        const greaterThanTwenty = sinon.stub().returns('something');
        greaterThanTwenty(0).should.eql('something');
        greaterThanTwenty(0).should.not.eql(false);
        done();
    });
});


/**
 * Test GET /api/getUsers
 */
describe('GET API endpoint api/getUsers', function() {  
  this.timeout(5000); // How long to wait for a response (ms)

  // GET - Get all the users 
  it('should return all users', function() {
    return chai.request(app)
        .get('/api/getUsers')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            expect(res.body[0]["userId"]).to.equal(1);
            expect(res.body[0]["name"]).to.equal('John Doe');
            expect(res.body[0]["username"]).to.equal('jdoe1234');

            expect(res.body[1]["userId"]).to.equal(2);
            expect(res.body[1]["name"]).to.equal('John Smith');
            expect(res.body[1]["username"]).to.equal('jsmith1234');

            expect(res.body[2]["userId"]).to.equal(3);
            expect(res.body[2]["name"]).to.equal('Ryan Moore');
            expect(res.body[2]["username"]).to.equal('rmoore1234');
   
      });
  });
});


/**
 * Test GET /api/getUser?userId=1
 */
describe("GET API endpoint /getUser with param id = 1", function(){
  it('should return user with userId=1', function() {
    return chai.request(app)
        .get('/api/getUser?userId=1')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');

            expect(res.body["userId"]).to.equal(1);
            expect(res.body["name"]).to.equal('John Doe');
            expect(res.body["username"]).to.equal('jdoe1234');
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
describe("GET API endpoint /getEvents", function(){
  it('should return all the events in the system', function() {
    return chai.request(app)
        .get('/api/getEvents')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');

            expect(res.body[0]["eventId"]).to.equal(1);
            expect(res.body[0]["title"]).to.equal('RIT Spring Fest');
            expect(res.body[0]["status"]).to.equal('open');

            expect(res.body[1]["eventId"]).to.equal(2);
            expect(res.body[1]["title"]).to.equal('Trip to the Planetarium');
            expect(res.body[1]["status"]).to.equal('open');
      });
  });
});


/**
 * Test GET /api/getEvent?eventId=1
 */
describe("GET API endpoint /getEvent with param id = 1", function(){
  it('should return event with id=1', function() {
    return chai.request(app)
        .get('/api/getEvent?eventId=1')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');

            expect(res.body["eventId"]).to.equal(1);
            expect(res.body["title"]).to.equal('RIT Spring Fest');
            expect(res.body["status"]).to.equal('open');
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
 * Test GET /api/getAttendees
 */
describe("GET API endpoint /getAttendees", function(){
  it('should return all the attendees', function() {
    return chai.request(app)
        .get('/api/getAttendees')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            
            expect(res.body[0]["eventId"]).to.equal(1);
            expect(res.body[0]["name"]).to.equal('John Doe');
            
            expect(res.body[1]["eventId"]).to.equal(2);
            expect(res.body[1]["name"]).to.equal('Dan Krutz');
    
      });
  });
});


/**
 * Test GET /api/getAttendee?eventId=1
 */
describe("GET API endpoint /getAttendee with event Id", function(){
  it('should return attendee in certain event', function() {
    return chai.request(app)
        .get('/api/getAttendee?eventId=1')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');

            expect(res.body["eventId"]).to.equal(1);
            expect(res.body["name"]).to.equal('John Doe');
      });
  });

   // ERROR CASE: Missing params 
  it ('should return 400 if missing params', function(){
   return chai.request(app)
        .get('/api/getAttendee?eventId=')
        .then(function(res) {
            expect(res).to.have.status(400);
      });
  });
});




/**
 * Test GET /api/getOrder?eventId=1&userId=2
 */
describe("GET API endpoint /getOrder with event id = 1 and user id = 2", function(){
  it('should return order as per the params', function() {
    return chai.request(app)
        .get('/api/getOrder?eventId=1&userId=2')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body["eventId"]).to.equal(1);
      });
  });

  // ERROR CASE: Missing params 
  it ('should return 400 if missing params', function(){
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
describe("GET API endpoint /getOrders", function(){
  it('should return all the orders ', function() {
    return chai.request(app)
        .get('/api/getOrders')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');


            expect(res.body[0]["userId"]).to.equal(1);
            expect(res.body[0]["eventId"]).to.equal(1);
            expect(res.body[0]["price"]).to.equal(0);

            expect(res.body[1]["userId"]).to.equal(2);
            expect(res.body[1]["eventId"]).to.equal(2);
            expect(res.body[1]["price"]).to.equal(25);

      });
  });
});


/**
 * Test GET /api/getCurrencyConversion
 */
describe("GET API endpoint /getCurrencyConversion", function(){
  it('should respective currency conversion values', function() {
    return chai.request(app)
        .get('/api/getCurrencyConversion')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
      });
  });
});


/**
 * Test POST /api/createUser
 */
describe("POST API endpoint /createUser", function(){
  it('should create a user given username, name and email', function() {
    return chai.request(app)
        .post('/api/createUser')
        .send({
            username: 'someone',
            name: 'John Doe',
            email: 'johndoe@something.com'
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
             username: 'someone',
        })
        .then(function(res) {
            expect(res).to.have.status(400);
        });
  });

});


/**
 * Test POST /api/editUser
 */
describe("POST API endpoint /editUser", function(){
  it('should edit a user given username, name and email', function() {
    return chai.request(app)
        .post('/api/editUser')
        .send({
            username: 'someone',
            name: 'John Doe',
            email: 'johndoe@something.com'
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
             username: 'someone',
        })
        .then(function(res) {
            expect(res).to.have.status(400);
        });
  });
});


/**
 * Test POST /api/deleteUser
 */
describe("POST API endpoint /deleteUser", function(){
  it('should delete a user given a userid', function() {
    return chai.request(app)
        .post('/api/deleteUser')
        .send({
            userId: 1
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
            expect(res).to.have.status(400);
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
          expect(res).to.have.status(400);
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
          expect(res).to.have.status(400);
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
            expect(res).to.have.status(400);
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
            expect(res).to.have.status(400);
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
            expect(res).to.have.status(400);
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
            expect(res).to.have.status(400);
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
            expect(res).to.have.status(400);
        });
  });

});


/**
 * Test POST /api/createOrder
 */
describe("POST API endpoint /createOrder", function(){
  it('should create an order given userId, eventId, price and currency', function() {
    return chai.request(app)
        .post('/api/createOrder')
        .send({
            userId: 1,
            eventId: 1,
            price: 10,
            currency: 'USD'
        })
        .then(function(res) {
            expect(res).to.have.status(200);
      });
  });

  it ('should return 400 if missing data', function(){
      return chai.request(app)
        .post('/api/createOrder')
        .send({
            userId: 1
        })
        .then(function(res) {
            expect(res).to.have.status(400);
        });
  });
});


