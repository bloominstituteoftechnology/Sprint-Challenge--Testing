# Assessing your Testing Fu

* Keep Calm! Test On!
* Now that you're familiar with the concepts of testing, your goal is to write documentation and tests for an API that is already in production. (This happens a lot :))
* Answers to your written questions will be recorded in _Answers.md_
* This is to be worked on alone but you can use outside resources. You can _reference_ any old code you may have, and the React Documentation, however, please refrain from copying and pasting any of your answers. Try and understand the question and put your responses in your own words. Be as thorough as possible when explaining something.
* **Just a friendly Reminder** Don't fret or get anxious about this, this is a no-pressure assessment that is only going to help guide you here in the near future. This is NOT a pass/fail situation.

## Start by forking and cloning this repository.

## Questions - Self Study - You can exercise your Google-Fu for this and any other _Sprint Challenge_ in the future.

1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?
1. What is the point of Test Driven Development? What do you personally think about this approach?
1. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

## Initializing Project -

* Fork/Clone this project into a directory on your machine.
* `cd` into your forked local copy.
* notice there is a `package.json` file included. We have included all of the dev-dependencies that you'll need to build your project.
* run `npm install` to download all the dependencies you need for this project.
* run `npm test` to start your tests.
* Keep an active log of your changes by `commiting` and `pushing` often.
* Write all of your tests in the `server.test.js` file. This is where you're going to be doing your API mocking/testing.
* Once you're done writing all the tests, push your commits to your fork and submit a Pull-Request.

## Project Description

* You're going to be writing the documentation and the tests for a CRUD API.
* The API itself is really simple. You're task is to peek at the endpoints found in the `server.js` file and write docs for each one, then write the tests for the end points.

## DOCUMENTATION GOES HERE

```
  THIS NEEDS TO BE FILLED IN WITH YOUR BEAUTIFUL DOCUMENTATION. IF YOU DID THIS RIGHT DURING THE PROJECT YOU SHOULD BE ABLE TO PORT OVER YOUR WORK, AND CHANGE IT TO FIT THE NEW API.
```
# GAME API OVERVIEW
This describes the resources that make up the **GAME** REST API.
# Schema
All API access is over HTTP, and accessed from `http://localhost:5050/`. All data is sent and received as JSON.
## [GET] Retrieve all the games
Return a collection of games

| Endpoint | HTTP Method | URL Params | Data Params | Return Data Type |
|:----:|:----:|:----:|:----:|:----:|
| /api/game/get | [GET] | None | None | JSON |

**Data Params Example**<br>
None

**Sample Call:**
```
axios.get('/api/game/get')
  .then(games => console.log(games));
```
## Response:

| Type | Status | Description |
|:----:|:----:|:----:|
| Success | 200 | Game Array |

**Response example:**
```
[
  {
    title: "WOW",
    genre: "Real-time strategy",
    data: "2004"
  },
  {
    ...
  },
  ...
]
```
| Type | Status | Description |
|:----:|:----:|:----:|
| Fail | 500 | Failure message |

**Response example:**
```
{
  error: "Something really bad happened"
}
```
## [POST] Create a game
Return newly created game

| Endpoint | HTTP Method | URL Params | Data Params | Return Data Type |
|:----:|:----:|:----:|
| /api/game/create | [POST] | None | New game data | JSON |

**Data Params Example**
```
{
  title: "WOW",
  genre: "Real-time strategy",
  date: "2004"
}
```

**Sample Call:**
```
axios.post('/api/game/create', { title: [String], genre: [String], date: [String] })
  .then(newGame => console.log(newGame));
```
## Response:

| Type | Status | Description |
|:----:|:----:|:----:|
| Success | 201 | Newly created game |

**Response example:**
```
{
  title: "WOW",
  genre: "Real-time strategy",
  data: "2004"
}
```
| Type | Status | Description |
|:----:|:----:|:----:|
| Fail | 422 | Failure message |

**Response example:**
```
{
  error: "Error saving data to the DB", message: [error object]
}
```

## [PUT] Update a game title by id
Return updated game

| Endpoint | HTTP Method | URL Params | Data Params | Return Data Type |
|:----:|:----:|:----:|:----:|:----:|
| /api/game/update | [PUT] | None | Update game title | JSON |

**Data Params Example**
```
{
  id: [Mongo ObjectID],
  title: "WOW"
}
```

**Sample Call:**
```
axios.put('/api/game/update', { id: [Mongo ObjectID], title: [String] })
  .then(newGame => console.log(newGame));
```
## Response:

| Type | Status | Description |
|:----:|:----:|:----:|
| Success | 200 | Updated game |

**Response example:**
```
{
  title: "WOW",
  genre: "Real-time strategy",
  data: "2004"
}
```
| Type | Status | Description |
|:----:|:----:|:----:|
| Fail | 422 | Game not found |

**Response example:**
```
{
  error: "Cannot find game by that id"
}
```
| Type | Status | Description |
|:----:|:----:|:----:|
| Fail | 500 | Game update failed |

**Response example:**
```
{
  error: "Something really bad happened"
}
```

## [DELETE] Delete a game by id
Return removed game title

| Endpoint | HTTP Method | URL Params | Data Params | Return Data Type |
|:----:|:----:|:----:|:----:|:-----:|
| /api/game/destroy/:id | [PUT] | Game id/None | Game id/None | JSON |

**Data Params Example**
```
{
  id: [Mongo ObjectID]
}
```

**Sample Call:**
```
axios.put('/api/game/destroy/[game id]')
  .then(removedGame => console.log([removed message]));

axios.put('/api/game/destroy/:id', { id: [game id] })
  .then(removedGame => console.log([removed message]));
```
## Response:

| Type | Status | Description |
|:----:|:----:|:----:|
| Success | 200 | Removed game |

**Response example:**
```
{
  success: `[removed game title] was removed from the DB`
}
```
| Type | Status | Description |
|:----:|:----:|:----:|
| Fail | 422 | No game id |

**Response example:**
```
{
  error: 'You need to give me an ID'
}
```
| Type | Status | Description |
|:----:|:----:|:----:|
| Fail | 422 | Game not found |

**Response example:**
```
{
  error: 'Cannot find game by that id'
}
```

## TESTS

* I have already manually tested this API for you.
* All you have to do is write Unit tests to ensure that the end points do what they're supposed to do.
* THERE IS NO NEED TO NPM START. BUT YOU'LL WANT TO ENSURE THAT YOU HAVE A `MONGO` INSTANCE UP AND RUNNING.

### Write a test for the "POST" method

* The Post method should take in an object that looks like this

```
{
  title: 'California Games',
  genre: 'Sports',
  date: 'June 1987'
}
```

### Write a test for the "GET" method

* Our get method should return the list of games.
* **REMINDER** That this data structure returned from Mongo will be an array, so to test your game with a `beforeEach` hook you'll need to make sure you test against the first item in the array

```
expect(res.data[0].foo).to.equal(bar.foo);
```

* Write your `PUT` and your `DELETE`

### Write a test for the "PUT" method

* Just like in class, send up the information you want changed on the server via the `req.body`.
* You can send up the Id and the Server will be using that to

## Stretch Problem

### Write a test for the "DELETE" method

* DELETE can take an ID off of the route parameter, or off of the req.body. It's your choice.

### Remember you can use any resources you want to solve these problems, but avoid copying/pasting solutions you've previously written. Also if you don't finish all of the challenges, that's fine! Just do what you can and submit your challenges in the end! HAVE FUN!
