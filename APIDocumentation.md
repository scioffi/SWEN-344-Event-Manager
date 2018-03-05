# API Documentation : Event Management System

## Overview
Event Manager's API documentation. No authentication is required to call the API at the moment. You can simple call the specified endpoints as represented below.

## Get User by userId

GET `/api/getUsers` will return all the users in the system

### Request:
**Base Url**: ```http://localhost:8080/getUser```
**Parameters**: ```userId=<user identification number>```
**Method**: `GET `
This should return something like: 

Sample Request: 

```http://localhost:8080/getUser?userId=1```

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












## Get All Users

GET `/api/getUsers` will return all the users in the system

### Request:
**URL**: ```http://localhost:8080/getUsers```
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



