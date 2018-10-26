# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    describe() groups tests together into a suite, while it() is used to group together the bits to run a specific test.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    TDD is a tests-first method of development where you write your tests first to specify functionality, then write the associated code to execute the functionality expected by the test. It has it's place, especially if the product functionality is already well mapped out ahead of time, otherwise, it can be tedious and cause a lot of sprawl from trying to write code bottom up.

3.  What are `mocks`? What are a good use cases for them?
    Chunks of code that emulate the functionality of more complex dependencies that the code your testing relies on. Testing APIs. Testing complex pieces of software with complex dependencies.

4.  Mention three types of automated tests.
    Unit test, component test, integration test.
