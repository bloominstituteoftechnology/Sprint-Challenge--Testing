<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
`beforeAll` is a function that runs only one time for the describe block it lives in and runs before the beforeEach.
`afterAll` is used for global cleanup and runs after all tests have completed.  So basically if the function ends up returing a promise Jest waits for that promise to resolve before continueing.
`beforeEach` is a function that runs after the beforeAll function and before each it spec.
`afterEach` is used for cleanup
1. What is the point of Test Driven Development? What do you personally think about this approach?
`TDD` is a process in which tests are written before the app has been written.  I think you relly have to have a thorough understanding of how your app works in order to exicute this process.
1. What is a mock function? How do we use it to test a callback passed to a function?
I think of a mock function as sort of an impersonator that is used to mimic an action or actions and it lets you see what's happening in that action.  You can create one with jest.fn().  You can test a callback passed to a fumction because you can see what's happening inside the mock.
1. Mention three types of tests.
unit testing, integration testing, and snapshot testing.
1. What type of test performs database operations against a real server.
It would be a (database) integration tests.
