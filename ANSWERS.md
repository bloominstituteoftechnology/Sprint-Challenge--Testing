<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

afterAll - runs a function after all the test in the file have been completed

beforeAll - runs a function before any test has run

beforeEach - Runs a function before each of the tests in this file runs.

afterEach - Runs a function before after of the tests in this file runs.

1. What is the point of Test Driven Development? What do you personally think about this approach?

test driven devlopment helps us write code that has a better coverage. code is only written if test require it, imo, it is a good sanity check against things that can break


1. What is a mock function? How do we use it to test a callback passed to a function?

Mock functions make it easy to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.


1. Mention three types of tests.

Unit Testing.
Integration Testing.
Functional Testing.

1. What type of test performs database operations against a real server.

Integration Testing.
