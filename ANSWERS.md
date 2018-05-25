<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

beforeAll: before the whole test session begins
beforeEach: before each test begins
AfterAll: After the test session finishes
AfterEach: After each test finishes.
These are used to perform task such as connecting/disconnecting to a DB like mongo before or after running tests

1. What is the point of Test Driven Development? What do you personally think about this approach?

Kind of like a quality assurance test where you repeat tests in order to meet specific requirement. It's feels okay if used appropriately.

1. What is a mock function? How do we use it to test a callback passed to a function?

Mock function is self-explanatory. It simulates a function by capturing calls to the function and instances of constructor functions, returning test-time configuration of return value, rather than relying on acutal implementation of a function.

1. Mention three types of tests.
Unit test, Integration test, 

1. What type of test performs database operations against a real server.
