# API Documentation : Event Management System

## Overview
Welcome to Event Manager's official API documentation. No authentication is required to call the API at the moment. You can simply call the specified endpoints as represented below.

## 1. Get All Users

GET `/api/getUsers` will return all the users in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getUsers```
**Params**: `None`
**Method**: `GET `


This should return something like: 

### Response: 
 ```
 [
  {
    "userId": 1,
    "name": "John Doe",
    "email": "jdoe1234@rit.edu",
    "permission": "user"
  },
  {
    "userId": 2,
    "name": "John Smith",
    "email": "jsmith1234@rit.edu",
    "permission": "user"
  },
  {
    "userId": 3,
    "name": "Ryan Moore",
    "email": "rmoore1234@rit.edu",
    "permission": "user"
  },
  {
    "userId": 4,
    "name": "Dan Krutz",
    "email": "dkrutz1234@rit.edu",
    "permission": "admin"
  }
]

 ```
 
 CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getUsers
 ```
 
 ## 2.  Get a User by UserId

GET `/api/getUser?userId=` will return user with the specified in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getUser```
**Method**: `GET`
**Params**: `userId=<user identification number>`

### Sample Request: 
Let's get a user whose id = 1

```http://localhost:8080/api/getUser?userId=1                                   ```

The above request will return something like: 
### Response: 
 ```
 {
  "userId": 1,
  "name": "John Doe",
  "email": "jdoe1234@rit.edu",
  "permission": "user"
 }
 ```
 
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getUser?userId=1
 ```

 ## 3.  Get a User by Email

GET `/api/getUserByEmail?email=` will return user with specified email in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getUser```
**Method**: `GET`
**Params**: `email=<user's email>`

### Sample Request: 
Let's get a user whose id = 1

```http://localhost:8080/api/getUserByEmail?email="jdoe1234@gmail.com"                                   ```

The above request will return something like: 
### Response: 
 ```
 {
  "userId": 1,
  "name": "John Doe",
  "email": "jdoe1234@rit.edu",
  "permission": "user"
 }
 ```
 
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getUserByEmail?email="jdoe1234@gmail.com"
 ```

## 4.  Check user exists by Email

GET `/api/checkUserExists?email=` will return user with specified email in the system

### Request:
**Base URL**: ```http://localhost:8080/api/checkUserExists```
**Method**: `GET`
**Params**: `email=<user's email>`

### Sample Request: 
Let's check user whose email = jdoe1234@gmail.com

```http://localhost:8080/api/checkUserExists?email="jdoe1234@gmail.com"                                   ```

The above request will return something like: 
### Response: 
 ```
 {
  "userId": 1,
  "name": "John Doe",
  "email": "jdoe1234@rit.edu",
  "permission": "user"
 }
 ```
 
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/checkUserExists?email="jdoe1234@gmail.com"
 ```

 ## 5. Create a User
 
 POST `/api/createUser` will create a user with the supplied first_name, last_name, email, and permission(optional). By default, if no permission is specified, new user is created with user permission

### Request:
**Base URL**: ```http://localhost:8080/api/createUser```
**Method**: `POST`
**Params**: 
First Name: `first_name=<something>`

Last Name: `last_name=<something>`

Email : `email=<something@nothing.com>`

Permission : `permission=<user|admin>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/createUser```

 This should return something like: 
 ### Sample Response: 
 
 ```
{"id":1}
 ```
 
 CURL EXAMPLE: 
 
 ```
 curl -XPOST http://localhost:8080/api/createUser -d "first_name=something&last_name=something&email=something&permission=something" 
 ```

 ## 6. Edit a User
 
 POST `/api/editUser` will edit a user with the supplied first_name, last_name, email, and permission
### Request:
**Base URL**: ```http://localhost:8080/api/editUser```
**Method**: `POST`
**Params**:
First Name: `first_name=<something>`

Last Name: `last_name=<something>`

Email : `email=<something@nothing.com>`

Permission : `permission=<user|admin>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/editUser```

 This should return something like: 
 ### Sample Response: 
 
 ```
{"id":1}
 ```
 
 CURL EXAMPLE: 
 
 ```
 curl -XPOST http://localhost:8080/api/editUser -d "first_name=something&last_name=something&email=something&permission=something" 
 ```

 ## 7. Delete a User
 
 POST `/api/deleteUser` will delete a user, given a user id 

