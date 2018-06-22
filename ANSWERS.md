<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    -beforeAll, afterAll, beforeEach, and afterEach are methods which run exactly when they say (example: beforeAll[tests], etc...).
    They are used to connect to an temporary instance of Mongodb so it does not get permenantly changed with tests.

1. What is the point of Test Driven Development? What do you personally think about this approach?
    -The point of Test Driven Development is to have automated tests set in place before normal development
    occurs, to catch any errors that might be present while the code is being written. Personally, I can conceptually 
    understand that in a much larger codebase(like a facebook, twitter, youtube) TDD is neccessary due to the size of the app, and everything cannot be manually tested, but in the kind of projects I personally have completed, manual testing makes sense 100% of the time.

1. What is a mock function? How do we use it to test a callback passed to a function?
    -Mock functions make it easy to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.

1. Mention three types of tests.
    -Snapshot Tests(component testing), Mock Functions, and Endpoint Tests.

1. What type of test performs database operations against a real server.
    -Unit Test