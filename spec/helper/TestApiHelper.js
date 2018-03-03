const fetch = require("node-fetch");
const request = require("request");
const axios = require("axios");
// const fetch = require("whatwg-fetch");
class TestApiHelper {
    getUserTest() {
        
        const url = "http://localhost:8080/getUser"
        return axios
            .get(url)
            .then(response => {
                return response.data
                // console.log(response.data);
             })
         .catch(error => {
             console.log(error);
  });
    }



    // Method
    getUser() {
        const url = "http://localhost:8000/getUser";
        var data
        return request.get(url, (error, response, body) => {
            let json = JSON.parse(body)
            return json
        
        });
    }

    getUserFromPromise(){
        return Promise.all([this.getUserTest()]).then((a) =>{
            // console.log(a)
            // console.log(typeof a[0]["userId"])
            // console.log (a);
            return a;
        }).catch((e)=>{
            console.log(e)
        })
    }

    // Just another random test function
    // test() {
    //     return "Hello world";
    // }

}
module.exports=TestApiHelper;
