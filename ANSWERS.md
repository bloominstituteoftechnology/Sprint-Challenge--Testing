<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
beforeAll runs a function before any of the tests in this file run. afterAll runs a function after all the tests in this file have completed. beforeEach runs a function before any of the tests in this file run. afterEach runs a function after each one of the tests in this file completes.

1. What is the point of Test Driven Development? What do you personally think about this approach?
The point of TDD is to write test suites before development, which serves as a specification for what the code should do. This guarantees full coverage of your tests, as you will have a test for every function that you will eventually write.

1. What is a mock function? How do we use it to test a callback passed to a function?
Mock functions test links between code, by erasing the actual implementation of a function, capturing calls to it, which also capture instances of the constructor functions when instantiated with 'new', which allows test-time configuration of return values.

1. Mention three types of tests.
Unit, Component, Regression testing.

1. What type of test performs database operations against a real server.
Integration testing.
