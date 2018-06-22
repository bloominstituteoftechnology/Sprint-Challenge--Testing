<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

    --beforeAll: before the first test of the suite, we set up for all tests. 
    --afterAll: after the last test, we clean up for all tests. 
    --beforeEach: before each test, we set up before the test. 
    --afterEach: after each test, we clean up after the test.

2. What is the point of Test Driven Development? What do you personally think about this approach?

    First, we write the tests and our application. If we have detailed tests for everything, constructing the application will be easier. No surprises.

3. What is a mock function? How do we use it to test a callback passed to a function?

    Mock perform as a function and get passed to objects that expect a function. For example we can do window.alert = jest.fn() and then pass it down for tests. Mock functions help us to "spy" on functions and see how many times they were called.

4. Mention three types of tests.

    Unit, functional, integration.

5. What type of test performs database operations against a real server.

    Integration
