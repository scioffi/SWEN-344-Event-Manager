'use strict';
 
const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));
 
const app = require('../app.js'); // Our app
 
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
      });
  });

  it ('should return 400 if missing params', function(){
       return chai.request(app)
        .get('/api/getUser?userId=')
        .then(function(res) {
            expect(res).to.have.status(400);
      });
  })
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
      });
  });

   // ERROR CASE: Missing params 
  it ('should return 400 if missing params', function(){
   return chai.request(app)
        .get('/api/getAttendee?eventId=')
        .then(function(res) {
            expect(res).to.have.status(400);
      });
  })
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
            expect(res.body).to.be.an('object');
      });
  });

  // ERROR CASE: Missing params 
  it ('should return 400 if missing params', function(){
   return chai.request(app)
        .get('/api/getOrder?eventId=1')
        .then(function(res) {
            expect(res).to.have.status(400);
      });
  })

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
            console.log(res.body)
            expect(res).to.have.status(200);
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
            title: 'something',
            startTime: '1234',
            endTime: '1234',
            author: 'John',
            location: 'RIT',
            price: 10,
            hashtag: 'test'

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
        .post('/api/createEvent')
        .send({
            title: 'something1',
            startTime: '1244',
            endTime: '1244',
            author: 'Doe',
            location: 'UR',
            price: 10,
            hashtag: 'test'

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
            expect(res).to.have.status(400)
        })
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
            console.log(res.body)
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
        })
  })

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
            console.log(res.body)
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
        })
  })

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
        })
  })

});


// /**
//  * Test POST /api/deleteAttendee
//  *
//  */
// describe("POST API endpoint /deleteAttendee", function(){
//   it('should delete an attendee given userId', function() {
//     return chai.request(app)
//         .post('/api/deleteAttendee')
//         .send({
//             userId: 1
//         })
//         .then(function(res) {
//             expect(res).to.have.status(200);
//       });
//   });

//   it ('should return 400 if missing data', function(){
//       return chai.request(app)
//         .post('/api/deleteOrder')
//         .send({
//             name: 'John Doe'
//         })
//         .then(function(res) {
//             expect(res).to.have.status(400)
//         })
//   })

// });


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
            expect(res).to.have.status(400)
        })
  })

});


// curl -d "userId=1&eventId=2&price=10&currency=USD" -XPOST http://localhost:8080/api/createOrder

// curl -d "eventId=1&userId=2" -XPOST http://localhost:8080/api/deleteOrder
//  curl -d "userId=1&name=John" -X POST http://localhost:8080/api/addAttendee