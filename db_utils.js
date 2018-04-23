var db = require('./db.js');
const ATTENDEE_COLUMNS = ['user_id', 'event_id'];
const USER_COLUMNS = ['username', 'email', 'first_name', 'last_name', 'permission'];
const EVENT_COLUMNS = ['title', 'description','author','location','status','price','start_date','end_date','creation_date','hashtag'];
const ORDERS_COLUMNS = ['event_id', 'user_id', 'price', 'currency'];

module.exports = {
    nullOrEmpty: function(value) {
        if (value == null || value === '') {
            return true;
        }
        return false;
    },
    getUserById: function(userId, callback) {
        db.query("SELECT ?? FROM ?? WHERE user_id = ?", [USER_COLUMNS, 'User', userId], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getUserByUsername: function(username, callback) {
        db.query("SELECT ?? FROM ?? WHERE username = ?", [USER_COLUMNS, 'User', username], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getAttendeeById: function(attendeeId, callback) {
        db.query("SELECT ?? FROM ?? WHERE attendee_id = ?", [ATTENDEE_COLUMNS, 'Attendee', attendeeId], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getAttendeeByUserIdAndEventId: function(userId, eventId, callback) {
        db.query("SELECT ?? FROM ?? WHERE user_id = ? AND event_id = ?", ['attendee_id', 'Attendee', userId, eventId], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getOrderById: function(orderId, callback) {
        db.query("SELECT ?? FROM ?? WHERE order_id = ?", [ORDERS_COLUMNS, 'Orders', orderId], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getEventById: function(eventId, callback) {
        db.query("SELECT ?? FROM ?? WHERE event_id = ?", [EVENT_COLUMNS, 'Event', eventId], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getEventByTitle: function(title, callback) {
        db.query("SELECT ?? FROM ?? WHERE title = ?", [EVENT_COLUMNS, 'Event', title], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
}