### Request:
**Base URL**: ```http://localhost:8080/api/deleteUser```
**Method**: `POST`
**Params/Post Data**: 
UserId: `userId=<user identification number>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/deleteUser```
This should return something like: 
 ### Sample Response: 
 
 ```
 Successfully deleted User
 ```
 
 CURL EXAMPLE: 
 
```
curl -XPOST http://localhost:8080/api/deleteUser -d "userId=1" 
```

## 8. Change a user Permission
 
 POST `/api/changeUserPermission` will change a user permission, given a user id and permission level

### Request:
**Base URL**: ```http://localhost:8080/api/changeUserPermission```
**Method**: `POST`
**Params/Post Data**: 
UserId: `userId=<user identification number>`

Permission: `permission=<user|admin>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/changeUserPermission```
This should return something like: 
 ### Sample Response: 
 
 ```
{"id":1}
 ```
 
 CURL EXAMPLE: 
 
```
curl -XPOST http://localhost:8080/api/changeUserPermission -d "userId=1&permission=admin" 
```

## 9. Initial login a user
 
 POST `/api/initial_login` will login a user in, if user doesn't exist in database, create a new user with passed in parameters

### Request:
**Base URL**: ```http://localhost:8080/api/initial_login```
**Method**: `POST`
**Params/Post Data**: 
First Name: `first_name=<something>`

Last Name: `last_name=<something>`

Email : `email=<something@nothing.com>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/initial_login```
This should return something like: 
 ### Sample Response: 
 
 ```
 {
  "userId": 1,
  "name": "John Doe",
  "email": "jdoe1234@rit.edu",
  "permission": "user"
 }
 ```
 
 CURL EXAMPLE: 
 
```
curl -XPOST http://localhost:8080/api/initial_login -d "first_name=something&last_name=something&email=something" 
```

 ## 10. Get all the events

GET `/api/getEvents` will return all the events regiestered in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getEvents```
**Params**: `None`
**Method**: `GET `

### Sample Request: 
```http://localhost:8080/api/getEvents```
This should return something like: 

### Response: 
 ```
 [
  {
    "eventId": 1,
    "title": "RIT Spring Fest",
    "description": "RIT annual event",
    "creation_date": "1520295410",
    "start_time": "1523523600",
    "end_time": "1523541600",
    "author": "Chris Vuong",
    "location": "RIT campus",
    "price": 0,
    "hashtag": "RITSpringFest",
    "status": "open"
  },
  {
    "eventId": 2,
    "title": "Trip to the Planetarium",
    "description": "RIT daily event",
    "creation_date": "1520295000",
    "start_time": "1523523600",
    "end_time": "1523541600",
    "author": "Chris Vuong",
    "location": "RIT campus",
    "price": 25,
    "hashtag": "StevesBirthday",
    "status": "open"
  }
]

 ```
  CURL Example:
 ```
  curl -XGET http://localhost:8080/api/getEvents
 ```
 
 ## 11.  Get an Event by EventId

GET `/api/getEvent` will return all the users in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getEvent```
**Method**: `GET`
**Params**: `eventId=<event identification number>`

### Sample Request: 
Let's get an event with id = 1

```http://localhost:8080/api/getEvent?eventId=1                                   ```

The above request will return something like: 
### Response: 
 ```
{
  "eventId": 1,
  "title": "RIT Spring Fest",
  "description": "RIT annual event",
  "creation_date": "1520295410",
  "start_time": "1523523600",
  "end_time": "1523541600",
  "author": "Chris Vuong",
  "location": "RIT campus",
  "price": 0,
  "hashtag": "RITSpringFest",
  "status": "open"
}
 ```
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getEvent?eventId=1
 ```
 
  ## 12. Create an Event 

POST `/api/createEvent` will create an event 

### Request:
**Base URL**: ```http://localhost:8080/api/createEvent```
**Method**: `GET`
**Params**: 

Title: `title=<string>`

StartTime: `start_time=<integer>`

End_time : `end_time=<integer>`

Creation_time : `creation_time=<integer>`

Author : `author=<integer>`

Location: `location=<string>`

Price : `price=<double>`

Hashtag : `tag=<string>`

Image : `image=<string>`

