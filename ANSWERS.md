
1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
beforeAll - runs before everything else in the test suite
afterAll - runs after the test suite has completed and cleans up when it's all done
beforeEach - runs before each individual test 
afterEach - runs after each individual test to clean up and prepare for the next
2. What is the point of Test Driven Development? What do you personally think about this approach?
The point of Test Driven Development is to prioritize testing by putting it first, before coding actually begins. You write the test for how you want the code to behave and then write code that passes the test.
3. What is a mock function? How do we use it to test a callback passed to a function?
A mock function takes the place of an actual function and captures calls to it. Then you can inspect the mock function's state to see whether the callback is functioning correctly.
4. Mention three types of tests.
Unit, Integration, and Functional testing
5. What type of test performs database operations against a real server.
Integration testing.

