<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
  beforeAll runs before the first tests - utilized to connect to the database 
  afterAll runs after the last tests - disconnecting from the database
  beforeEach runs before each and every test - populating new values
  afterEach runs after each and every test - reset database values


1. What is the point of Test Driven Development? What do you personally think about this approach?
  To increase the odds of developing well designed and bug free code, by first thinking and writing test suites that the codebase will be run against.

1. What is a mock function? How do we use it to test a callback passed to a function?
  Duplicate block of code that has no implementation which can be used to simplify testing a reduce side effects.

1. Mention three types of tests.
  Server Side Testing
  Client Side Testing
  Unit Testing

1. What type of test performs database operations against a real server.
  Unit testing