<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
### They effectively follow their names. If it has an all as a suffix then that means that the function is completed before or after based on the prefix. It is the same with the each suffix except it is before/after each test. They are used for a variety of things the all pair is used at times to connect and disconnect from the server. The each pair can be used to give the db info and then remove it post test to keep test data off the db.
1. What is the point of Test Driven Development? What do you personally think about this approach?
### The point of TDD is to break code down into small chunks intended to pass tests with specific purposes. I think that it puts more pressure on developers but it also lowers tech debt in the long run.
1. What is a mock function? How do we use it to test a callback passed to a function?
### A mock function is a pseudo function. We use it to test if something has been called and it allows a lot of interesting test parameters including state.
1. Mention three types of tests.
### There is unit testing, snapshot testing, and component testing. 
1. What type of test performs database operations against a real server.
### SuperTest
