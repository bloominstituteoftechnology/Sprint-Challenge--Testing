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
 ### Abby's API Documentation is Below!
 ## API Documentation ##
Here is the documentation for the API. It will provide information for interfacing with the API. This API has information for NES Games (Boo GO SEGA). The information you will find here will be a Game Title, Genre and Release date. These will all be strings.
### Port/Location for all endpoints to interface with the Climbs API :  http://localhost:5050

### Allowed HTTPs requests: ###
+ POST - to create a resource
+ PUT - to update a resource
+ GET - to get a resource or list of resources
+ DELETE - to delete a resource

### [POST]
| Endpoint | Type | Data |
|----|----|----|
| /api/game/create | post | json |

*Example:*
+ Fields are required

``` 
{
    title: 'Mario',
    genre: 'Action',
    releaseDate: '01/01/1991'
} 
```
+ Success Response: 
    + Content: ``` { title: 'Mario', genre: 'Action', releaseDate: '01/01/1991' } ```

+ Error Response: 
    + if error is thrown when saving new data
    + Code: 422
    + Content: ``` { error: 'Error saving data to the DB' } ```

### [PUT]
| Endpoint | Type | Data |
|----|----|----|
| /api/game/update | put | json |

*Example:*
+ Fields are required -> it and title
+ Will only update the title of the game, not the genre or release date
+ searches by id to update the title of the game

``` 
Old Data
{
    title: 'Mario',
    genre: 'Action',
    releaseDate: '01/01/1991'
} 
```
``` 
New Data
{
  id: 1,
  title: 'Mario 2'
}
```
+ Success Response: 
    + Content: ``` { title: 'Mario 2', genre: 'Action', releaseDate: '01/01/1991' } ```

+ Error Response: 
    + if no title or no id provided
    + Code: 422
    + Content: ``` { error: 'Must Provide a title && Id' } ```
+ OR
    + if no game is found
    + Code: 422
    + Content: ``` { error: 'Cannot find game by that id' } ```
+ OR
    + if error is thrown when saving new data
    + Code: 500
    + Content: ``` { error: 'Something really bad happened' } ```
    
### [GET]
| Endpoint | Type | Data |
|----|----|----|
| /api/game/get | get | json |

*Example:*
+ No input is required, will return all current data

+ Success Response: 
    + Content: ``` { title: 'Mario 2', genre: 'Action', releaseDate: '01/01/1991' }, { title: 'Mortal Kombat', genre: 'Fighting', releaseDate: '02/02/1992' } ``` 

+ Error Response: 
    + Code: 500
    + Content: ``` { error: 'Something really bad happened' } ```


### [DELETE]
| Endpoint | Type | Data |
|----|----|----|
| /api/game/destroy/:id | delete | json |

*Example:*
+ Providing id as input is required, will delete instance with id that matches what is entered

+ Success Response: 
    + Content: ``` { success: '[The Game in Question] was removed from the DB' } ``` 

+ Error Response: 
    + if no ID provided
    + Code: 422 NOT FOUND
    + Content: ``` { error: 'You need to give me an ID' } ```
+ OR
    + If error thrown while trying to remove game
    + Code: 422
    + Content: ``` { error: 'Cannot find game by that id' } ``` 
```
  Yay it is so nice! Look at all of this gorgeous markdown.
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
