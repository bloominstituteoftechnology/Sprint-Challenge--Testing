# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    - `describe()` creates a block, so one can organize a group of related tests.
    - `it()` is an alias for `test()` and is the test you want to run.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
    - Test Driven Development (TDD) is when the tests are written first and then the code. Add a test, write some code, fix code, write more tests.
3.  What are `mocks`? What are a good use case for them?
    - A `mock` is a function that the testing application has control over. For example, we can change the return value, implementation, or promise resolution. Can be useful to `mock` asynchronously fetching data when you don't want to use up your API quota.
4.  Mention three types of tests.
    - Unit, regression, end to end
