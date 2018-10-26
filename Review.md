# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
Describe() creates a block that groups together several related tests in one test suite. It() runs a test. Describe() describes the tests and it() runs them.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
TDD is a process for writing and running tests before writing code. This method of development provides very high test-coverage, confidence in the code by reducing bugs, makes maintaining and adding features easy, minimizes regressions, and acts as a safety net when refactoring.
3.  What are `mocks`? What are a good use cases for them?
Mocking is a technique to isolate test subjects by replacing dependencies with objects that you can control and inspect. Good use cases include capturing calls, setting return values, and changing the implementation.
4.  Mention three types of automated tests.
Unit tests, component tests, snapshot tests, integration tests.