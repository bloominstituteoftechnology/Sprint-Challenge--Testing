<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

beforeAll - executes once before the block of tests on the spec file.
afterAll - like beforeAll but after the tests
beforeEach - executes before each test
afterEach - executes after each test

They can be used for reseting a testing environment for each test. For example, beforeEach mounting and then afterEach unmount. Or create something, then delete it.

2. What is the point of Test Driven Development? What do you personally think about this approach?
Allow for scalability without losing control of the project (i.e., regression).

3. What is a mock function? How do we use it to test a callback passed to a function?
Mock functions are executed for testing. They occur within a 'isolated container' so-to-speak, in order to determine the success/failure of that component alone. We can pass the callback into the mock.

1. Mention three types of tests.
Unit Test, Component Test, Snapshot Test

1. What type of test performs database operations against a real server.
Unit test can.