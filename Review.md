# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

<!-- describe() helps groups tests together and nest them under a common title for easier viewing purposes. it() let's you assert tests on different components. -->

2.  What is the point of `Test Driven Development`? What do you think about this approach?

<!-- Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the software is improved to pass the new tests, only. TDD is beneficial because it minimizes the risk of regression. -->

3.  What are `mocks`? What are a good use cases for them?

<!-- Mocks provide features that ensure that our code under test is using it's dependencies in a very specific way. You use `jest.fn()` to create a mock function, `jest.mock()` to mock a module, or `jest.spyOn` to emulate a function in isolation. -->

4.  Mention three types of automated tests.

<!-- Unit tests, Integration tests, Snapshot testing -->
