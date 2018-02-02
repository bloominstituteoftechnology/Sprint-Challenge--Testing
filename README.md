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

# Users API
This api's permits acess to a database of NES Games and perform the following functions to the data add a new Game, update a Game, Display a list of Games, and Delete a Game.

# To start the database
1. Ensure MongoDB is installed in your system
    * mongod should be acessible from your %path
      * follow this tutorial if you have questions: https://www.youtube.com/watch?v=KLdHHa2XS8M
2. Run this command in your terminal:
    * On Windows: `mongod`
    * On OSX: `sudo mongod`
    * if all executed well it will have an instance of mongodb running on that terminal. Leave the terminal open or minimized.
    * The data will be saved on a collection named `video-games`.
3. Execute the API Server using a Terminal:
    * Navigate to the API's root directory
    * Run this command: `npm install`
      * _This will install all the dependencies for the API to function properly._
      * _Wait until it is finished executing before following the next step._
    * Run this command: `npm start`
      * _If the API server was executed sucessfully tis will display a a message like the one bellow on your terminal._
      ```
        Magic happening on port 5050
        DB up and running

      ```

# Api Endpoints
#### All api calls should be directed to:
```http://localhost:5050```
#### Use the following Endpoints:
| Endpoint | Type | Data | Result |
|:---------|:--:|:--:|:-:|
|/api/game/create|Post|Json|Returns the created Game Object.
#### Creation Object Example:
```JSON
{
    "title":"Super Mario Brothers",
    "date":"1981",
    "genre": "Adventure Platform"
}
```
| Endpoint | Type | Data | Result |
|:---------|:--:|:--:|:-:|
|/api/game/get|Get|Json|Returns the list of Games|
  1. On Database Connection Error: if the API can't reach the database this error will be returned: `{ error: 'Something really bad happened' }` with a status of 500.

| Endpoint | Type | Data | Result |
|:---------|:--:|:--:|:-:| 
|'/api/game/update|Put|Json|Returns the updated Game Object|
  1. For the update to find the speciffic game, an object with the properties of "id" or "title" must be submitted. One of those properties will be sufficient, but both can be included.
  2. On Find Error: if the API can't find the provided id in the list this error will be returned: `{ error: 'Cannot find game by that id' }` with a status of `422`.
  3. On Database Connection Error: if the API can't reach the database this error will be returned: `{ error: 'Something really bad happened' }` with a status of `500`.
#### Update Object Example:
```JSON
{
    "id": "mongo DB ObjectID",
    "title": "Super Mario Brothers"
}
```

| Endpoint | Type | Data | Result |
|:---------|:--:|:--:|:-:| 
|/api/game/destroy/:id|delete|Json|Returns `{ success: "[Removed Game title] was removed from the DB" }`|
  1. To delete a game you can send up an id on the request body or the params.
  2. On Missing ID Error: if you do not provide an ID on the params or inside the request body this error will be returned: `{ error: 'You need to give me an ID' }` with a status of `422`.
  3. On Find Error: if the API can't find the provided id in the list this error will be returned: `{ error: 'Cannot find game by that id' }` with a status of `422`.
#### Delete Object Example:
```JSON
{
    "id": "mongo DB ObjectID"
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
