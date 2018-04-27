<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
    These are different hooks or functions that run at their specified time before or after the test cases on the API run. Before runs before all tests in the block. After runs after all tests in the block. BeforeEach runs before each test in the block. AfterEach runs after each test in the block.

2.  What is the point of Test Driven Development? What do you personally think about this approach?
    TDD is a process in which a developer writes and runs code that seeks to predetermine outcomes that may or may not produce bugs in a program. The process is very useful in my opinion and something that should be considered. It predetermines how code should fail and can pinpoint bugs in a program.

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    A spy is a function that records arguments, return value, the "this" value and exceptions thrown if any for all its calls. They can be anonymous functions or wrap methods that already exist in the system under test.
