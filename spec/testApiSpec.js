var request = require("request") 

var base_url = "http://localhost:8080/getUser"
var TestApiHelper = require('./helper/TestApiHelper.js');
var testMyApi = new TestApiHelper();

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

// describe("Another suite", function(){
//   it("contains spec with an expectation", function() {
//     expect(testMyApi.getUserFromPromise()).toBe("This will be the JSON.......");
//   });
// });


// describe("A suite", function() {
//   it("contains spec with an expectation", function() {
//     console.log("Heya!");
//     console.log(testMyApi.getUser);
       

//     expect(testMyApi.getUser).toBe("{'userId' : 1, 'username' : 'jdoe1234' , 'name' : 'John Doe', 'email' : 'jdoe1234@rit.edu', 'permission' : 'user'}");
//   });
// });





// describe("Hello World Server", function() {
//   describe("GET /", function() {
//     it("returns user", function(done) {
//       request.get("http://localhost:8080/getUser", function(error, response, body) {
//         expect("{userId' : 1, 'username' : 'jdoe1234' , 'name' : 'John Doe', 'email' : 'jdoe1234@rit.edu', 'permission' : 'user'}").toBe(JSON.stringify({'userId' : 1, 'username' : 'jdoe1234' , 'name' : 'John Doe', 'email' : 'jdoe1234@rit.edu', 'permission' : 'user'}));
//         done();
//       });
//     });
//   });
// });








