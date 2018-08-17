# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
 - describe() creates a block that groups together several related tests in one "test suite".
 - it() runs the tests.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
 - Test-Driven Development is a process that has you start by writing a test, running it, and then writing the minimum amount of code required to make the test pass. TDD reduces the likelihood of having bugs in your tests, which can otherwise be difficult to track down.
3.  What are `mocks`? What are a good use case for them?
 - Mock functions make it easy to test the links between code. There are two ways to mock functions: Either by creating a mock function to use in test code, or writing a manual mock to override a module dependency.
4.  Mention three types of tests.
 - Unit Testing
 - Snapshot Testing
 - Integration testing