module.exports = function(app) {
	app.get('/', function(req,res){ 
		res.render('index');  //respond with homepage
	});
	app.get('/event', function(req,res){ 
		res.render('event');  //respond with event page
	});
}