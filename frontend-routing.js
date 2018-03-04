var axios = require("axios");

function getData(url){
	console.log(url);
    axios({
    	method: "get",
		url: url.toString()
	})
	.then(function(response) {
		return response.json();
	})
	.catch(function(e) {
		console.warn(e);
	});
}

module.exports = function(app) {
	app.get('/', function(req, res){
		res.render('index');  //respond with homepage
	});

	app.get('/event', function(req, res){
		var data = getData("/api/getEvent");

		res.render('event', {
			data: data
		});  //respond with event page
	});

	app.get("/NewEvent", function(req, res){
		res.render("EventForm");
	});
};