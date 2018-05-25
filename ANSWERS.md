<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

'beforeAll' runs the commands prior to testing a segment of code. It is used to connect to a DB or variables are defined to run within those commands.

'afterAll' commands run after all testing has been completed. It's used to reset/clear a database or defined variables in the 'before' commands.

'beforeEach' runs commands prior to each test.

'afterEach' runs each individual test has completed.

2.  What is the point of Test Driven Development? What do you personally think about this approach?

Tests are created before the application code is created. It makes it easier for a developer to understand what is needed prior to coding and can prevent any mistakes during this time. I think it can be useful when one has a full understanding of the application's end goal. It can also save time troubleshooting when issues arise.

3.  What is a mock function? How do we use it to test a callback passed to a function?

It is code that mimics true application code but does not interfere with the implementation. The test command is `mockCallback = jest.fn()`.

4.  Mention three types of tests.

Unit tests, snapshot & component

5.  What type of test performs database operations against a real server.

Supertest
