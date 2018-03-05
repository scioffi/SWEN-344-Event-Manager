var express = require('express');
var app = express();  //use express js module
var moment = require('moment');

// Static files to not be parsed by Node
app.use('/files', express.static(__dirname + '/files'));

//add handlebars view engine
var handlebars = require('express3-handlebars').create({
	defaultLayout: 'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); //sets express view engine to handlebars


app.set('port', process.env.PORT || 8080);  //sets port 8080

var apis = require('./frontend-routing.js')(app);

app.use(function(req,res){  //express catch middleware if page doesn't exist
	res.status(404);  //respond with status code
	res.render('404'); //respond with 404 page
});

app.listen(app.get('port'), function(){ //start express server
	console.log( 'Express Server Started on http://localhost:8080');
});