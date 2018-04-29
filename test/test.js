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
const orders = require('./fixtures/orders.json');
const attendees = require('./fixtures/attendees.json');
const messages = require('./fixtures/messages.json');
const currencies = require('./fixtures/currencies.json');

/**
 * TEST Event Operations
 */
describe('events table', () => {

    describe('when stubbed', () => {

        beforeEach(() => {
            this.get = sinon.stub(request, 'get');
            this.postReq = sinon.stub(request, 'post');
        });

        afterEach(() => {
            request.get.restore();
            request.post.restore();
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

        // Get single event
        describe('GET /api/getEvent/:id', () => {
            it('should respond with a single event', (done) => {
                const obj = events.single.success;
                this.get.yields(null, obj.res, JSON.stringify(obj.body));
                request.get(`${base}/api/getEvent/4`, (err, res, body) => {
                    res.statusCode.should.equal(200);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'event_id', 'title', 'description', 'author', 'location', 'status', 'price', 'start_date', 'end_date', 'creation_date', 'hashtag'
                    );
                    body.data[0].title.should.eql('Trip to the Planetarium');
                    done();
                });
            });
            it('should throw an error if the event does not exist', (done) => {
                const obj = events.single.failure;
                this.get.yields(null, obj.res, JSON.stringify(obj.body));
                request.get(`${base}/api/getEvent/9999`, (err, res, body) => {
                    res.statusCode.should.equal(404);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('error');
                    body.message.should.eql('That event does not exist.');
                    done();
                });
            });
        });

        // Create Event 
        describe('POST /api/createEvent', () => {
            it('should return the event that was added', (done) => {
                const options = {
                    method: 'post',
                    body: {
                        author: "hnv1002",
                        creation_date: "2018-02-15T13:00:00.000Z",
                        description: "RIT daily event",
                        end_date: "2018-03-15T12:00:00.000Z",
                        hashtag: null,
                        location: "RIT SSE",
                        price: 25,
                        start_date: "2018-03-01T13:00:00.000Z",
                        status: "expired",
                        title: "Adding random event!"
                    },
                    json: true,
                    url: `${base}/api/createEvent`
                };
                const obj = events.add.success;
                this.postReq.yields(
                    null, obj.res, JSON.stringify(obj.body)
                );
                request.post(options, (err, res, body) => {
                    res.statusCode.should.eql(201);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'author', 'creation_date', 'description', 'end_date', 'hashtag', 'location', 'price', 'start_date',
                        'status', 'title'
                    );
                    body.data[0].title.should.eql('Adding random event!');
                    done();
                });
            });
        });

        // Cancel Event
        describe('POST /api/cancelEvent', () => {
            it('should return the event that was cancelled', (done) => {
                const options = {
                    method: 'post',
                    body: {
                        author: "hnv1002",
                        creation_date: "2018-02-15T13:00:00.000Z",
                        description: "RIT daily event",
                        end_date: "2018-03-15T12:00:00.000Z",
                        hashtag: null,
                        location: "RIT SSE",
                        price: 25,
                        start_date: "2018-03-01T13:00:00.000Z",
                        status: "expired",
                        title: "Adding random event!"
                    },
                    json: true,
                    url: `${base}/api/cancelEvent`
                };
                const obj = events.add.success;
                this.postReq.yields(
                    null, obj.res, JSON.stringify(obj.body)
                );
                request.post(options, (err, res, body) => {
                    res.statusCode.should.eql(201);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'author', 'creation_date', 'description', 'end_date', 'hashtag', 'location', 'price', 'start_date',
                        'status', 'title'
                    );
                    body.data[0].title.should.eql('Adding random event!');
                    done();
                });
            });
        });

    });

});

/**
 * TEST User Operations
 */
describe('users table', () => {

    describe('when stubbed', () => {

        beforeEach(() => {
            this.get = sinon.stub(request, 'get');
            this.postReq = sinon.stub(request, 'post');
            
        });

        afterEach(() => {
            request.get.restore();
            request.post.restore();
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

        // get a single user
        describe('GET /api/getUser/:id', () => {
            it('should respond with a single user', (done) => {
                const obj = users.single.success;
                this.get.yields(null, obj.res, JSON.stringify(obj.body));
                request.get(`${base}/api/getUser/1`, (err, res, body) => {
                    res.statusCode.should.equal(200);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'FirstName', 'LastName', 'email', 'permission', 'userId'
                    );
                    body.data[0].FirstName.should.eql('John');
                    done();
                });
            });
            it('should throw an error if the user does not exist', (done) => {
                const obj = users.single.failure;
                this.get.yields(null, obj.res, JSON.stringify(obj.body));
                request.get(`${base}/api/getUser/9999`, (err, res, body) => {
                    res.statusCode.should.equal(404);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('error');
                    body.message.should.eql('That user does not exist.');
                    done();
                });
            });
        });

        // Create User
        describe('POST /api/createUser', () => {
            it('should return the user that was created', (done) => {
                const options = {
                    method: 'post',
                    body: {
                        userId: 5,
                        email: "mxl2261@rit.edu",
                        FirstName: "Moses",
                        LastName: "Lagoon",
                        permission: "admin"
    
                    },
                    json: true,
                    url: `${base}/api/createUser`
                };
                const obj = users.add.success;
                this.postReq.yields(
                    null, obj.res, JSON.stringify(obj.body)
                );
                request.post(options, (err, res, body) => {
                    res.statusCode.should.eql(201);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'userId', 'FirstName', 'LastName', 'permission'
                    );
                    body.data[0].userId.should.eql(5);
                    done();
                });
            });
        });

        // Delete User
        describe('POST /api/deleteUser', () => {
            it('should return the user that was deleted', (done) => {
                const options = {
                    method: 'post',
                    body: {
                        userId: 5,
                        email: "mxl2261@rit.edu",
                        FirstName: "Moses",
                        LastName: "Lagoon",
                        permission: "admin"

                    },
                    json: true,
                    url: `${base}/api/deleteUser`
                };
                const obj = users.add.success;
                this.postReq.yields(
                    null, obj.res, JSON.stringify(obj.body)
                );
                request.post(options, (err, res, body) => {
                    res.statusCode.should.eql(201);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'userId', 'FirstName', 'LastName', 'permission'
                    );
                    body.data[0].userId.should.eql(5);
                    done();
                });
            });
        });

    });
});


