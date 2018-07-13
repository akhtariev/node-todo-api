# node-todo-api
API for adding and tracking activities todo deployed on heroku. Created while taking a course on udemy about Node.js. Concepts/Frameworks used: MongoDB, Mongoose, Postman, deploying apps on heroku, creating own APIs, Express, Mocha, Expect libraries


**URL:** https://guarded-cove-28264.herokuapp.com

Example command: POST https://guarded-cove-28264.herokuapp.com/users

## Commands for Postman (https://www.getpostman.com/)

### User functionality

1. **POST /users/**  - to create your account
- Body: 
```javascript
{
  "email": "youremail@example.com",
  "password": "password"
}
```
Note the value of your x-auth header


2. **GET /users/me** - get your account info

Send your x-auth value in header


3. **POST /users/login** - to login and get a new x-auth token
- Body: 
```javascript
{
  "email": "youremail@example.com",
  "password": "password"
}
```

4. **DELETE/users/me/token** - to logout (your x-auth token will be removed)



### TODOs functionality


1. **POST /todos** - to create a new todo item
- Body: 
```javascript
{
	"text": "Something todo"
}
```

2. **GET /todos** - to retrieve all your todos

Send your x-auth value in header

- Sample output: 
```javascript
{
    "todos": [
        {
            "completed": true,
            "completedAt": 1531519391778,
            "_id": "5b491b3563de81001443aae4",
            "text": "Updates from postman",
            "_creator": "5b491aef63de81001443aae2",
            "__v": 0
        },
        {
            "completed": false,
            "completedAt": null,
            "_id": "5b491b3f63de81001443aae5",
            "text": "Something todo",
            "_creator": "5b491aef63de81001443aae2",
            "__v": 0
        }
    ]
}
```

3. **GET /todos/:id** - to retrieve a specific todo by id

Send your x-auth value in header

- Sample output for id: 5b491b3563de81001443aae4 : 
```javascript
{
    "todo": {
        "completed": true,
        "completedAt": 1531519391778,
        "_id": "5b491b3563de81001443aae4",
        "text": "Something todo",
        "_creator": "5b491aef63de81001443aae2",
        "__v": 0
    }
}
```

4. **PATCH /todos/:id** - to update a todo by id

Send your x-auth value in header

- Body:
```javascript
{
	"completed" : true, 
	"text": "Updates from postman"
}
```

- Sample output for id: 5b491b3563de81001443aae4 : 
```javascript
{
    "todo": {
        "completed": true,
        "completedAt": 1531519391778,
        "_id": "5b491b3563de81001443aae4",
        "text": "Updates from postman",
        "_creator": "5b491aef63de81001443aae2",
        "__v": 0
    }
}

5. **DELETE /todos/:id - to delete a todo by id and retrieve it

Send your x-auth value in header

- Sample output for id: 5b491b3563de81001443aae4 : 
```javascript
{
    "todo": {
        "completed": true,
        "completedAt": 1531519391778,
        "_id": "5b491b3563de81001443aae4",
        "text": "Updates from postman",
        "_creator": "5b491aef63de81001443aae2",
        "__v": 0
    }
}






