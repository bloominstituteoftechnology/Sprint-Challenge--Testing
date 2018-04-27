# Assessing your Testing Fu

* Keep Calm! Test On!
* Now that you're familiar with the concepts of testing, your goal is to write documentation and tests for an API that is already in production. (This happens a lot :))
* Answers to your written questions will be recorded in _ANSWERS.md_
* This is to be worked on alone but you can use outside resources. You can _reference_ any old code you may have, and the React Documentation, however, please refrain from copying and pasting any of your answers. Try and understand the question and put your responses in your own words. Be as thorough as possible when explaining something.
* **Just a friendly Reminder** Don't fret or get anxious about this, this is a no-pressure assessment that is only going to help guide you here in the near future. This is NOT a pass/fail situation.

## Start by forking and cloning this repository.

## Questions - Self Study - You can exercise your Google-Fu for this and any other _Sprint Challenge_ in the future.

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
2.  What is the point of Test Driven Development? What do you personally think about this approach?
3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

## Initializing Project -

* Fork/Clone this project into a directory on your machine.
* `cd` into your forked local copy.
* notice there is a `package.json` file included. We have included all of the dev-dependencies that you'll need to build your project.
* run `yarn` to download and install all the dependencies you need for this project.
* run `yarn test` to start your tests.
* Keep an active log of your changes by committing with Git and pushing often to GitHub.
* Write all of your tests in the `server.test.js` file. This is where you're going to be doing your API mocking/testing.

## Project Description

* You're going to be writing the documentation and the tests for a CRUD API.
* The API itself is really simple. Your task is to peek at the endpoints found in the `server.js` file and write docs for each one, then write the tests for the end points.

## DOCUMENTATION GOES HERE

```
THIS NEEDS TO BE FILLED IN WITH YOUR BEAUTIFUL DOCUMENTATION. IF YOU DID THIS RIGHT DURING THE PROJECT YOU SHOULD BE ABLE TO PORT OVER YOUR WORK, AND CHANGE IT TO FIT THE NEW API.
```

# Video Game Database API

This API is for holding a database of NES games with some essential information about each game.

## Data Structure

```js
NESGame = {
  title, // Required - String
  genre, // Required - String
  releaseDate, // Not-Required - String
};
```

## API EndPoints

| TYPE   | URL                     | BODY DATA                       |
| ------ | ----------------------- | ------------------------------- |
| GET    | `/api/game/get/`        | N/A                             |
| POST   | `/api/game/create/`     | *title, *genre, releaseDate     |
| PUT    | `/api/game/update/`     | *id, *title, genre, releaseDate |
| DELETE | `/api/game/destroy/:id` | id                              |

DATA marked with a `*` is required.

### GET

* Sending a request to `/api/game/get/` required no data.
* Will return an array of all NES Games in the database.
* Server error will return `{ error: 'Something really bad happened' }`.

### POST

* Sending a `POST` erquest to `/api/game/create/` can accept `{ title, genre, releaseDate }`. `title` and `genre` are REQUIRED.
* Success will return the new NESGame object.
* Failure will return `{ error: 'Error saving data to the DB', message: err }`

### PUT

* Sending a `PUT` request to `/api/game/update` can accept `{ id, title, genre, releaseDate }`. `id` and `title` are REQUIRED.
* Success will return the updated NESGame object.
* If required information is not provided, will return a response of `{ error: 'Must Provide a title && Id' }`.
* If `id` is invalid, will return a response of `{ error: 'Cannot find game by that id' }`.
* Server error will return `{ error: 'Something really bad happened' }`.

### DELETE

* Sending a `DELETE` request to `/api/game/destroy/` can accept `{ id }`. Using this method, `id` is REQUIRED.
* Alternatively, you can send a `DELETE` request to `/api/game/destroy/:id`. No data is required.
* Sending a `DELETE` request to `/api/game/destroy/:id` and providing data if `{ id }`, the data sent in the body will take priority over the param in the address.
* Success will return `{ success: '{title} was removed from the DB' }`
* If no `id` was provided, will return a response of `{ error: 'You need to give me an ID' }`.
* If the `id` does not exist in the database, will return a response of `{ error: 'Cannot find game by that id' }`.

## TESTS

* The provided API has already been manually tested for you.
* Your job is to write unit tests to ensure that the end points do what they're supposed to do.
* Each endpoint should have multiple tests to ensure that different sorts of input are handled correctly/as expected. As a guideline, write at least two tests for each endpoint.
* THERE IS NO NEED TO `YARN START`, BUT YOU'LL WANT TO ENSURE THAT YOU HAVE A `MONGO` INSTANCE UP AND RUNNING.

### Write tests for the "POST" method

* The `POST` method should take in an object that looks like this

  ```js
  {
    title: 'California Games',
    genre: 'Sports',
    releaseDate: 'June 1987'
  }
  ```

### Write tests for the "GET" method

* Our get method should return the list of games.
* **REMINDER** That this data structure returned from Mongo will be an array, so to test your game with a `beforeEach` hook you'll need to make sure you test against the first item in the array

  ```js
  expect(res.data[0].foo).to.equal(bar.foo);
  ```

* Write your `PUT` and your `DELETE`

### Write tests for the "DELETE" method

* `DELETE` can take an ID off of the route parameter, or off of the req.body. It's your choice.

## Stretch Problem

### Write tests for the "PUT" method

* Just like in class, send up the information you want changed on the server via the `req.body`.
* You can send up the Id and the Server will be using that to find the record and then when found, update the record with the `req.body` info you sent up

### Remember you can use any resources you want to solve these problems, but avoid copying/pasting solutions you've previously written. Also if you don't finish all of the challenges, that's fine! Just do what you can and submit your challenges in the end! HAVE FUN!
