<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

They are helper functions and are used when we need to run things before or  after the tests. The beforeAll and afterAll are run when we need to do a setup just once and it's either before or after the tests. The beforeEach and afterEAch are used for methods that are needed to run for many tests.      


2. What is the point of Test Driven Development? What do you personally think about this approach?

Test Driven Development is basically writing first the tests before the code. I like this approach or philosophy because it does make writing code easier and much cleaner because the tests gives direction on which codes to write.  


3. What is a mock function? How do we use it to test a callback passed to a function?

Mock Functions is used to test the implementation of a function and if the codes are properly linked to one another. To use it, we first declare a const for the mock and assign it this method: jest.fn(). This will become the callback when testing the functions.     



4. Mention three types of tests.

The 3 types are Unit Testing, Snapshot Testing, and Component Testing. 


5. What type of test performs database operations against a real server.

The server testing perfoms database operations against a real server. 
