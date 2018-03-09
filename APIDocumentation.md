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
    "username": "jdoe1234",
    "name": "John Doe",
    "email": "jdoe1234@rit.edu",
    "permission": "user"
  },
  {
    "userId": 2,
    "username": "jsmith1234",
    "name": "John Smith",
    "email": "jsmith1234@rit.edu",
    "permission": "user"
  },
  {
    "userId": 3,
    "username": "rmoore1234",
    "name": "Ryan Moore",
    "email": "rmoore1234@rit.edu",
    "permission": "user"
  },
  {
    "userId": 4,
    "username": "dkrutz1234",
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
 
 ## 2.  Get an User by UserId

GET `/api/getUser` will return all the users in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getUser```
**Method**: `GET`
**Params**: `userId=<user identification number>`

This should return something like: 

### Sample Request: 
Let's get a user whose id = 1

```http://localhost:8080/api/getUser?userId=1                                   ```

The above request will return something like: 
### Response: 
 ```
 {
  "userId": 1,
  "username": "jdoe1234",
  "name": "John Doe",
  "email": "jdoe1234@rit.edu",
  "permission": "user"
 }
 ```
 
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getUser?userId=1
 ```
 
 
 ## 3. Get all the events

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
    "creationDate": "1520295410",
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
    "creationDate": "1520295000",
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
 
 ## 4.  Get an Event by EventId

GET `/api/getEvent` will return all the users in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getEvent```
**Method**: `GET`
**Params**: `eventId=<event identification number>`

This should return something like: 

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
  "creationDate": "1520295410",
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
 
  ## 5. Create an Event 

POST `/api/createEvent` will create an event 

### Request:
**Base URL**: ```http://localhost:8080/api/createEvent```
**Method**: `GET`
**Params**: 

Title: `title=<string>`

StartTime: `start_time=<integer>`

End_time : `end_time=<integer>`

Author : `author=<string>`

Location: `location=<string>`

Price : `price=<double>`

Hashtag : `tag=<string>`

This should return something like: 

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
curl -d "title=something&start_time=1234&end_time=1234&author=Chris&location=RIT&price=10&tag=test" -XPOST http://localhost:8080/api/createEvent  
  
 ```
   ## 6. Edit an Event 

POST `/api/editEvent` will create an event 

### Request:
**Base URL**: ```http://localhost:8080/api/editEvent```
**Method**: `GET`
**Params**: 

Title: `title=<string>`

start_time: `start_time=<integer>`

End_time : `end_time=<integer>`

Author : `author=<string>`

Location: `location=<string>`

Price : `price=<double>`

Hashtag : `hashtag=<string>`

eventId : `eventId=<integer>`

This should return something like: 

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
curl -d "title=something&start_time=1234&end_time=1234&author=Chris&location=RIT&price=10&tag=test" -XPOST http://localhost:8080/api/createEvent  
  
 ```
  ## 7. Get Attendees

GET `/api/getAttendees` will get all the attendees across all events in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getAttendees```
**Method**: `GET`
**Params**: `None`

### Sample Request: 

```http://localhost:8080/api/getAttendees                            ```

This should return something like: 
### Response: 
 ```
[
  {
    "name": "John Doe",
    "eventId": 1
  },
  {
    "name": "Dan Krutz",
    "eventId": 2
  }
]
 ```
 
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getAttendees
  
 ```

 
 
 ## 8. Create a User
 
 POST `/api/createUser` will create a user with the supplied username, name and email

### Request:
**Base URL**: ```http://localhost:8080/api/createUser```
**Method**: `POST`
**Params**: 
Username: `username=<something>`

Name: `name=<something>`

Email : `email=<something@nothing.com>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/createUser                            ```

 
 ### Sample Response: 
 
 ```
 Successfully created User
 ```
 
 CURL EXAMPLE: 
 
 ```
 curl -XPOST http://localhost:8080/api/createUser -d "username=something&name=something&email=something" 
 ```
 
 
 ## 9. Delete a User
 
 POST `/api/deleteUser` will delete a user, given a user id 

### Request:
**Base URL**: ```http://localhost:8080/api/createUser```
**Method**: `POST`
**Params/Post Data**: 
UserId: `userId=<user identification number>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/deleteUser                            ```

 ### Sample Response: 
 
 ```
 Successfully deleted User
 ```
 
 CURL EXAMPLE: 
 
```
curl -XPOST http://localhost:8080/api/deleteUser -d "userId=1" 

```

 ## 10. Get Orders

GET `/api/getOrders` will get all the orders in the system

### Request:
**Base URL**: ```http://localhost:8080/api/getOrders```
**Method**: `GET`
**Params**: `None`

### Sample Request: 

```http://localhost:8080/api/getOrders                            ```

This should return something like: 
### Response: 
 ```
[
  {
    "userId": 1,
    "eventId": 1,
    "price": 0,
    "currency": "BTC"
  },
  {
    "userId": 2,
    "eventId": 2,
    "price": 25,
    "currency": "USD"
  },
  {
    "userId": 3,
    "eventId": 2,
    "price": 25,
    "currency": "GBP"
  }
]
 ```
 
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getOrders
  
 ```

 ## 11. Delete an Event
 
 POST `/api/deleteEvent` will delete an event, given an event id

### Request:
**Base URL**: ```http://localhost:8080/api/deleteEvent```
**Method**: `POST`
**Params/Post Data**: 
EventId: `eventId=<event identification number>`

### Sample Request: 

The request requires post data, please see the sample curl request below: 
```http://localhost:8080/api/deleteEvent                            ```

 ### Sample Response: 
 
 ```
 Successfully deleted event
 ```
 
 CURL EXAMPLE: 
 
```
curl -XPOST http://localhost:8080/api/deleteEvent -d "eventId=1" 

```

## 12. Add an attendee
 
 POST `/api/addAttendee` will add an attendee to an event
 
### Request:
**Base URL**: ```http://localhost:8080/api/createUser```
**Method**: `POST`
**Params/Post Data**: 
UserId: `userId=<user identification number>`

Name: `name=<someone>`


### Sample Request: 

The request requires post data, please see sample curl request below: 

```http://localhost:8080/api/addAttendee                            ```

 
 ### Sample Response: 
 
 ```
 Successfully added attendee
 ```
 
 CURL EXAMPLE: 
 
 ```
curl -d "userId=1&name=John" -X POST http://localhost:8080/api/addAttendee
 ```
 
 
 
 ## 13. Delete an attendee
 
 POST `/api/deleteAttendee` will delete an attendee, given a attendee/user id 

### Request:
**Base URL**: ```http://localhost:8080/api/deleteAttendee```
**Method**: `POST`
**Params/Post Data**: 
UserId: `userId=<user identification number>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/deleteAttendee                            ```

 ### Sample Response: 
 
 ```
 Successfully deleted attendee
 ```
 
 CURL EXAMPLE: 
 
```
curl -XPOST http://localhost:8080/api/deleteAttendee -d "userId=1" 

```


 ## 14. Create an order
 
 POST `/api/createOrder` will create an order given userid, eventid, price, and currency

### Request:
**Base URL**: ```http://localhost:8080/api/reateOrder```
**Method**: `POST`
**Params**: 
UserId: `userId=<>`

Event Id : `eventId=<>`

Price : `Price=<int>`

Currency : `currency=<>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/createOrder                            ```

 
 ### Sample Response: 
 
 ```
 Successfully created order
 ```
 
 CURL EXAMPLE: 
 
 ```
 curl -d "userId=1&eventId=2&price=10&currency=USD" -XPOST http://localhost:8080/api/createOrder
 
 ```

## 15. Delete an order
 
 POST `/api/deleteOrder` will delete an order, given a event and user id
### Request:
**Base URL**: ```http://localhost:8080/api/deleteOrder```
**Method**: `POST`
**Params/Post Data**: 
Event Id: `eventId=<event identification number>`

User Id: `userId=<user identification number>`

### Sample Request: 

The request requires post data, please see sample curl request below: 
```http://localhost:8080/api/deleteOrder                            ```

 ### Sample Response: 
 
 ```
 Successfully deleted order
 ```
 
 CURL EXAMPLE: 
 
```
curl -d "eventId=1&userId=2" -XPOST http://localhost:8080/api/deleteOrder

```

 
## 16. Get Attendees

GET `/api/getCurrencyConversion` will return all the conversion values for different currencies

### Request:
**Base URL**: ```http://localhost:8080/api/getCurrencyConversion```
**Method**: `GET`
**Params**: `None`

### Sample Request: 

```http://localhost:8080/api/getCurrencyConversion                            ```

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
  curl -XGET http://localhost:8080/api/getCurrencyConversion
  
 ```


