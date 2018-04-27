<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

- before: This will run before all the tests, in our case we are using before to run the test server before any tests are executed.
- after: This  will run after all  the tests, we are using after to close the test server so it is not constatnly running when nothing needs to be ran.
- beforeEach: This will run before each test, we are using this to create some mock data so that way our tests have some data to run and we know our server is working.
- afterEach: This will run after each test, and we are using this to wipe the test server of any information that we stored during tests.


2. What is the point of Test Driven Development? What do you personally think about this approach?

The point of Test Driven Development(TDD) is to write tests first for the project you are working on then write the code.
The goal is to have specific test cases and in a sense use them as a strict guidelines for what you are working on.

I personally have enjoyed doing testing this week and writing tests. I can definitely see the benifit in many cases when
using TDD I feel like since it creates a sense of added guidlines for what your code should be it could definitely
minimize the clutter when having many people work on one project. 

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

`spy` is a function that takes in arguments, return values, and the values of `this`.
there are two ways to use `spy` such as through anonymous function and wrapping in methods that already exist.
With that being said  a spy can be passed to a  function as  a `callback` and then report how  it was handled.