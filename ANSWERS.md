<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

    There is the setup that needs to happen before tests run and some finish work that needs to happen after the tests run.  The setup is; 

    beforeAll -  runs once before the first test
    afterAll - runs once after the last test
    beforeEach - runs before each test.  It’s good for setup code.
    afterEach - runs after each test.  It’s good for cleanup.
    
    The best example that I can think of is when we connect the test with mongoose.  We connect mongoose to run one test and then need to disconnect it so that the next test can run mongoose as well.

2. What is the point of Test Driven Development? What do you personally think about this approach?

    The point of Test Driven Development is to write the test of code before actually writing the code itself.  The goal of the test is to catch the error before the software is launch.  The benefit of this test is the developer can use it as a guild line of how to write the code to accomplish the task/ the request of clients. 

3. What is a mock function? How do we use it to test a callback passed to a function?

    Jest mock is a duplicate function that we test to see the behavior of the code response as we expect, checking the state or click handler for example.  The benefits are preventing side effects, reduce dependencies and with isolating the test, it simplify testing.

4. Mention three types of tests.

    Three types of tests are unit tests, component tests and snapshot Tests.

5. What type of test performs database operations against a real server.

    Supertest??
