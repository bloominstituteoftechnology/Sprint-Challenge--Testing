<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    -   beforeAll: Runs a function before any of the tests in this file run.
        afterAll: Runs a function after all the tests in this file have completed.
        beforeEach:R uns a function before each of the tests in this file runs. 
        afterEach: Runs a function after each one of the tests in this file completes.
        These are useful for asynchronous test, especially set and reset global states or set certain conditions before and after test.

1. What is the point of Test Driven Development? What do you personally think about this approach?
    -   TDD helps a developer to focus on the most required functionality of a code.

1. What is a mock function? How do we use it to test a callback passed to a function?
    -   Mock functions make it easy to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.(https://facebook.github.io/jest/docs/en/mock-functions.html)

1. Mention three types of tests.
    - Client test, Server test, Unit test

1. What type of test performs database operations against a real server.
    -    Server test
