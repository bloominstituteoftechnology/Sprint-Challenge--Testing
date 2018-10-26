# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
describe() creates a block that groups together several related tests in one test suite. it() is used for every individual test to explain what that function is expected to do.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
By writing the tests before the code, TDD forces you to design your code in an organized way, with a focus on what the function should return, and in what format. I think TDD is an effective way to keep code structured, and allows for easier debugging.

3.  What are `mocks`? What are a good use cases for them?
Mock functions make it easy to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.

4.  Mention three types of automated tests.
Unit Testing, Functional Testing, Integration Testing.