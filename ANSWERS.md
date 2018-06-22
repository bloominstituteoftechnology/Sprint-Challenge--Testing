<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
  The before and after blocks apply to every test in a file. They are setup functions that are used to prepare the testing for certain things that will be done. For example, beforeAll would have the test connect to Mongo first before
  initializing the test and afterAll would have it disconnect.
 
2. What is the point of Test Driven Development? What do you personally think about this approach?
   The point of TDD is to have the programmer focus on the actual requirements before writing the code, which can help visualize what the code must do before actually writing.
  
3. What is a mock function? How do we use it to test a callback passed to a function?
   Mock functions are used for testing and can be implemented into a function to watch if the function is being invoked properly.

4. Mention three types of tests.
   Unit, Functional, and Integration testing

5. What type of test performs database operations against a real server.
   Integration test.
