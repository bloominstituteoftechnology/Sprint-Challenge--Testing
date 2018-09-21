# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    describe is used to set up a test suite which groups together tests for the same object, like grouping tests for a get route. It is for individual test scenarios, like testing that a get route returns the correct status code.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
    TDD defines tests before code. It helps make sure the code meets certain goals without having to constantly test and modify code. I think it's fine.
3.  What are `mocks`? What are a good use cases for them?
    Mock functions make it easy to test code by replacing the implementation of a function, capturing calls to the function, and capturing instances of constructor functions

4.  Mention three types of automated tests.
    Unit testing, API testing, UI testing
