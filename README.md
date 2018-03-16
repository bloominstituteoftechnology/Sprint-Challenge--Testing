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
  RETRO NES GAME LIBRARY
==========
###### *A TEST DRIVEN DEVELOPMENT API* 




This api will allow you to unit test server endpoint  methods using chai, mocha, and sinon modules.  It uses a basic Node RESTful API.
You can test CRUD operations on a game library.
## :heavy_check_mark: <b>You will need to have:</b>
####  *Node.js*
<ul>
    <li>it is assumed you have a basic understanding of node.js as it is an essential part of this api.</li>
</ul>

#### *POSTMAN*
<ul>
    <li>a very powerful API debugger for making fast HTTP requests.</li>
    <li>all postman requests must be sent in json format. See the example below. All fields are required except where noted.</li>
</ul>
<pre><code>
    {
        "title": "title of game",
        "genre": "genre of game"
        "releaseDate": "date game was released",
    }
    </pre></code>


#### *MongoDB*
<ul>
    <li>the database that our express server will be connecting to.</li>
</ul>

##  :wrench:Configuration
<ul>
    <li>make sure dependencies are installed by running <i>npm install</i> from the terminal within the main directory.</li>
    <li>make sure you have MongoDB running before starting the test server, it may also help to have MongoDB compass installed so you can monitor MongoDB's connectivity and changes.</li>
    <li>in a separate terminal window run <i>npm test</i> to begin testing</li>
    <li>direct all requests through POSTMAN on localhost:5050.  All endpoints and allowed requests will be discussed in the next section.</li>
</ul>

##  :airplane:  Endpoints
This API allows you to perform POST, PUT, GET, and DELETE requests.


| ENDPOINT          | TYPE   | DATA | ACTION                                   |
|-------------------|--------|------|------------------------------------------|
| /api/game/get     | GET    | json | displays list of all game from the database |
| /api/game/create    | POST   | json | creates a new game         |
| /api/game/:id | GET    | json | gets a single game<br>              |
| /api/game/update/:id | PUT    | json | updates a single game                |
| /api/game/destroy/:id | DELETE | json | deletes a single game                 |


```
  THIS NEEDS TO BE FILLED IN WITH YOUR BEAUTIFUL DOCUMENTATION. IF YOU DID THIS RIGHT DURING THE PROJECT YOU SHOULD BE ABLE TO PORT OVER YOUR WORK, AND CHANGE IT TO FIT THE NEW API.
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
