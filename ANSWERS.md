<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

  The `all` functions are invoked before and after the entire group of tests inside the block containing the all method. They are used for major setup and teardown, such as managing a database connection. The `each` functions are invoked before and after each test and are for more minor housekeeping such as initializing a variable.

1. What is the point of Test Driven Development? What do you personally think about this approach?

  TDD is the philosophy that tests should be written before code, and the writing of tests should server as a specification for what the code will eventually do. I think that this is an excellent way to ensure full coverage of your tests, since you will end up having a test for every function before it is written. I think that this method requires more mental investment up front, or a clear written specification to start from. 

1. What is a mock function? How do we use it to test a callback passed to a function?

  A mock function is a special object that can be created during tests and passed to other functions or components that are expecting to receive a function. Mocks can be examined during the test to make assertions about how many times they were called and with what arguments. This allows us to be sure that our code dealing with callbacks is working properly.

1. Mention three types of tests.

  Unit, Component, Integration, (bonus!) Regression

1. What type of test performs database operations against a real server.

  Integration
