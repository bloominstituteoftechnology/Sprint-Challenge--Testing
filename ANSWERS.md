<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
The difference between: 
beforeAll - it runs a function before any of the tests are run, is useful to setup some global state that will be used by tests
afterAll - it runs a function after all the tests are done running, is useful to reset some global state that is shared across tests 
beforeEach - it runs a function before each of the tests in the file runs, it is useful to reset global state that is used by many tests
afterEach - it runs a function after each test is done running, it is useful to reset some temp state that is created by the function

2. What is the point of Test Driven Development? What do you personally think about this approach?
It is to proactively catch error and handle it before it happens, personally I see the benfit of it, but the process is counter intuitive to code writing

3. What is a mock function? How do we use it to test a callback passed to a function?
A mock function is a function that is used to spy the behavior of the function that is called indirectly by some code. We test callback passed by creating a mockfunction and passing it
to the function. 

4. Mention three types of tests.
Test-driven testing
behavior driven testing
Intergration testing 

5. What type of test performs database operations against a real server.
Integration testing
