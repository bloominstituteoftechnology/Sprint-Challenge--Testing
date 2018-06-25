<!-- Answers to the Short Answer Essay Questions go here -->

1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

beforeAll: executes some code necesary for all test before start the test. Some use is like connect to the database.

afterAll: executes some code after all test are finish.

disconnect database.

beforeEach: executes code before each test start.

initialize variables and prepare sample data.

afterEach: executes some code after each test finish

remove data from database if created


1. What is the point of Test Driven Development? What do you personally think about this approach?

Prevent regression errors. Help identifies posible errors before start working on the actual code

1. What is a mock function? How do we use it to test a callback passed to a function?

They are fake functions who replace the actual functions. We use them to test our function not the logic of the function.

1. Mention three types of tests.

Unit tests
Component tests
Integration tes


1. What type of test performs database operations against a real server.

Integration test.
