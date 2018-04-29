var db = require('./db.js');
const SELECT_USER_COLUMNS = ['user_id', 'email', 'first_name', 'last_name', 'permission'];
const SELECT_EVENT_COLUMNS = ['event_id', 'title', 'description','author','location','status','price','start_date','end_date','creation_date','hashtag'];
const SELECT_ORDERS_COLUMNS = ['order_id', 'event_id', 'user_id', 'price'];
const SELECT_MESSAGE_COLUMNS = ['message_id','from_user', 'to_user', 'shared_time', 'message', 'event_id'];

module.exports = {
    nullOrEmpty: function(value) {
        if (value == null || value === '') {
            return true;
        }
        return false;
    },
    validateEmail: function(email) {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    },
    validateTimestamp: function(date) {
        var date = new Date(parseInt(date));
        return date.getTime() > 0;
    },
    getUserById: function(userId, callback) {
        db.query("SELECT ?? FROM ?? WHERE user_id = ?", [SELECT_USER_COLUMNS, 'user', userId], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getUserByEmail: function(email, callback) {
        db.query("SELECT * FROM user WHERE email = '" + email + "'", function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },    
    getOrderById: function(orderId, callback) {
        db.query("SELECT ?? FROM ?? WHERE order_id = ?", [SELECT_ORDERS_COLUMNS, 'orders', orderId], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getEventById: function(eventId, callback) {
        db.query("SELECT ?? FROM ?? WHERE event_id = ?", [SELECT_EVENT_COLUMNS, 'event', eventId], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getEventByTitle: function(title, callback) {
        db.query("SELECT ?? FROM ?? WHERE title = ?", [SELECT_EVENT_COLUMNS, 'event', title], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getMessageById: function(messageId, callback) {
        db.query("SELECT ?? FROM ?? WHERE message_id = ?", [SELECT_MESSAGE_COLUMNS, 'message', messageId], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
    getMessageByUser: function(userId, callback) {
        db.query("SELECT ?? FROM ?? WHERE to_user = ?", [SELECT_MESSAGE_COLUMNS, 'message', userId], function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result);
            }
        });
    },
}