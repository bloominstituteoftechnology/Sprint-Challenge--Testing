<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
They are setup functions that are used to prepare the testing for certain things that will be done. For example, beforeAll would have the test connect to Mongo first before
initializing the test and afterAll would have it disconnect.
1. What is the point of Test Driven Development? What do you personally think about this approach?
The point of TDD is to have the programmer focus on the actual requirements before writing the code, which can help visualize what the code must do before actually writing.
Personally, I think it's a intresting way to develop things as it helps plan out how a program will be built ahead of time and visualize what functions will be needed.
1. What is a mock function? How do we use it to test a callback passed to a function?
Mock functions are used for testing and can be implemented into a function to watch it and view if the function is being invoked properly.
1. Mention three types of tests.
Unit Testing, functional testing, end to end testing
1. What type of test performs database operations against a real server.
Functional testing as it's sending in operations and seeing if it recieves the required output.