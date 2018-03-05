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

GET `/api/getUsers` will return all the users in the system

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
    "creationDate": "2-27-2017",
    "startTime": "8am",
    "endTime": "5pm",
    "author": "Chris Vuong",
    "location": "RIT campus",
    "price": 0,
    "hashtag": "#RITSpringFest",
    "status": "open"
  },
  {
    "eventId": 2,
    "title": "RIT Drinking Party",
    "description": "RIT daily event",
    "creationDate": "3-1-2018",
    "startTime": "8am",
    "endTime": "5pm",
    "author": "Chris Vuong",
    "location": "RIT campus",
    "price": 25,
    "hashtag": "#RITDrinkingParty",
    "status": "open"
  }
]

 ```
 
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getEvents
 ```
 
 ## 4.  Get an Event by EventId

GET `/api/getUsers` will return all the users in the system

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
  "creationDate": "2-27-2017",
  "startTime": "8am",
  "endTime": "5pm",
  "author": "Chris Vuong",
  "location": "RIT campus",
  "price": 0,
  "hashtag": "#RITSpringFest",
  "status": "open"
}
 ```
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/getEvent?eventId=1
 ```
 
  ## 5. Create an Event 

GET `/api/createEvent` will create an event 

### Request:
**Base URL**: ```http://localhost:8080/api/createEvent```
**Method**: `GET`
**Params**: 
`title`
`startTime`
`endTime`
`author`
`location`
`price`
`hashtag`

This should return something like: 

### Sample Request: 
Let's get an event with id = 1

```http://localhost:8080/api/createEvent?                              ```

The above request will return something like: 
### Response: 
 ```
 Successfully created event
 
 ```
  CURL Example:
 
 ```
  curl -XGET http://localhost:8080/api/createEvent?
  
 ```
 
 
 
 
 
 


