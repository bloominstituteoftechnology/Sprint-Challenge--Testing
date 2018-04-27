<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

before runs once before the test main test suite runs. 
after runs once after the main test suite it done. 
BeforeEach runs before each test suite 
afterEach runs after each test suite. 

They are used set up and close a test db connection, as well as to provide some mock data in our testing db.

2. What is the point of Test Driven Development? What do you personally think about this approach?

The point of TDD is to increase the odds of developing well designed and bug free code, by first thinking and writing test suites that the codebase will be run against.

I think it's frustrating, but necessary.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

A spy in sinon is a function that we can use to test other functions, specifically callbacks, and test if they were called correctly. We send the spy as the callback and can test whether it was called the appropriate amount of times.
