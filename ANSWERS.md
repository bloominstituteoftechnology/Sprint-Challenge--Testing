<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

 -   beforeAll runs before all tests
 -   afterAll runs after all tests are run
 -   beforeEach runs before each individual test
 -   afterEach runs after each individual test


2. What is the point of Test Driven Development? What do you personally think about this approach?
    - Test Driven Development has us write tests before we write code and then write code that eventually passes all tests. It takes some time getting used to


3. What is a mock function? How do we use it to test a callback passed to a function?
    - A mock function is a function that lets us abstract out specific function calls that aren't integral to our test. To test a cb, we would make a new mock, pass it into the function, then see if mock was ever called.
    - 
4. Mention three types of tests.
    - Unit tests
    - integration tests
    - snapshot testing
5. What type of test performs database operations against a real server.
    - integration testing
