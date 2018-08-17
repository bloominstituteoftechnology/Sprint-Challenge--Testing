# Assessing your Testing Fu

## Keep Calm! Test On!

- Now that you're familiar with the concepts of testing, your goal is to write tests for an API that is already in production. (This happens a lot :))
- Answers to your written questions should be recorded in _ANSWERS.md_
- This is to be worked on **alone**, but you can _reference_ code from lectures and past projects, or you can go online to read documentation or search for answers. Please refrain from copying and pasting any of your answers. Try and understand the question and put your responses in your own words. Be as thorough as possible when explaining something.

## Questions - Self Study - You can exercise your Google-Fu for this and any other _Sprint Challenge_ in the future.

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
1.  What is the point of `Test Driven Development`? What do you think about this approach?
1.  What are `mocks`? What are a good use case for them?
1.  Mention three types of tests.

## Download Project and Install Dependencies

1.  fork and clone this repository.
1.  **CD into the folder** where you downloaded the repository.
1.  run `yarn` or `npm i` to download all dependencies.
1.  type `yarn test` or `npm test` to run the tests. The `test` script is already configured.

## Assignment

For this project you will use `Test Driven Development` to create a RESTful API using Node.js and Express that publishes a set of endpoints to manage a _games_. **Data can be stored in memory. Use a simple JS array**. No need to keep track of incrementing `id`s for this project.

## Requirements

1.  use `jest` and `supertest` to write the tests.
1.  Write the **tests BEFORE** writing the route handlers.
1.  Your API must be able to **create** and **get** `games`.
1.  Write a minimum of two tests per route handler.

### Write tests for the "POST" method

- The `POST /games` endpoint should take in an object that looks like this

  ```js
  {
    title: 'California Games', // required
    genre: 'Sports', // required
    releaseYear: 1987 // not required
  }
  ```

  - in the route handler, validate that the required fields are included inside the body. If the information is incomplete, return a `422` status code.
  - write tests to verify that the endpoint returns the correct HTTP status code when receiving correct and incorrect game data.

### Write tests for the "GET" method

- The `GET /games` endpoint should return the list of games and HTTP status code 200.
- Write a test to make sure this endpoint always returns an array, even if there are no games stored. If there are no games to return, the endpoint should return an empty array.

### Write tests for the "DELETE" method

- `DELETE` can take an ID off of the route parameter and delete the corresponding game if it exists or return a 404 and an object with a message if the game does not exist in the database.

## Stretch Problem

### Write tests for the "PUT" method

- validate that the game `title` is unique. If the client tries to create a duplicate game, return a status code 404 (Not Allowed). Write a test that checks for this.
- add an `id` property to the games and write code in the server to increment this number automatically. Write a `GET /games/:id` endpoint that returns the information about a single game. Respond with a 404 status code when a game is not found for the provided `id` and the corresponding tests for it.

### Remember you can use any resources you want to solve these problems, but avoid copying/pasting solutions you've previously written. Also if you don't finish all of the challenges, that's fine! Just do what you can and submit your challenges in the end! HAVE FUN!
