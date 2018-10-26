# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    `describe()` is for grouping related tests into one test suite. `it()` is an alias of test, which a test is the
    function that holds and executes the test.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    TDD is a development process that relies on the reputition of very short development cycles. Initially writing failing tests and then
    writing short code that makes the test pass, then refactor. I think TDD helps reduce the amount of bugs in the software before going into 
    production or even major refactoring.

3.  What are `mocks`? What are a good use cases for them?
    `mocks` make it easy to link between code by erasing the actual implementation of a function and allowing test-timing configuration to return values.

4.  Mention three types of automated tests.
    Data Driven Testing, Unit Testing and Functional Testing
