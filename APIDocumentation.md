# API Documentation

## Overview
Event Manager's API documentation.


### Get Users /getUsers

### Request:
```http://localhost:8080/getUsers```
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



