var request = require("request");

var base_url = "http://localhost:8080"
var get_users_url = base_url + "/api/getUsers" 
var get_user_url = base_url + "/api/getUser"
var get_events_url = base_url + "/api/getEvents"
var get_event_url = base_url + "/api/getEvent"

// Jasmine test example 
describe("An example suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});


// Test Local Server 
describe("Test Event Manager's Local Server", function(){

  // Test Base URL  
  describe("GET Base URL /", function(){
    console.log("WELCOME TO THE EVENTS MANAGER TESTS!!!!")
    console.log(" ")
    console.log("Testing base url:  " + base_url)
    it("returns  status code 200", function(){
      request.get(base_url, function(error, response, body){
        expect(response.statusCode).toBe(200);
      });
    });
  });
});

  // Test getUsers endpoint
  describe("GET /api/getUsers", function() {
    console.log("Testing : " + get_users_url)
    it("returns status code 200", function(done) {       
      console.log(get_users_url)       
      request.get(get_users_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns users", function(done) {
      request.get(get_users_url, function(error, response, body) {
        let json = JSON.parse(body)
        expect(json[0]["userId"]).toBe(1);
        expect(json[0]["username"]).toBe("jdoe1234");
        expect(json[0]["name"]).toBe("John Doe");
        expect(json[0]["permission"]).toBe("user");

        expect(json[1]["userId"]).toBe(2);
        expect(json[1]["username"]).toBe("jsmith1234");
        expect(json[1]["name"]).toBe("John Smith");
        expect(json[1]["permission"]).toBe("user");

        expect(json[2]["userId"]).toBe(3);
        expect(json[2]["username"]).toBe("rmoore1234");
        expect(json[2]["name"]).toBe("Ryan Moore");
        expect(json[2]["permission"]).toBe("user");

        expect(json[3]["userId"]).toBe(4);
        expect(json[3]["username"]).toBe("dkrutz1234");
        expect(json[3]["name"]).toBe("Dan Krutz");
        expect(json[3]["permission"]).toBe("admin");
        done();
      });
    });
  });


  // Test /getUser endpoint where id = 1
  describe("GET /api/getUser id = 1", function() {
    var get_user_1 = get_user_url + "?userId=1"   
    console.log("Testing : " + get_user_1)
    it("returns status code 200", function(done) {              
      request.get(get_user_1, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns user where id=1", function(done) {
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

  // Test /getEvent endpoint where id = 1
  describe("GET /getEvent id = 1", function() {
    var get_event_1 = get_event_url + "?eventId=1"   
    console.log("Testing : " + get_event_1)
    it("returns status code 200", function(done) {              
      request.get(get_event_1, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    // test the first event 
    it("returns the first event", function(done) {
      request.get(get_event_1, function(error, response, body) {
        let json = JSON.parse(body)
        expect(json["eventId"]).toBe(1);
        expect(json["title"]).toBe("RIT Spring Fest");
        expect(json["description"]).toBe("RIT annual event");
        expect(json["location"]).toBe("RIT campus");
        expect(json["status"]).toBe("open");
        done();
      });
    });
  });
  
  // Test getEvents endpoint
  describe("GET /getEvents ", function() {
    console.log("Testing : " + get_events_url)
    it("returns status code 200", function(done) {              
      request.get(get_events_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns events", function(done) {
      request.get(get_events_url, function(error, response, body) {
        let json = JSON.parse(body)
        expect(json[0]["eventId"]).toBe(1);
        expect(json[0]["title"]).toBe("RIT Spring Fest");
        expect(json[0]["description"]).toBe("RIT annual event");
        expect(json[1]["startTime"]).toBe("8am")
        expect(json[0]["location"]).toBe("RIT campus");
        expect(json[0]["status"]).toBe("open");

        expect(json[1]["eventId"]).toBe(2);
        expect(json[1]["title"]).toBe("RIT Drinking Party");
        expect(json[1]["description"]).toBe("RIT daily event");
        expect(json[1]["startTime"]).toBe("8am")
        expect(json[0]["location"]).toBe("RIT campus");
        expect(json[1]["status"]).toBe("open");
        done();
      });
    });
  });









