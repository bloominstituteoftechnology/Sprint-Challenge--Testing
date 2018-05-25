<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

beforeall: runs code before any other tests use to initialize the server 

afterall: runs after all the tests are run and is used to close any connection strings and disconnect from the server.

beforeEach: is used to run before each test is run to initialize the variables and setup everything before running the test such as adding dummy data.

afterEach: is used to remove the dummy data from the database after the test was ran. It is used to reset everything to zero for the next test. 

1. What is the point of Test Driven Development? What do you personally think about this approach?

The reason for test driven development to me is that it allows the tester to think about how the function or object or whatever is being tested should work and to insure when it is written that it meets the criteria that was set out before for it. 

1. What is a mock function? How do we use it to test a callback passed to a function?

A mock function is a function that emulates what would be the actual function so we don't have to implement the actual function. 

1. Mention three types of tests.
    1. unit test
    2. functional testing
    3. end to end testing
    4. integration testing

1. What type of test performs database operations against a real server.

Functional tests to verify the proper function of the database. 

