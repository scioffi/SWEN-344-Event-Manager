var mysql = require('mysql');
var settings = require('./mysql_conf.json');
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createPool(settings);

        db.getConnection(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log(err);
            }
        });
    }
    return db;
}

module.exports = connectDatabase();