/**
 * TEST Attendees Operations
 */
describe('attendees table', () => {

    describe('when stubbed', () => {

        beforeEach(() => {
            this.get = sinon.stub(request, 'get');
            this.postReq = sinon.stub(request, 'post');
        });

        afterEach(() => {
            request.get.restore();
            request.post.restore();
        });

        describe('GET /api/getAttendees', () => {
            it('should return all attendees to an event', (done) => {
                this.get.yields(
                    null, attendees.all.success.res, JSON.stringify(attendees.all.success.body)
                );
                request.get(`${base}/api/getAttendees`, (err, res, body) => {
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
                    body.data.length.should.eql(2);
                    // the first object in the data array should
                    // have the right keys
                     body.data[0].should.include.keys(
                        'attendee_id', 'user_id', 'event_id'
                    );
                    // the first object should have the right value for name
                    body.data[0].attendee_id.should.eql(1);
                    done();
                });
            });
        });

        // Add Attendee
        describe('POST /api/addAttendee', () => {
            it('should return the attendee that was added', (done) => {
                const options = {
                    method: 'post',
                    body: {
                        attendee_id: 3,
                        user_id: 3, 
                        event_id: 3
                    },
                    json: true,
                    url: `${base}/api/addAttendee`
                };
                const obj = attendees.add.success;
                this.postReq.yields(
                    null, obj.res, JSON.stringify(obj.body)
                );
                request.post(options, (err, res, body) => {
                    res.statusCode.should.eql(201);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'attendee_id', 'user_id', 'event_id'
                    );
                    body.data[0].attendee_id.should.eql(3);
                    done();
                });
            });
        });

        // Delete Attendee
        describe('POST /api/deleteAttendee', () => {
            it('should return the attendee that was deleted', (done) => {
                const options = {
                    method: 'post',
                    body: {
                        attendee_id: 3,
                        user_id: 3,
                        event_id: 3
                    },
                    json: true,
                    url: `${base}/api/deleteAttendee`
                };
                const obj = attendees.add.success;
                this.postReq.yields(
                    null, obj.res, JSON.stringify(obj.body)
                );
                request.post(options, (err, res, body) => {
                    res.statusCode.should.eql(201);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'attendee_id', 'user_id', 'event_id'
                    );
                    body.data[0].attendee_id.should.eql(3);
                    done();
                });
            });
        });

    });
});

/**
 * TEST Orders Operations
 */
describe('orders table', () => {

    describe('when stubbed', () => {

        beforeEach(() => {
            this.get = sinon.stub(request, 'get');
            this.postReq = sinon.stub(request, 'post');
        });

        afterEach(() => {
            request.get.restore();
            request.post.restore();
        });

        describe('GET /api/getOrders', () => {
            it('should return all orders', (done) => {
                this.get.yields(
                    null, orders.all.success.res, JSON.stringify(orders.all.success.body)
                );
                request.get(`${base}/api/getOrders`, (err, res, body) => {
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
                    body.data.length.should.eql(2);
                    // the first object in the data array should
                    // have the right keys
                     body.data[0].should.include.keys(
                        'order_id', 'event_id', 'user_id', 'price'
                    );
                    // the first object should have the right value for name
                    body.data[0].user_id.should.eql(1);
                    done();
                });
            });
        });


        // Create Order
        describe('POST /api/createOrder', () => {
            it('should return the order that was created', (done) => {
                const options = {
                    method: 'post',
                    body: {
                        order_id: 3,
                        user_id: 3, 
                        event_id: 3,
                        price: 25
                    },
                    json: true,
                    url: `${base}/api/createOrder`
                };
                const obj = orders.add.success;
                this.postReq.yields(
                    null, obj.res, JSON.stringify(obj.body)
                );
                request.post(options, (err, res, body) => {
                    res.statusCode.should.eql(201);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'order_id', 'user_id', 'event_id', 'price'
                    );
                    // body.data[0].attendee_id.should.eql(3);
                    done();
                });
            });
        });

        // Delete Order
        describe('POST /api/deleteOrder', () => {
            it('should return the order that was deleted', (done) => {
                const options = {
                    method: 'post',
                    body: {
                        order_id: 3,
                        user_id: 3,
                        event_id: 3,
                        price: 25
                    },
                    json: true,
                    url: `${base}/api/deleteOrder`
                };
                const obj = orders.add.success;
                this.postReq.yields(
                    null, obj.res, JSON.stringify(obj.body)
                );
                request.post(options, (err, res, body) => {
                    res.statusCode.should.eql(201);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'order_id', 'user_id', 'event_id', 'price'
                    );
                    // body.data[0].attendee_id.should.eql(3);
                    done();
                });
            });
        });

    });

});

