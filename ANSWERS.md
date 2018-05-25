<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
- The run when they say they'll fun.  Before all tests, after all tests, before each test, and after each test.  They are used to set up requirements for the tests, like connecting to a database, and then for cleaning up after a/all test(s), by doing things like disconnecting from a database, or deleting temporary data.

2. What is the point of Test Driven Development? What do you personally think about this approach?
- It allows you to get what you need working up off the ground quicker, and get it testing, so you know what works, and what doesn't work, quickly.

3. What is a mock function? How do we use it to test a callback passed to a function?
- It emulates a function, so you can use it in testing.  Use it in place of the callback.

4. Mention three types of tests.
- Component tests, snapshot tests, and integration tests.

5. What type of test performs database operations against a real server.
- supertest.
