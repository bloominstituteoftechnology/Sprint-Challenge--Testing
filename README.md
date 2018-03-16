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

# API Documentation

Documentation for all APIs.

### All API endpoints: `http://localhost:5050/api`

---

## `/ama`

**Description**: an API for creating AMAs (ask me anything) with a `question`, `answer`, and `answered` field.

All `/ama` **API** endpoints

| endpoint           | type   | description                                                                    | output | type   |
| ------------------ | ------ | ------------------------------------------------------------------------------ | ------ | ------ |
| `/api/game/create` | POST   | Creates game and saves it to the database.                                     | JSON   | Object |
| `/ama`             | GET    | Requests all AMAs                                                              | JSON   | Array  |
| `/ama/id`          | GET    | Requests the AMA with `id`                                                     | JSON   | Object |
| `/ama/id`          | UPDATE | Updates either the question or answer field (but not both) of an AMA with `id` | JSON   | Object |
| `/ama/id`          | DELETE | Deletes the AMA with `id`                                                      | JSON   | Object |

---

### [POST] `/api/game/create`

**Description**: creates a game and saves it to the database.

#### Example:

Request: `[POST] /api/game/create`

```
{
  title: 'Lambda School Games',
  genre: 'Computer Science Academy',
  releaseDate: 'January 2018',
}
```

Response: status code `200`

```
{
  id: 1234567890abcdefghijklmnopqrstuvwxyz,
  title: 'Lambda School Games',
  genre: 'Computer Science Academy',
  releaseDate: 'January 2018',
  __v: 0
}
```

#### Notes

1. `releaseDate` is NOT required.

---

### [GET] `/api/ama`

**Description**: gets all AMAs.

#### Example:

Request: `[GET] /api/ama`

Response: status code `200`

```
[
  {
    id: 1234567890abcdefghijklmnopqrstuvwxyz,
    question: 'What is Lambda School all about?',
    answered: false,
    createdOn: 'YYYY-MM-DDT00:00:00.000Z',
    __v: 0
  },
  {
    id: zyxwvutsrqponmlkjihgfedcba0987654321,
    question: 'What differentiates Lambda School from other CS programs?',
    answered: true,
    answer: 'You don't pay a cent until you get a job!'
    createdOn: 'YYYY-MM-DDT00:00:00.000Z',
    __v: 0
  }
]
```

---

### [GET] `/api/ama/id`

**Description**: gets the specific AMA with `id`.

#### Examples:

#### _Unanswered AMA_:

Request: `[GET] /api/ama/1234567890abcdefghijklmnopqrstuvwxyz`

Response: status code `200`

```
{
  id: 1234567890abcdefghijklmnopqrstuvwxyz,
  question: 'What is Lambda School all about?',
  answered: false,
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

#### _Answered AMA_:

Request: `[GET] /api/ama/zyxwvutsrqponmlkjihgfedcba0987654321`

Response: status code `200`

```
{
  id: zyxwvutsrqponmlkjihgfedcba0987654321,
  question: 'What differentiates Lambda School from other CS programs?',
  answered: true,
  answer: 'You don't pay a cent until you get a job!'
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

#### Notes

1. When the AMA with `id` does not exist:

Request: `[GET] /api/ama/ayxwvutsrqponmlkjihgfedcba0987654321`

```
incorrect id (starts with a) - ayxwvutsrqponmlkjihgfedcba0987654321
correct id   (starts with z) - zyxwvutsrqponmlkjihgfedcba0987654321
```

Response: status code `404`

```
{
    "message": "No ama with id (ayxwvutsrqponmlkjihgfedcba0987654321) found.",
    "ama": null
}
```

2. When the `id` is malformed (incorrect format for the database to parse):

Request: `[GET] /api/ama/1`

Response: status code `500`

```
{
    "message": "Error requesting ama with id 1"
}
```

---

### [UPDATE] `/api/ama/id`

**Description**: update the specific AMA's question or answer with `id`.

#### Examples:

#### _Updating the question for an AMA_:

Request: `[UPDATE] /api/ama/1234567890abcdefghijklmnopqrstuvwxyz`

```
{
  question: 'What programs are available at Lambda School?'
}
```

Response: status code `200`

```
{
  id: 1234567890abcdefghijklmnopqrstuvwxyz,
  question: 'What programs are available at Lambda School?',
  answered: false,
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

#### _Answering the question for an AMA_:

Request: `[UPDATE] /api/ama/1234567890abcdefghijklmnopqrstuvwxyz`

```
{
  answer: 'There is a full-stack and a machine-learning program.'
}
```

Response: status code `200`

```
{
  id: 1234567890abcdefghijklmnopqrstuvwxyz,
  question: 'What programs are available at Lambda School?',
  answer: 'There is a full-stack and a machine-learning program.'
  answered: true,
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

#### Notes

1. The `answered` field is automatically changed to `true` if an answer is provided.

---

### [DELETE] `/api/ama/id`

**Description**: deletes the specific AMA with `id`.

#### Example:

Request: `[DELETE] /api/ama/1234567890abcdefghijklmnopqrstuvwxyz`

Response: status code `200`

```
{
  deleted: true
}
```

---

## Notes

1. Don't forget to create pull requests if you see anything.
1. Enjoy!

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
