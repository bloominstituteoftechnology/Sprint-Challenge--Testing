<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
beforeAll runs before all the test run, afterAll runs at the end, usually to disconnect the server for us, and beforeEach runs before each test usually to set up some sort of object to test in our case and afterEach runs after each test.

1. What is the point of Test Driven Development? What do you personally think about this approach?
TDD is great for making sure you have robust and fail proof as much as possible,
building out the test can help you, check your code to make sure it's not doing anything that could cause major issues down the line

1. What is a mock function? How do we use it to test a callback passed to a function?
it is used to test links  in code,  nd allows test-time configuration of return values
1. Mention three types of tests.
client side testing, server side testing, unit testing
1. What type of test performs database operations against a real server.
unit testing, you create a testing db and delete the collection in the after all

