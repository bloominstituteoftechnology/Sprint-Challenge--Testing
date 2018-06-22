<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
* these helper functions are used to setup and teardown when testing. beforeAll can be used to make a connection to a database. afterEach can be used to clear data placed in the database after each test. 

2. What is the point of Test Driven Development? What do you personally think about this approach?
* Test are written first and software is written after to only pass the test.  The idea is that you only write code that is actually need.  


3. What is a mock function? How do we use it to test a callback passed to a function?
* a mock function is used to simulate data that will be processed real functions.

4. Mention three types of tests.
* unit, component, integration 

5. What type of test performs database operations against a real server.
* integration