'use strict';
 
const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));
 
const app = require('../app.js'); // Our app
 
/**
 * TEST /api/getUsers
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
        // console.log(res.body[0]["userId"])
      });
  });
});


/**
 * TEST /api/getUser?userId=1
 */
describe("GET API endpoint /getUser with param id = 1", function(){
  it('should return user with userId=1', function() {
    return chai.request(app)
        .get('/api/getUser?userId=1')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
        // console.log(res.body[0]["userId"])
      });
  });
});


/**
 * TEST /api/getEvents
 */
describe("GET API endpoint /getEvents", function(){
  it('should return all the events in the system', function() {
    return chai.request(app)
        .get('/api/getEvents')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
        // console.log(res.body[0]["userId"])
      });
  });
});


/**
 * TEST /api/getEvent?eventId=1
 */
describe("GET API endpoint /getEvent with param id = 1", function(){
  it('should return event with id=1', function() {
    return chai.request(app)
        .get('/api/getEvent?eventId=1')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            // console.log(res.body)
        // console.log(res.body[0]["userId"])
      });
  });
});


/**
 * TEST /api/getAttendees
 */
describe("GET API endpoint /getAttendees", function(){
  it('should return all the attendees', function() {
    return chai.request(app)
        .get('/api/getAttendees')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            // console.log(res.body)
        // console.log(res.body[0]["userId"])
      });
  });
});


/**
 * TEST /api/getOrders
 */
describe("GET API endpoint /getOrders", function(){
  it('should return all the orders ', function() {
    return chai.request(app)
        .get('/api/getOrders')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            console.log(res.body)
        // console.log(res.body[0]["userId"])
      });
  });
});


/**
 * TEST /api/getCurrencyConversion
 */
describe("GET API endpoint /getCurrencyConversion", function(){
  it('should respective currency conversion values', function() {
    return chai.request(app)
        .get('/api/getCurrencyConversion')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            // console.log(res.body)
        // console.log(res.body[0]["userId"])
      });
  });
});