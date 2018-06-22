<!-- Answers to the Short Answer Essay Questions go here -->

1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

    The differences between beforeAll, afterAll, beforeEach, and afterEach as well as when they run and what they are used for are as follow: 
    
        I. beforeAll - it is a function that is executed before all tests. 
        II. afterAll - it is a function that is executed after all tests have completed. 
        III. beforeEach - it is a function that is executed before each test. 
        IV. afterEach - it is a function that is executed after each test. 

2. What is the point of Test Driven Development? What do you personally think about this approach?

    The point of Test Driven Development is to write test code that fails before any development code is written to make the tests pass. I personally do not prefer this model of development because I may not know what to test unless the development code has already been written.  
    
3. What is a mock function? How do we use it to test a callback passed to a function?

    A mock function test links between codes by executing a function without actual side-effects. It does this by eliminating the functions implementation and capturing any calls or parameters passed to the function. We can use a mock function as a callback that is passed to a function. As a result, we can inspect the mock's state whenever it is called to ensure the callback is invoked properly. 
    
4. Mention three types of tests.

    These are examples of tests: 

        I. Unit
        II. Component
        III. Snapshot

5. What type of test performs database operations against a real server?

    Integration tests performs database operations against a real server. 

