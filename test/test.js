'use strict';
 
const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));
 
const app = require('../app.js'); // Our app
 
describe('API endpoint /getUsers', function() {  
  this.timeout(5000); // How long to wait for a response (ms)
 
  before(function() {
 
  });
 
  after(function() {
 
  });
 
  // GET - List all colors
  it('should return all users', function() {
    return chai.request(app)
      .get('/api/getUsers')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        // expect(res.body).to.be.an('object');
        // expect(res.body.results).to.be.an('array');
      });
  });
});