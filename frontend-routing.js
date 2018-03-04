function getData(url){
    window.fetch(url, {
    	method: "get",
		credentials: "include"
	})
	.then(function(response) {
		return response.json();
	})
	.error(function(e) {
		console.error(e);
		return {error: e}
	});
}

module.exports = function(app) {
	app.get('/', function(req, res){
		res.render('index');  //respond with homepage
	});

	app.get('/event', function(req, res){
		var data = getData("/api/getEvent", {});

		res.render('event', {
			data: data
		});  //respond with event page
	});

	app.get("/NewEvent", function(req, res){
		res.render("EventForm");
	});
};