/**
 * TEST GET /api/getCurrencyConversion
 */
describe('currencies api', () => {

    describe('when stubbed', () => {

        beforeEach(() => {
            this.get = sinon.stub(request, 'get');
        });

        afterEach(() => {
            request.get.restore();
        });

        describe('GET /api/getCurrencyConversion', () => {
            it('should return required converted currencies', (done) => {
                this.get.yields(
                    null, currencies.all.success.res, JSON.stringify(currencies.all.success.body)
                );
                request.get(`${base}/api/getCurrencyConversion?amount=1`, (err, res, body) => {
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
                        'GBP', 'INR', 'EUR', 'BTC', "CAD"
                    );
                    // the first object should have the right value for name
                    // body.data[0].user_id.should.eql(1);
                    done();
                });
            });
        });

    });

});


/**
 * TEST Message Operations
 */
describe('messages table', () => {

    describe('when stubbed', () => {

        beforeEach(() => {
            this.get = sinon.stub(request, 'get');
            this.postReq = sinon.stub(request, 'post');

        });

        afterEach(() => {
            request.get.restore();
            request.post.restore();
        });

        describe('GET /api/getMessages', () => {
            it('should return all messages', (done) => {
                this.get.yields(
                    null, messages.all.success.res, JSON.stringify(messages.all.success.body)
                );
                request.get(`${base}/api/getMessages`, (err, res, body) => {
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
                    body.data.length.should.eql(2);
                    // the first object in the data array should
                    // have the right keys
                    body.data[0].should.include.keys(
                        'message_id', 'from_user', 'to_user', 'message', 'shared_time', 'event_id'
                    );
                    // the first object should have the right value for message
                    body.data[0].message.should.eql('Test Message');
                    done();
                });
            });
        });

        // get a single message
        describe('GET /api/getMessage/:id', () => {
            it('should respond with a single message', (done) => {
                const obj = messages.single.success;
                this.get.yields(null, obj.res, JSON.stringify(obj.body));
                request.get(`${base}/api/getMessage/1`, (err, res, body) => {
                    res.statusCode.should.equal(200);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'message_id', 'from_user', 'to_user', 'message', 'shared_time', 'event_id'
                    );
                    body.data[0].message.should.eql('Test Message');
                    done();
                });
            });
            it('should throw an error if the message does not exist', (done) => {
                const obj = messages.single.failure;
                this.get.yields(null, obj.res, JSON.stringify(obj.body));
                request.get(`${base}/api/getUser/9999`, (err, res, body) => {
                    res.statusCode.should.equal(404);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('error');
                    body.message.should.eql('That message does not exist.');
                    done();
                });
            });
        });

        // Add Message
        describe('POST /api/addMessage', () => {
            it('should return the message that was created', (done) => {
                const options = {
                    method: 'post',
                    body: {
                        message_id: 4,
                        from_user: 4,
                        to_user: 4,
                        message: "Ridiculous Message",
                        shared_time: 1524684444,
                        event_id: 4
                    },
                    json: true,
                    url: `${base}/api/addMessage`
                };
                const obj = messages.add.success;
                this.postReq.yields(
                    null, obj.res, JSON.stringify(obj.body)
                );
                request.post(options, (err, res, body) => {
                    res.statusCode.should.eql(201);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'message_id', 'from_user', 'to_user', 'message', 'shared_time', 'event_id'
                    );
                    body.data[0].message_id.should.eql(3);
                    done();
                });
            });
        });

        // Delete Message
        describe('POST /api/deleteMessage', () => {
            it('should return the message that was deleted', (done) => {
                const options = {
                    method: 'post',
                    body: {
                        message_id: 4,
                        from_user: 4,
                        to_user: 4,
                        message: "Ridiculous Message",
                        shared_time: 1524684444,
                        event_id: 4
                    },
                    json: true,
                    url: `${base}/api/deleteMessage`
                };
                const obj = messages.add.success;
                this.postReq.yields(
                    null, obj.res, JSON.stringify(obj.body)
                );
                request.post(options, (err, res, body) => {
                    res.statusCode.should.eql(201);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data[0].should.include.keys(
                        'message_id', 'from_user', 'to_user', 'message', 'shared_time', 'event_id'
                    );
                    body.data[0].message_id.should.eql(3);
                    done();
                });
            });
        });

    });

});