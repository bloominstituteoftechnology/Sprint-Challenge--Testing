<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
  BeforeAll like its name runs before all tests start. AfterAll runs once there're no tests left. BeforeEach run before each single test, accordingly afterEach runs after each test.

2. What is the point of Test Driven Development? What do you personally think about this approach?
  Point is to find caveats and potential bugs before it gets into production. In large scale application where number of people working in teams, TDD is best way of making sure that program will act as it suppose to be.


3. What is a mock function? How do we use it to test a callback passed to a function?
  Mock Functions. Mock functions are also known as "spies", because they let you track on the behavior of a function that is called indirectly by some other code, rather than just testing the output. You can create a mock function with jest.fn()

4. Mention three types of tests.
Unit Testing.
Integration Testing.
Functional Testing.

5. What type of test performs database operations against a real server.



  
