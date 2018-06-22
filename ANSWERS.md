<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

beforeAll: Is ran before all the test and is used for code that only needs to be run once like connecting to the database.

afterAll: Is ran after all the test are complete and can be used for disconnecting from a db.

beforeEach: Is ran before every test and could be used to initialize values that may have changed because of another test

afterEach: Is ran after every test and could be used like beforeEach to reset values or delete an entry to the database.

2. What is the point of Test Driven Development? What do you personally think about this approach?

TDD can be looked at like a design method that is used in many case to write leaner code and provide as much testing coverage. It also forces a developer to really think about how they want to code there application. I think it's great but it use can be limited since you can only use this methodically with new code not established code bases.

3. What is a mock function? How do we use it to test a callback passed to a function?

A mock function is a copy of another function in the code, but it is contained within the test so it has no side-effects on the program. Since callbacks are just calls to a function, we can pass mock function to test callbacks and tell the test to expect what the mock function is supposed to return.

4. Mention three types of tests.

Unit tests, Component tests, Snapshot tests

5. What type of test performs database operations against a real server.

Integration test


