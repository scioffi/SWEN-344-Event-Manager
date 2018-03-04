var request = require("request");

var base_url = "http://localhost:8080"
var get_user_url = base_url + "/getUser"

// var TestApiHelper = require('./helper/TestApiHelper.js');
// var testMyApi = new TestApiHelper();

// Jasmine test example 
describe("An example suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});


// Test Local Server 
describe("Test Event Manager's Local Server", function(){

  // Test Base URL  http://localhost:8080
  describe("GET Base URL /", function(){
    it("returns  status code 200", function(){
      request.get(base_url, function(error, response, body){
        expect(response.statusCode).toBe(200);
      });
    });
  });
});

  // Test /getUser endpoint where id = 1
  describe("GET /getUser id = 1", function() {
    var get_user_1 = get_user_url + "?userId=1"   
    it("returns status code 200", function(done) {              
      request.get(get_user_1, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns user JSON", function(done) {
      request.get(get_user_1, function(error, response, body) {
        let json = JSON.parse(body)
        expect(body).toBe('{"userId":1,"username":"jdoe1234","name":"John Doe","email":"jdoe1234@rit.edu","permission":"user"}');
        expect(json["userId"]).toBe(1);
        expect(json["username"]).toBe("jdoe1234");
        expect(json["name"]).toBe("John Doe");
        expect(json["permission"]).toBe("user");
        done();
      });
    });
  });








