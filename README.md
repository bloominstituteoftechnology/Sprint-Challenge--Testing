# Assessing your Testing Fu

* Keep Calm! Test On!
* Now that you're familiar with the concepts of testing, your goal is to write documentation and tests for an API that is already in production. (This happens a lot :))
* Answers to your written questions will be recorded in _Answers.md_
* This is to be worked on alone but you can use outside resources. You can _reference_ any old code you may have, and the React Documentation, however, please refrain from copying and pasting any of your answers. Try and understand the question and put your responses in your own words. Be as thorough as possible when explaining something.
* **Just a friendly Reminder** Don't fret or get anxious about this, this is a no-pressure assessment that is only going to help guide you here in the near future. This is NOT a pass/fail situation.

## Start by forking and cloning this repository.

## Questions - Self Study - You can exercise your Google-Fu for this and any other _Sprint Challenge_ in the future.

1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?
  - `before` and `after` will run hooks before/after all tests are run. `beforeEach` and `afterEach` will run hooks before/after each individual test.
  - These hooks are normally used to initialize / remove connections and mock data.
1. What is the point of Test Driven Development? What do you personally think about this approach?
  - Test driven development ensures that changes to your codebase won't break other sections of the code and (usually) allows for faster development because the specific requirements are laid out in the tests.
1. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
  - A sinon spy attaches to a callback function (or mocks a callback) and ensures that the callback is being called properly (e.g. the callback is called once for each element in an array or the callback is executed on specific elements of an array).

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

# API Documentation

## [POST] `/api/game/create`
Description: Creates a new game with a title, date, and genre.

__Request Body Parameters__:

|  Field  | Type | Description
|---------|------|--------------------------------------------|
|title    |String|Title of the game.                          |
|date     |String|MMM/YYYY date that the game was released.   |
|genre    |String|Genre of the game.                          |

__Request example__:
```
{
  "title": "Super Mario Bros.",
  "date": "September 1985",
  "genre": "Platformer"
}
```

__Success 200 Response__:

|  Field  | Type | Description
|---------|--------|--------------------------------------------|
|_id      |String  |String of the object's unique Mongo ID.     |
|title    |String  |Title of the game.                          |
|date     |String  |MMM/YYYY date that the game was released.   |
|genre    |String  |Genre of the game.                          |

__Response example__:
```
{
  "_id"  : "5a5e47422518b901d2b1e309"
  "title": "Super Mario Bros.",
  "date" : "September 1985",
  "genre": "Platformer"
}
```

__Error 422 Response__:

|  Field  | Type | Description
|---------|-------|---------------------------------------------------------|
|error    |String |A generic error message.                                 |
|message  |String |The error message from the exception stack trace.        |

__Response example__:
```
{ 
  "error"  : "Error saving data to the DB"
  "message": "title is a required field"
}
```

## [GET] `/api/game/get`
Description: Fetches an array of games that exist in the database.

__Request Body Parameters__: N/A

__Success 200 Response__:

|  Field  | Type | Description
|---------|-------------|---------------------------------------------|
|games    |Array\<Games>|An array of all games that were found.       |


__Response example__:
```
{ 
  "games": [
    {
      "_id"  : "5a5e47422518b901d2b1e309"
      "title": "Super Mario Bros.",
      "date" : "September 1985",
      "genre": "Platformer"
    },
    {
      "_id"  : "5a5e47422518b901d2b1e310"
      "title": "Dankey Kang",
      "date" : "July 1981",
      "genre": "Platformer"
    }
  ]
}
```

__Error 500 Response__:

|  Field  | Type | Description
|---------|-------|-----------------------------------------------|
|message  |String |A message describing an internal server error. |

__Response example__:
```
{ 
  message: 'Something really bad happened'
}
```

## [PUT] `/api/game/update`
Description: Updates a game's title by ID.

__Request Body Parameters__:

|  Field  | Type | Description
|---------|------|-----------------------------------|
|id       |String|Mongo ID of the game to update.    |
|title    |String|The updated title of the game.     |

__Request example__:
```
{
  "id"   : "5a5e47422518b901d2b1e310",
  "title": "Donkey Kong"
}
```


__Success 200 Response__:

|  Field  | Type | Description
|---------|--------|--------------------------------------------|
|_id      |String  |String of the object's unique Mongo ID.     |
|title    |String  |Updated title of the game.                  |
|date     |String  |MMM/YYYY date that the game was released.   |
|genre    |String  |Genre of the game.                          |

__Response example__:
```
    {
      "_id"  : "5a5e47422518b901d2b1e310"
      "title": "Donkey Kong", //was "Dankey Kang" before being updated
      "date" : "July 1981",
      "genre": "Platformer"
    }
```

__Error 422 Response__:

|  Field  | Type | Description
|---------|-------|-----------------------------------------------------------------|
|error    |String |Error message describing an input error or non-existing game ID. |

__Response example__:
```
{ 
  "error": "Cannot find game by that id"
}
```

__Error 500 Response__:

|  Field  | Type | Description
|---------|-------|-----------------------------------------------|
|error    |String |A message describing an internal server error. |

__Response example__:
```
{ 
  "message": "Something really bad happened"
}
```

## [DELETE] `/api/game/destroy/:id`
Description: Deletes a game by ID if the game exists.

__Request Body Parameters__: 

|  Field  | Type | Description
|---------|--------|-------------------------------------------------------------------------------|
| id      |String  |Mongo ID of the game to delete (optional if specified in the route params)     |

__Request example__:
```
{
  "id"  : "5a5e47422518b901d2b1e309"
},
```

__Success 200 Response__:

|  Field  | Type  | Description
|---------|-------|----------------------------------------|
|success  |String |"(Game title)" was removed from the DB" |

__Response example__:
```
{ 
  "success": "Super Mario Bros. was removed from the DB"
}
```

__Error 422 Response__:

|  Field  | Type | Description
|---------|-------|-----------------------------------------------------------------|
|error    |String |Error message describing an input error or non-existing game ID. |

__Response example__:

```
{ 
  "error": "You need to give me ID"
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
#### End of API documentation

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