### Sample Request: 
This requires a post request. Please, refer to the curl request, below 

The above request will return something like: 
### Response: 
 ```
 Successfully created event
 ```
 
 ### Error Response: 
 
 ```
 Invalid url parameters
 
 ```
  CURL Example:
 
 ```
curl -d "title=something&start_time=1234&end_time=1234&creation_date=1234&author=1&location=RIT&price=10&tag=test" -XPOST http://localhost:8080/api/createEvent  
 ```

   ## 13. Edit an Event 

POST `/api/editEvent` will edit an event by given eventId

### Request:
**Base URL**: ```http://localhost:8080/api/editEvent```
**Method**: `GET`
**Params**: 

Title: `title=<string>`

start_time: `start_time=<integer>`

End_time : `end_time=<integer>`

Location: `location=<string>`

Price : `price=<double>`

Hashtag : `hashtag=<string>`

eventId : `eventId=<integer>`

Image : `image=<string>`

### Sample Request: 
This requires a post request. Please, refer to the curl request, below 

The above request will return something like: 
### Response: 
 ```
 Successfully created event
 ```
 
 ### Error Response: 
 
 ```
 Invalid url parameters
 
 ```
  CURL Example:
 
 ```
curl -d "title=something&start_time=1234&end_time=1234&author=1&location=RIT&price=10&tag=test" -XPOST http://localhost:8080/api/editEvent  
 ```

 ## 14.  Cancel an event

GET `/api/cancelEvent` will cancel event by given eventId

### Request:
**Base URL**: ```http://localhost:8080/api/cancelEvent```
**Method**: `GET`
**Params**: `eventId=<event identification number>`

### Sample Request: 
Let's get an event with id = 1

```http://localhost:8080/api/cancelEvent?eventId=1                                   ```

The above request will return something like: 
### Response: 
 ```
Successfully canceled event
 ```
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/cancelEvent?eventId=1
 ```

 ## 15.  Cancel an event

GET `/api/expireEvent` will expire event by given eventId

### Request:
**Base URL**: ```http://localhost:8080/api/expireEvent```
**Method**: `GET`
**Params**: `eventId=<event identification number>`

### Sample Request: 
Let's get an event with id = 1

```http://localhost:8080/api/expireEvent?eventId=1                                   ```

The above request will return something like: 
### Response: 
 ```
Successfully expired event
 ```
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/expireEvent?eventId=1
 ```

## 15. Get an order
 
 POST `/api/getOrder` will get the order by given orderId
### Request:
**Base URL**: ```http://localhost:8080/api/getOrder```
**Method**: `POST`
**Params/Post Data**: 
Order Id: `orderId=<order identification number>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/getOrder```

This should return something like: 
 ### Sample Response: 
 
 ```
{
  "first_name":"Chris",
  "last_name":"Vuong",
  "title":"RIT Spring Fest",
  "price":0
}
 ```
 
 CURL EXAMPLE: 
 
```
curl -d "orderId=1" -XPOST http://localhost:8080/api/getOrder
```

 ## 16. Get Orders

GET `/api/getOrders` will get all the orders in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getOrders```
**Method**: `GET`
**Params**: `None`

### Sample Request: 

```http://localhost:8080/api/getOrders```

This should return something like: 
### Response: 
 ```
[
  {
  "first_name":"Chris",
  "last_name":"Vuong",
  "title":"RIT Spring Fest",
  "price":0
  },
  {
  "first_name":"John",
  "last_name":"Smith",
  "title":"RIT Spring Fest",
  "price":0
  }
]
 ```
 
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getOrders
 ```

 ## 17. Create an order
 
 POST `/api/createOrder` will create an order given userid, eventid, price

### Request:
**Base URL**: ```http://localhost:8080/api/createOrder```
**Method**: `POST`
**Params**: 
UserId: `userId=<>`

Event Id : `eventId=<>`

Price : `Price=<int>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/createOrder```

 This should return something like: 
 ### Sample Response: 
 
 ```
{id:1}
 ```
 
 CURL EXAMPLE: 
 
 ```
 curl -d "userId=1&eventId=2&price=10" -XPOST http://localhost:8080/api/createOrder
 ```

## 18. Delete an order
 
 POST `/api/deleteOrder` will delete an order, given an orderId
