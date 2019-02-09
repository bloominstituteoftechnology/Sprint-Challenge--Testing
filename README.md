# Sprint Challenge: Testing - TDD Video Games

This challenge allows you to practice the concepts and techniques learned over the past week and apply them in a concrete project. This Sprint explored Testing. During this Sprint, you studied Introduction to Automated Testing, Testing React Applications & Testing Web APIs. In your challenge this week, you will demonstrate proficiency by creating an application that follows the TDD pattern to create a simple Web API using Node.js and Express.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment. All work must be your own. Your challenge score is a measure of your ability to work independently using the material covered through this sprint. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

You are not allowed to collaborate during the Sprint Challenge. However, you are encouraged to follow the twenty-minute rule and seek support from your PM and Instructor in your cohort help channel on Slack. Your work reflects your proficiency in Testing and your command of the concepts and techniques in the Introduction to Automated Testing, Testing React Applications & Testing Web APIs modules.

You have three hours to complete this challenge. Plan your time accordingly.

## Commits

Commit your code regularly and meaningfully. This helps both you (in case you ever need to return to old code for any number of reasons and your project manager.

## Description

In this challenge use `Test Driven Development` to build a RESTful API using Node.js and Express to create and list _games_. **Data can be stored in memory using a simple JS array**. No need to keep track of incrementing `id`s for this project's MVP, that is part of the Stretch Problem.

## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

1. In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
1. What is the point of `Test Driven Development`? What do you think about this approach?
1. Mention three types of automated tests.

## Project Set Up

- [x] fork and clone this repository.
- [x] **CD into the folder** where you downloaded the repository.
- [x] run `yarn` or `npm i` to download all dependencies.
- [x] type `yarn test` or `npm test` to run the tests. The `test` script is already configured.

## Minimum Viable Product

Your finished project must include all of the following requirements:

- [ ] use `jest` and `supertest` to write the tests.
- [ ] Write the **tests BEFORE** writing the route handlers.
- [ ] Your API must be have `POST` and `GET` endpoints for `/games`.
- [ ] Write a **minimum** of three tests per endpoint.

Below is a product specification covering the requirements for your endpoints.

### POST /games

- [ ] The `POST /games` endpoint should take in an object that looks like this

  ```js
  {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  }
  ```

- [ ] In the route handler, validate that the required fields are included inside the body. If the information is incomplete, return a `422` status code.
- [ ] Write tests to verify that the endpoint returns the correct HTTP status code when receiving correct and incorrect game data.

### GET /games

- [ ] The `GET /games` endpoint should return the list of games and HTTP status code 200.
- [ ] Write a test to make sure this endpoint always returns an array, even if there are no games stored. If there are no games to return, the endpoint should return an empty array.

## Stretch Problems

The following exercises are optional, but we suggest that you tackle them if you finish the MVP early.

- validate that the game `title` is unique. If the client tries to create a duplicate game, return a status code 405 (Not Allowed). Write a test that checks for this.
- add an `id` property to the game schema and write code in the server to increment it automatically. After implementing this functionality work on the following:
  - Write a `GET /games/:id` endpoint that returns the information about a single game. Respond with a 404 status code when a game is not found for the provided `id`. Add the corresponding tests for it.
  - add a `DELETE /games/:id` endpoint that can remove the corresponding game. If the game does not exists return a 404 status code. Write tests for this endpoint.

**Remember you can use any resources you want to solve these problems, but avoid copying/pasting solutions you've previously written. Also if you don't finish all of the challenges, that's fine! Just do what you can and submit your challenges in the end! HAVE FUN!**
