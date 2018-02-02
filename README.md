# Assessing your Testing Fundamentals Fu

* Keep Calm! Test On!
* Now that you're familiar with the concepts of testing, your goal is to write documentation and tests for an API that is already in production. (This happens a lot :))
* Answers to your written questions will be recorded in _Answers.md_
* This is to be worked on alone but you can use outside resources. You can _reference_ any old code you may have, and the React Documentation, however, please refrain from copying and pasting any of your answers. Try and understand the question and put your responses in your own words. Be as thorough as possible when explaining something.
* **Just a friendly Reminder** Don't fret or get anxious about this, this is a no-pressure assessment that is only going to help guide you here in the near future. This is NOT a pass/fail situation.
  ## Start by forking and cloning this repository.
  ## Questions - Self Study - You can exercise your Google-Fu for this and any other _Sprint Challenge_ in the future.

1.

## Initializing Project -

* Fork/Clone this project into a directory on your machine.
* `cd` into your forked local copy.
* notice there is a `package.json` file included. We have included all of the dev-dependencies that you'll need to build your project.
* run `npm install` to download all the dependancies you need for this project.
* run `npm run watch` to start your tests in **watch mode**. This command will listen for changes as you work through the problems and save your `challenges.js` file. As soon as you hit save after writing some changes, the linter will run, and the tests will run as well.
* As soon as you have a test passing, `commit` your changes to your fork so we can see an active commit stream.
* Once you're done with all the tests, push your commits to your fork and submit a Pull-Request

## Project Description

* You're going to be writing the documentation and the tests for a CRUD API
* The API itself is really simple. You're task is to peek at the endpoints found in the `server.js` file and write docs for each one, then write the tests for the end points.

## DOCUMENTATION GOES HERE

```
  <!-- THIS NEEDS TO BE FILLED IN WITH YOUR BEAUTIFUL DOCUMENTATION. IF YOU DID THIS RIGHT DURING THE PROJECT YOU SHOULD BE ABLE TO PORT OVER YOUR INFO AND PUT IT HERE. -->
```

## TESTS

```
<!-- I have already manually tested this API for you. All you have to do is write Unit tests to ensure that the end points do what they're supposed to do -->
```

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
* **REMINDER** That this data structure returend from Mongo will be an array, so to test your game with a `beforeEach` hook you'll need to make sure you test against the first item in the array

```
expect(res.data[0].foo).to.equal(bar.foo);
```

### Write a test for the "PUT" method

* Just like in class, send up the information you want changed on the server via the `req.body`.
* You can send up the Id and the Server will be using that to

  ### Write a test for the "DELETE" method

* Be sure to
  ### Remember you can use any resources you want to solve these problems, but avoid copying/pasting solutions you've previously written. Also if you don't finish all of the challenges, that's fine! Just do what you can and submit your challenges in the end! HAVE FUN!
