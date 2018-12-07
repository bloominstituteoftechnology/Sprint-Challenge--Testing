# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

`Describe()` can be described as a test suite, because it groups together several related tests. `it()` can be described as a single test - the single requirement needed to run a test.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

The point of test driven development is to invest time in itself, that way bugs do not rear themselves during production or actual development. Without testing, the losses we acquire from attempting to fix bugs will outweigh the investment of TDD. 

cost of investing in TDD < cost of fixing bugs as they come

3.  What are `mocks`? What are a good use cases for them?

Mocks are basically "fake" functions. We can use them to test things in isolation, such as parameters and functions inside the tests, or mocking a click handler function in React.

4.  Mention three types of automated tests.

- Unit testing
- Integration testing
- Snapshot testing
