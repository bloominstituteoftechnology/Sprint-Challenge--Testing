<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    beforeAll and afterAll run functions before any tests are run and after all test have run.  They can be used to set up a global state that will affect all tests, for example connecting and disconnecting from a mongo database.

    beforeEach and afterEach run functions before and after each test.  They are useful for setting up and clearing temporary state between each test, such as creating and removing a user from a database.

2. What is the point of Test Driven Development? What do you personally think about this approach?
    Test Driven Development is the practice of writing tests first and the corresponding code afterwards.  Personally I see the value in TDD, as it could help greatly with the debugging process if done correctly especially in larger applications, however I am not the biggest fan of this technique as I find the process a bit tedious.

3. What is a mock function? How do we use it to test a callback passed to a function?
    A mock function 'spies' on a function called by other code.  Mock functions can be passed as an argument to a function, where we can then assert how the mock function was called.

4. Mention three types of tests.
    Client Testing (Jest)
    React Testing (Enzyme)
    Server Testing (Supertest)

5. What type of test performs database operations against a real server.
    Supertest
