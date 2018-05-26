<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

beforeAll and afterAll right before and after the entire unit of tests. beforeEach and afterEach run before/after each it(). They are used for resetting the testing environment when necessary. Good uses are disconnecting/connecting to a database and setting/resetting variables.

2.  What is the point of Test Driven Development? What do you personally think about this approach?

The point is to ensure that functionality (or aesthetics using snapshots) is maintained through updates so that everything continues to function as intended. Using tests means that time can be saved by not having to check every little thing whenever a change is made. They also can prevent catastrophic errors from occurring without anyone noticing. I think they are useful for big projects where more time is saved this way than from checking manually or for when is vital that an update doesn't create new errors.

3.  What is a mock function? How do we use it to test a callback passed to a function?

A copy of a function that is used in place of the original to avoid side effects.

4.  Mention three types of tests.

unit tests, component tests, snapshot tests

5.  What type of test performs database operations against a real server.

unsure