### Request:
**Base URL**: ```http://localhost:8080/api/deleteOrder```
**Method**: `POST`
**Params/Post Data**: 
Order Id: `orderId=<order identification number>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/deleteOrder```

This should return something like: 
 ### Sample Response: 
 
 ```
 Successfully deleted order
 ```
 
 CURL EXAMPLE: 
 
```
curl -d "orderId=1" -XPOST http://localhost:8080/api/deleteOrder
```

 
## 19. Get currency conversion

GET `/api/getCurrencyConversion` will return all the conversion values for different currencies

### Request:
**Base URL**: ```http://localhost:8080/api/getCurrencyConversion```
**Method**: `GET`
**Params**: `None`

### Sample Request: 

```http://localhost:8080/api/getCurrencyConversion```

This should return something like: 
### Response: 
 ```
{
  "GBP": 0.71981,
  "INR": 64.879997,
  "EUR": 0.805199,
  "BTC": 9.3e-05,
  "CAD": 1.292302
}
 ```
 
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getCurrencyConversion?amount=1
 ```

 ## 20. Get a message
 
 POST `/api/getMessage` will get the message by given messageId
### Request:
**Base URL**: ```http://localhost:8080/api/getMessage```
**Method**: `POST`
**Params/Post Data**: 
Message Id: `messageId=<message identification number>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/getMessage```

This should return something like: 
 ### Sample Response: 
 
 ```
{  
   "message_id":1,
   "from_user":1,
   "to_user":2,
   "shared_time":1524680000,
   "message":"Enjoy your Spring Fest",
   "event_id":1
}
 ```
 
 CURL EXAMPLE: 
 
```
curl -d "messageId=1" -XPOST http://localhost:8080/api/getMessage
```

## 21. Get a message to user
 
 POST `/api/getMessageByUser` will get all messages to a user by the given userId
### Request:
**Base URL**: ```http://localhost:8080/api/getMessageByUser```
**Method**: `POST`
**Params/Post Data**: 
User Id: `userId=<user identification number>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/getMessageByUser```

This should return something like: 
 ### Sample Response: 
 
 ```
[  
   {  
      "message_id":2,
      "from_user":2,
      "to_user":1,
      "shared_time":1524200000,
      "message":"Start your reading now",
      "event_id":2
   }
]
 ```
 
 CURL EXAMPLE: 
 
```
curl -d "userId=1" -XPOST http://localhost:8080/api/getMessageByUser
```

 ## 22. Get Messages

GET `/api/getMessages` will get all the orders in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getMessages```
**Method**: `GET`
**Params**: `None`

### Sample Request: 

```http://localhost:8080/api/getMessages```

This should return something like: 
### Response: 
 ```
[  
   {  
      "message_id":1,
      "from_user":1,
      "to_user":2,
      "shared_time":1524680000,
      "message":"Enjoy your Spring Fest",
      "event_id":1
   },
   {  
      "message_id":2,
      "from_user":2,
      "to_user":1,
      "shared_time":1524200000,
      "message":"Start your reading now",
      "event_id":2
   }
]
 ```
 
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getMessages
 ```

 ## 23. Add a new message
 
 POST `/api/addMessage` will create an order given userid, eventid, price

### Request:
**Base URL**: ```http://localhost:8080/api/addMessage```
**Method**: `POST`
**Params**: 
Event id: `eventId=<integer>`

From_user: `from_user=<integer>`

To_user: `to_user=<integer>`

Message : `message=<string>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/addMessage```

 This should return something like: 
 ### Sample Response: 
 
 ```
{id:1}
 ```
 
 CURL EXAMPLE: 
 
 ```
 curl -d "eventId=2&from_user=1&to_user=2&message=Ola!" -XPOST http://localhost:8080/api/addMessage
 ```

## 24. Delete a message
 
 POST `/api/deleteMessage` will delete a message, given by the messageId
### Request:
**Base URL**: ```http://localhost:8080/api/deleteMessage```
**Method**: `POST`
**Params/Post Data**: 
Message Id: `orderId=<order identification number>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/deleteMessage```

This should return something like: 
 ### Sample Response: 
 
 ```
 Successfully deleted message
 ```
 
 CURL EXAMPLE: 
 
```
curl -d "messageId=1" -XPOST http://localhost:8080/api/deleteMessage
```