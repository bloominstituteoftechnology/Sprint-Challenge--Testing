# Assessing your Testing Fu

## Keep Calm! Test On!

- Now that you're familiar with the concepts of testing, your goal is to write tests for an API that is already in production. (This happens a lot :))
- Answers to your written questions should be recorded in _ANSWERS.md_
- This is to be worked on **alone**, but you can _reference_ code from lectures and past projects, or you can go online to read documentation or search for answers. Please refrain from copying and pasting any of your answers. Try and understand the question and put your responses in your own words. Be as thorough as possible when explaining something.

## Friendly Reminder

Don't fret or get anxious. This is a no-pressure assessment designed to help us discover better ways to help you move forward and make the learning experience better for you.

## Start by forking and cloning this repository.


## Initializing Project


- `cd` into your forked local copy.
- notice there is a `package.json` file included. We have included all of the dev-dependencies that you'll need to build your project.
- run `yarn` to download and install all the dependencies you need for this project.
- run `yarn test` to start your tests.
- Keep an active log of your changes by committing and pushing often to your fork.
- Write all of your tests in the `./api/server.spec.js` and `./games/Game.spec.js` files.

## Project Description

- You're going to be writing the tests for a CRUD API.
- The API itself is really simple. Your task is to peek at the endpoints found in the `./api/server.js` file and write tests for them.
- notice that the definition of the server (inside `./api/server.js`) is separate from the code that executes the server (inside `./index.js`), this makes it easier to test the server code in isolation. It is a common pattern used to avoid starting an instace of the server and a connection to the production database that will result on `Address already in use errors`.

## TESTS

- The provided API has already been manually tested.
- Your job is to write `unit and integration tests` to ensure that the endpoints do what they're supposed to do.
- Each endpoint should have multiple tests to ensure that different sorts of input are handled correctly/as expected. As a guideline, write **at least two tests for each endpoint**.
- THERE IS NO NEED TO `YARN START`, BUT YOU'LL WANT TO ENSURE THAT YOU HAVE A `MONGO` INSTANCE UP AND RUNNING.

### Write tests for the "POST" method

- The `POST` method should take in an object that looks like this

  ```js
  {
    title: 'California Games',
    genre: 'Sports',
    releaseDate: 'June 1987'
  }
  ```

### Write tests for the "GET" method

- Our get method should return the list of games.
- **REMINDER** That this data structure returned from Mongo will be an array, so to test your game with a `beforeEach` hook you'll need to make sure you test against the first item in the array

  ```js
  expect(res.data[0].foo).to.equal(bar.foo);
  ```

### Write tests for the "DELETE" method

- `DELETE` can take an ID off of the route parameter and delete the corresponding game if it exists or return a 404 and an object with a message if the game does not exist in the database.

## Stretch Problem

### Write tests for the "PUT" method

- Just like in class, send up the information you want changed on the server via the `req.body`.

### Remember you can use any resources you want to solve these problems, but avoid copying/pasting solutions you've previously written. Also if you don't finish all of the challenges, that's fine! Just do what you can and submit your challenges in the end! HAVE FUN!
