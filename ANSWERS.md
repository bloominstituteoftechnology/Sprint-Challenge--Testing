<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

    `beforeAll` runs before any tests in the current file. This is useful for setting up global state that's needed for multiple tests. Ex: Setting up a database connection.

    `afterAll` runs after all the tests in the current file have finished. This is useful for cleaning up global state that was setup before the tests. Ex: Closing a database connection.

    `beforeEach` runs before each test in the current file. This is useful for resetting the global state for the upcoming test. Ex: Removing records from a database.

    `afterEach` runs after each tests in the current file. Like `beforeEach` this is useful for resetting the global state for the next test. Ex: Removing records from a database.

1. What is the point of Test Driven Development? What do you personally think about this approach?

    The purpose of TDD is to produce higher quality code. Writing tests first forces you to think more deeply about the problem you are trying to solve and since you are only writing enough code to pass the existing tests you'll end up with a leaner code base. You'll also end up with cleaner code because you'll be free to refactor without introducing bugs that may go unnoticed. Writing tests is still a painful process for me but I can respect this approach because of the results it yields: cleaner code. I am also much more confident while refactoring because I know the tests will catch anything that I mess up in the process.

1. What is a mock function? How do we use it to test a callback passed to a function?

    If we wish to test whether certain functions have been called correctly we can use mock functions to do so without having to actually run the function in question. We just redefine the function in question with `jest.fn()`.

1. Mention three types of tests.

    - Unit testing
    - Component testing
    - Integration testing

1. What type of test performs database operations against a real server.

    Integration tests
